import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import CardIcon from '#/assets/icons/card.png'
import ClipboardIcon from '#/assets/icons/clipboard.png'
import ChatIcon from '#/assets/icons/chat.png'

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/notifications',
)({
  component: NotificationsPage,
})

interface Task {
  id: string
  title: string
  category: string
  court: string
  deadline: string
  budget: string
  workers: string
  status: 'Open' | 'In Progress' | 'Awaiting review' | 'Completed'
}

interface NotificationItem {
  id: string
  title: string
  type: 'proposal' | 'verification' | 'fee' | 'payment' | 'message'
  content: string
  time: string
  unread: boolean
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  useEffect(() => {
    // Read local tasks to build dynamic context
    const stored = localStorage.getItem('counsel_tasks')
    let completedLawyer = 'Funke Adeyemi'
    let completedPayout = '₦30,275'

    if (stored) {
      const tasks: Task[] = JSON.parse(stored)
      const completedTask = tasks.find((t) => t.status === 'Completed')
      if (completedTask) {
        completedLawyer = completedTask.workers
        const budgetNum =
          parseFloat(completedTask.budget.replace(/[^0-9.]/g, '')) || 0
        const netPayout = budgetNum * 0.865
        completedPayout = `₦${Math.round(netPayout).toLocaleString()}`
      }
    }

    setNotifications([
      {
        id: '1',
        title: 'New proposal received',
        type: 'proposal',
        content:
          'Chiamaka Bello submitted a proposal for "Hold Brief — Land Dispute".',
        time: '12 minutes ago',
        unread: true,
      },
      {
        id: '2',
        title: 'Verification approved',
        type: 'verification',
        content:
          'Your account is now verified. You can post tasks and message other lawyers.',
        time: '1 hour ago',
        unread: true,
      },
      {
        id: '3',
        title: 'Practicing Fee Renewal Reminder',
        type: 'fee',
        content:
          'Your annual practicing fee will expire in 7 days. To continue accessing the platform and accepting new legal tasks without interruption, please renew your practicing fee before the expiry date.',
        time: 'Yesterday',
        unread: false,
      },
      {
        id: '4',
        title: 'Payment released',
        type: 'payment',
        content: `${completedPayout} was released to ${completedLawyer} for a completed task.`,
        time: 'Yesterday',
        unread: false,
      },
      {
        id: '5',
        title: 'New message',
        type: 'message',
        content: 'Funke Adeyemi sent you a message about the Ikeja hearing.',
        time: '2 days ago',
        unread: false,
      },
    ])
  }, [])

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'proposal':
      case 'verification':
        return (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 select-none">
            <img
              src={ClipboardIcon}
              alt="Clipboard"
              className="w-5 h-5 object-contain"
            />
          </div>
        )
      case 'fee':
      case 'payment':
        return (
          <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 select-none">
            <img src={CardIcon} alt="Card" className="w-5 h-5 object-contain" />
          </div>
        )
      case 'message':
        return (
          <div className="w-10 h-10 rounded-full bg-[#EBF8FE] flex items-center justify-center shrink-0 select-none">
            <img src={ChatIcon} alt="Chat" className="w-5 h-5 object-contain" />
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-1 select-none mb-2">
        <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
          Updates on your tasks
        </h1>
      </div>

      {/* Notifications list */}
      <div className="flex flex-col gap-4 mx-auto max-w-6xl w-full">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-5 flex gap-4 transition duration-200 border rounded-2xl ${
              item.unread
                ? 'border-[#B0D3D2] bg-[#E6F1F0] shadow-[0_2px_12px_rgba(0,114,109,0.01)]'
                : 'border-gray-150 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.01)]'
            }`}
          >
            {/* Left Icon badge */}
            {getIcon(item.type)}

            {/* Right content details */}
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-xs sm:text-[18px] font-bold text-black font-secondary">
                {item.title}
              </span>
              <p className="text-[11px] sm:text-sm text-black font-normal leading-relaxed">
                {item.content}
              </p>
              <span className="text-[10px] sm:text-[12px] text-black font-normal select-none">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
