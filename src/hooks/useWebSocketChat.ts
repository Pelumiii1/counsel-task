import { useEffect, useRef, useState, useCallback } from 'react'
import { Client } from '@stomp/stompjs'
import { getStoredSessionToken } from '../lib/authGuard'

// Ensure global is defined in all browser environments
if (typeof window !== 'undefined' && !(window as any).global) {
  ; (window as any).global = window
}

export interface WsChatMessage {
  id: number
  taskId: number
  senderId: number
  senderName: string
  recipientId: number
  recipientName: string
  content: string
  timestamp: string
  read: boolean
  attachmentUrl?: string
  attachmentName?: string
  type?: string
}

interface UseWebSocketChatOptions {
  taskId?: number | string
  onMessageReceived?: (message: WsChatMessage) => void
}

export function useWebSocketChat({ taskId, onMessageReceived }: UseWebSocketChatOptions) {
  const [isConnected, setIsConnected] = useState(false)
  const clientRef = useRef<Client | null>(null)
  const onMessageReceivedRef = useRef(onMessageReceived)

  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived
  }, [onMessageReceived])

  useEffect(() => {
    if (!taskId || typeof window === 'undefined') return

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
    const backendBase = apiUrl.replace(/\/api\/?$/, '')
    // Use native WebSockets via /ws-chat-native
    const wsUrl = backendBase.replace(/^http/, 'ws') + '/ws-chat-native'

    const token = getStoredSessionToken()

    const client = new Client({
      brokerURL: wsUrl,
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      debug: () => {
        if (import.meta.env.DEV) {
          // console.log('[STOMP]', msg)
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setIsConnected(true)
        // Subscribe to task topic
        client.subscribe(`/topic/tasks/${taskId}`, (message) => {
          try {
            const body: WsChatMessage = JSON.parse(message.body)
            if (onMessageReceivedRef.current) {
              onMessageReceivedRef.current(body)
            }
          } catch (err) {
            console.error('Failed to parse WebSocket message', err)
          }
        })
      },
      onDisconnect: () => {
        setIsConnected(false)
      },
      onStompError: (frame) => {
        console.warn('STOMP protocol error:', frame.headers['message'])
        setIsConnected(false)
      },
      onWebSocketError: () => {
        // Native WS error logging
        setIsConnected(false)
      },
    })

    client.activate()
    clientRef.current = client

    return () => {
      if (client.active) {
        client.deactivate()
      }
      setIsConnected(false)
    }
  }, [taskId])

  const sendWsMessage = useCallback(
    (recipientId: number, content: string, attachmentUrl?: string, attachmentName?: string, type: string = 'TEXT') => {
      if (!clientRef.current || !clientRef.current.connected || !taskId) {
        return false
      }

      clientRef.current.publish({
        destination: `/app/chat.send`,
        body: JSON.stringify({
          taskId: Number(taskId),
          recipientId,
          content,
          attachmentUrl,
          attachmentName,
          type,
        }),
      })
      return true
    },
    [taskId]
  )

  return {
    isConnected,
    sendWsMessage,
  }
}
