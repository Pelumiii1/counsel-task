import { useState, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Send, FileText, Plus, Loader2, MessageSquare } from 'lucide-react'
import Lock from '../../assets/icons/lock.png'
import PDF from '../../assets/icons/pdf.png'
import JPG from '../../assets/icons/jpg.png'
import {
  useConversations,
  useThreadMessages,
  useSendMessage,
  type ConversationItem,
  type MessageItem,
} from '#/hooks/useMessages'

export function MessagesView({
  taskId,
  backTo = '/dashboard',
  role = 'engaging',
}: {
  taskId?: string
  backTo?: string
  role?: 'engaging' | 'assisting'
}) {
  const { data: serverConversations, isLoading: isConversationsLoading } =
    useConversations(role)
  const [activeConvoId, setActiveConvoId] = useState<string>('')
  const [inputText, setInputText] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const conversations: ConversationItem[] = serverConversations || []


  // Initialize or update active conversation
  useEffect(() => {
    if (conversations.length > 0) {
      if (!activeConvoId || !conversations.some((c) => c.id === activeConvoId)) {
        if (taskId) {
          const match = conversations.find((c) => String(c.taskId) === String(taskId))
          if (match) {
            setActiveConvoId(match.id)
            return
          }
        }
        setActiveConvoId(conversations[0].id)
      }
    } else {
      setActiveConvoId('')
    }
  }, [conversations, activeConvoId, taskId])

  const activeConvo = conversations.find((c) => c.id === activeConvoId) || null

  const { data: serverMessages, isLoading: isMessagesLoading } = useThreadMessages(
    activeConvo ? activeConvo.otherUserId : undefined,
    activeConvo ? activeConvo.taskId : taskId ? Number(taskId) : undefined,
    role,
  )

  const { mutate: sendMessage, isPending: isSending } = useSendMessage(role)

  // Scroll to bottom of container when messages change
  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [serverMessages, activeConvoId])

  const handleSendMessage = () => {
    if (!inputText.trim() || isSending || !activeConvo) return

    const text = inputText.trim()
    setInputText('')

    sendMessage({
      recipientId: activeConvo.otherUserId,
      taskId: activeConvo.taskId || (taskId ? Number(taskId) : undefined),
      content: text,
      role,
    })
  }

  // Handle File Upload
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !activeConvo) return

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1)
    const fileName = file.name
    const fileSize = `${sizeInMB} MB`

    sendMessage({
      recipientId: activeConvo.otherUserId,
      taskId: activeConvo.taskId || (taskId ? Number(taskId) : undefined),
      content: `Shared document: ${fileName}`,
      fileName,
      fileSize,
      role,
    })
  }

  const messagesList: MessageItem[] = serverMessages || []

  // Shared documents from active conversation or message attachments
  const sharedFiles = activeConvo
    ? [
      ...(activeConvo.sharedFiles || []),
      ...messagesList
        .filter((m) => m.fileName && !activeConvo.sharedFiles?.some((f) => f.name === m.fileName))
        .map((m) => ({ name: m.fileName!, size: m.fileSize || '1.5 MB', url: m.attachmentUrl })),
    ]
    : []

  const counterpartFirstName = activeConvo ? activeConvo.name.split(' ')[0] : 'counsel'

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Header */}
      <div className="flex flex-col gap-3 select-none mb-6 text-left">
        <Link
          to={backTo as any}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-205 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Communicate &amp; share documents
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-2xl">
          {activeConvo
            ? `Message ${counterpartFirstName} directly and share files for this task. Access is limited to you and the assigned counsel.`
            : 'Communicate directly with counterpart counsel and share files securely.'}
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Side: Conversations List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[20px] border border-[#AAAAAA80] p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-3 max-h-150 overflow-y-auto">
          {isConversationsLoading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#00726D]" />
              <span className="text-xs text-gray-500 mt-2">Loading conversations...</span>
            </div>
          ) : conversations.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-2">
              <MessageSquare className="w-8 h-8 text-gray-300 stroke-[1.5]" />
              <span className="text-xs font-medium text-gray-600">No active conversations</span>
              <p className="text-[11px] text-gray-400 max-w-50">
                Active chats with assigned lawyers will appear here once communication begins.
              </p>
            </div>
          ) : (
            conversations.map((convo) => {
              const isActive = convo.id === activeConvoId
              return (
                <div
                  key={convo.id}
                  onClick={() => setActiveConvoId(convo.id)}
                  className={`p-3 rounded-xl flex items-start gap-3 cursor-pointer transition select-none ${isActive
                    ? 'bg-[#E6F1F0] border-b-[0.5px] border-l-2 border-[#00726D] shadow-[0_2px_12px_rgba(0,114,109,0.02)]'
                    : 'border border-transparent hover:bg-gray-50/80 hover:border-gray-100'
                    }`}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#00726D] text-white flex items-center justify-center font-medium text-[14px] shrink-0 select-none font-primary">
                    {convo.initials}
                  </div>

                  <div className="flex flex-col items-start text-left min-w-0 flex-1">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[16px] font-medium text-black leading-tight font-secondary">
                        {convo.name}
                      </span>
                      {convo.lastMessageTime && (
                        <span className="text-[11px] text-gray-400 font-normal">
                          {convo.lastMessageTime}
                        </span>
                      )}
                    </div>
                    <p className="text-[13.5px] text-[#737373] font-normal w-full mt-1.5 leading-normal font-secondary truncate">
                      {convo.lastSnippet}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Right Side: Message Feed & Shared Documents (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {activeConvo ? (
            <>
              {/* Chat Feed Box */}
              <div className="bg-white rounded-[20px] border border-[#AAAAAA80] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col min-h-125 max-h-150">
                {/* Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-[18px] shrink-0 select-none font-primary">
                    {activeConvo.initials}
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[18px] font-medium text-gray-900 font-primary">
                      {activeConvo.name}
                    </span>
                    <span
                      className={`text-[13px] font-normal tracking-wider ${activeConvo.online ? 'text-[#00726D]' : 'text-gray-400'
                        }`}
                    >
                      {activeConvo.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Messages Log area */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto py-5 flex flex-col gap-4"
                >
                  {isMessagesLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-[#00726D]" />
                      <span className="text-xs text-gray-500 mt-2">Loading message thread...</span>
                    </div>
                  ) : messagesList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 text-xs">
                      <span>Start the conversation by typing below.</span>
                    </div>
                  ) : (
                    messagesList.map((msg) => {
                      const isUser = Boolean(
                        msg.isMine === true ||
                        (msg as any).mine === true ||
                        (role === 'engaging' && msg.senderRole === 'ROLE_ENGAGING_LAWYER') ||
                        (role === 'assisting' && msg.senderRole === 'ROLE_ASSISTING_LAWYER')
                      )
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col max-w-[75%] ${isUser ? 'self-end items-end' : 'self-start items-start'
                            }`}
                        >
                          <div
                            className={`p-3.5 rounded-[10px] text-xs sm:text-[14px] leading-relaxed text-left font-normal ${isUser
                              ? 'bg-[#00726D] text-white rounded-br-none'
                              : 'bg-[#E6F1F0] text-[#00726D] rounded-bl-none border border-[#00726d]/5'
                              }`}
                          >
                            {msg.content}
                            {msg.fileName && (
                              <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-2">
                                <FileText className="w-4 h-4 shrink-0" />
                                <span className="text-[12px] underline">{msg.fileName}</span>
                                {msg.fileSize && (
                                  <span className="text-[10px] opacity-80">({msg.fileSize})</span>
                                )}
                              </div>
                            )}
                            <span
                              className={`text-[11px] block font-normal mt-1 select-none font-secondary ${isUser ? 'text-[#B0D3D2]' : 'text-[#00726D]'
                                }`}
                            >
                              {msg.timeFormatted}
                            </span>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {/* Input text block */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 h-10 px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={isSending || !inputText.trim()}
                    className="h-10 px-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#00726d] hover:bg-[#005c58] text-white font-semibold text-xs transition active:scale-[0.98] cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Shared Documents Panel */}
              <div className="bg-white rounded-[20px] border border-[#AAAAAA80] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-5 text-left mb-2">
                <h3 className="text-[16px] font-normal text-gray-450 tracking-wider uppercase select-none font-roboto">
                  Shared Documents
                </h3>

                {/* Lock alert info banner */}
                <div className="bg-[#E6F1F0] rounded-[10px] p-3.5 border-[0.5px] border-[#B0D3D2] flex items-start gap-2.5">
                  <img src={Lock} alt="Lock" className="size-5" />
                  <p className="text-[12px] text-[#00726D] font-normal leading-relaxed">
                    Documents here are visible only to you and {activeConvo.name} for this task.
                  </p>
                </div>

                {/* File items list layout */}
                <div className="flex flex-col divide-y divide-gray-100 text-sm">
                  {sharedFiles.length === 0 ? (
                    <div className="py-4 text-xs text-gray-400">No documents shared yet.</div>
                  ) : (
                    sharedFiles.map((file, idx) => (
                      <div key={idx} className="py-4.5 flex items-center gap-3">
                        {file.name.toLowerCase().endsWith('.pdf') ? (
                          <img
                            src={PDF}
                            alt="PDF"
                            className="w-8 h-8 object-contain"
                          />
                        ) : file.name.toLowerCase().endsWith('.jpg') ||
                          file.name.toLowerCase().endsWith('.jpeg') ||
                          file.name.toLowerCase().endsWith('.png') ? (
                          <img
                            src={JPG}
                            alt="JPG"
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <FileText className="w-5 h-5 stroke-[1.8] text-gray-400" />
                        )}

                        <div className="flex flex-col items-start">
                          <span className="text-[14px] font-bold text-gray-800 leading-snug font-secondary">
                            {file.name}
                          </span>
                          <span className="text-[12px] text-black font-normal mt-1">
                            {file.size}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Upload file triggers */}
                <div className="flex justify-center select-none pt-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <button
                    type="button"
                    onClick={triggerFileUpload}
                    className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-[#00726D] hover:border-[#00726d] bg-[#E6F1F0] px-4 text-xs font-semibold text-[#00726d] transition hover:bg-[#00726d]/1 active:scale-[0.98] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload File</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-[20px] border border-[#AAAAAA80] p-12 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-125 text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E6F1F0] flex items-center justify-center text-[#00726D]">
                <MessageSquare className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 font-primary">No Conversation Selected</h2>
              <p className="text-xs text-gray-500 max-w-sm">
                When you initiate or receive communications regarding assigned tasks, conversation threads will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
