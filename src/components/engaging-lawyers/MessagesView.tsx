import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Send,
  FileText,
  Plus,
  Loader2,
  MessageSquare,
  CheckCircle2,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Sparkles,
  Undo,
  Redo,
  UploadCloud,
  ArrowRight,
  Hourglass,
  Lock as LockIcon,
} from 'lucide-react'
import { toast } from 'sonner'
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
import { useTaskById, useRequestTaskCompletion } from '#/hooks/useTasks'

export function MessagesView({
  taskId,
  backTo = '/engaging-dashboard',
  role = 'engaging',
}: {
  taskId?: string
  backTo?: string
  role?: 'engaging' | 'assisting'
}) {
  const navigate = useNavigate()
  const { data: serverConversations, isLoading: isConversationsLoading } =
    useConversations(role)
  const [activeConvoId, setActiveConvoId] = useState<string>('')
  const [inputText, setInputText] = useState('')
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false)
  const [completionNote, setCompletionNote] = useState('')
  const [isRequestingCompletion, setIsRequestingCompletion] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const completionFileInputRef = useRef<HTMLInputElement>(null)
  const [completionFile, setCompletionFile] = useState<File | null>(null)

  const conversations: ConversationItem[] = (serverConversations || []).map((c) => {
    if (c.taskId) {
      try {
        const stored = localStorage.getItem('counsel_tasks')
        if (stored) {
          const tasks = JSON.parse(stored)
          const localTask = tasks.find((t: any) => String(t.id) === String(c.taskId))
          if (localTask && localTask.status) {
            return { ...c, taskStatus: localTask.status }
          }
        }
      } catch (_) { }
    }
    return c
  })


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

  const currentTaskId = activeConvo?.taskId || (taskId ? Number(taskId) : undefined)
  const { data: serverTask } = useTaskById(currentTaskId || '')
  const { mutate: requestCompletion } = useRequestTaskCompletion(currentTaskId)

  let isLocalCompleted = false
  if (currentTaskId) {
    try {
      const stored = localStorage.getItem('counsel_tasks')
      if (stored) {
        const tasks = JSON.parse(stored)
        const localTask = tasks.find((t: any) => String(t.id) === String(currentTaskId))
        if (localTask && localTask.status?.toLowerCase() === 'completed') {
          isLocalCompleted = true
        }
      }
    } catch (_) { }
  }

  const taskStatus = serverTask?.status || activeConvo?.taskStatus
  const isCompleted = isLocalCompleted || taskStatus?.toLowerCase() === 'completed'
  const isAwaitingReview = !isCompleted && (taskStatus === 'Awaiting review' || taskStatus === 'Awaiting Review')

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

  const handleRequestCompletionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeConvo) return

    setIsRequestingCompletion(true)
    const noteText = completionNote.trim() || 'I have completed the brief. Please review and confirm completion.'
    const fileName = completionFile ? completionFile.name : undefined
    const fileSize = completionFile ? `${(completionFile.size / (1024 * 1024)).toFixed(1)} MB` : undefined

    requestCompletion(
      { note: noteText },
      {
        onSuccess: () => {
          sendMessage({
            recipientId: activeConvo.otherUserId,
            taskId: activeConvo.taskId || (taskId ? Number(taskId) : undefined),
            content: `Completion Confirmation Requested: ${noteText}`,
            fileName,
            fileSize,
            role,
          })

          setIsRequestingCompletion(false)
          setIsCompletionModalOpen(false)
          setCompletionNote('')
          setCompletionFile(null)
          toast.success('Completion confirmation requested successfully!')

          // Update local tasks storage if present
          const targetTaskId = activeConvo.taskId || taskId || '1'
          if (targetTaskId) {
            const stored = localStorage.getItem('counsel_tasks')
            if (stored) {
              try {
                const tasks = JSON.parse(stored)
                const updated = tasks.map((t: any) =>
                  String(t.id) === String(targetTaskId)
                    ? { ...t, status: 'Awaiting review' }
                    : t,
                )
                localStorage.setItem('counsel_tasks', JSON.stringify(updated))
              } catch (_) { }
            }
          }

          // Route to Request Sent page
          navigate({
            to: '/assisting-dashboard/request-sent/$taskId',
            params: { taskId: String(targetTaskId) },
          })
        },
        onError: () => {
          setIsRequestingCompletion(false)
          toast.error('Failed to send completion confirmation request.')
        },
      },
    )
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
                  {/* Avatar with Presence Indicator */}
                  <div className="relative shrink-0 select-none">
                    <div className="w-10 h-10 rounded-full bg-[#00726D] text-white flex items-center justify-center font-medium text-[14px] font-primary">
                      {convo.initials}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-white ${convo.online ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      title={convo.online ? 'Online' : 'Offline'}
                    />
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
                    {convo.taskStatus?.toLowerCase() === 'completed' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#E6F1F0] text-[#00726D] border border-[#00726D]/20 mt-1.5 select-none">
                        Task Completed
                      </span>
                    )}
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
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 shrink-0">
                  <div className="relative shrink-0 select-none">
                    <div className="w-10 h-10 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-[18px] font-primary">
                      {activeConvo.initials}
                    </div>
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[18px] font-medium text-gray-900 font-primary">
                      {activeConvo.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[12.5px] font-normal tracking-wider ${activeConvo.online ? 'text-[#00726D] font-medium' : 'text-gray-400'
                          }`}
                      >
                        {activeConvo.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fixed Banner / Action section (Completed, Awaiting Review, or Request Completion) */}
                {isCompleted ? (
                  <div className="py-2.5 px-3.5 border-b border-gray-100 flex items-center justify-between gap-4 select-none shrink-0 bg-[#E6F1F0]/70 rounded-xl my-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00726D] stroke-[2]" />
                      <span className="text-xs sm:text-[13.5px] font-medium text-[#00726D] font-secondary">
                        This task has been completed and approved
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#00726D] border border-[#B0D3D2] select-none">
                      Completed
                    </span>
                  </div>
                ) : role === 'assisting' && (
                  isAwaitingReview ? (
                    <div className="py-2.5 px-3 border-b border-gray-100 flex items-center justify-between gap-4 select-none shrink-0 bg-[#FDF0EC]/60 rounded-xl my-1">
                      <div className="flex items-center gap-2">
                        <Hourglass className="w-4 h-4 text-[#D07054] stroke-[2]" />
                        <span className="text-xs sm:text-[13.5px] font-medium text-[#A24D36] font-secondary">
                          Task is awaiting completion confirmation from engaging counsel
                        </span>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#D07054] border border-[#FCD2CB] select-none">
                        Awaiting Review
                      </span>
                    </div>
                  ) : (
                    <div className="py-3 px-1 border-b border-gray-100 flex items-center justify-between gap-4 select-none shrink-0">
                      <span className="text-sm sm:text-[15px] font-normal text-[#00726D] font-secondary">
                        Done with the task?
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsCompletionModalOpen(true)}
                        className="inline-flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-[6px] border-[0.5px] border-[#B0D3D2] bg-[#E6F1F0] hover:bg-[#D8EFEA] hover:border-[#00726D]/50 text-[#00726D] text-xs sm:text-[13px] transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.98] font-secondary font-normal"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-2" />
                        <span>Request Completion Confirmation</span>
                      </button>
                    </div>
                  )
                )}

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
                              : role === 'assisting'
                                ? 'bg-[#E8EBEC] text-[#242424] rounded-bl-none'
                                : 'bg-[#E6F1F0] text-[#00726D] rounded-bl-none border border-[#00726d]/5'
                              }`}
                          >
                            {msg.content}
                            {msg.fileName && (
                              <div
                                className={`mt-2 pt-2 border-t flex items-center gap-2 ${isUser
                                  ? 'border-white/20'
                                  : role === 'assisting'
                                    ? 'border-gray-300/50'
                                    : 'border-[#00726D]/15'
                                  }`}
                              >
                                <FileText className="w-4 h-4 shrink-0" />
                                <span className="text-[12px] underline">{msg.fileName}</span>
                                {msg.fileSize && (
                                  <span className="text-[10px] opacity-80">({msg.fileSize})</span>
                                )}
                              </div>
                            )}
                            <span
                              className={`text-[11px] block font-normal mt-1 select-none font-secondary ${isUser
                                ? 'text-[#B0D3D2]'
                                : role === 'assisting'
                                  ? 'text-gray-500'
                                  : 'text-[#00726D]'
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
                {isCompleted ? (
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-center p-3 rounded-full bg-gray-50 border border-gray-200/70 select-none text-center">
                    <span className="text-xs sm:text-[13px] text-gray-500 font-normal flex items-center gap-2">
                      <LockIcon className="w-4 h-4 text-gray-400" />
                      Messaging is disabled because this task has been completed.
                    </span>
                  </div>
                ) : role === 'assisting' && isAwaitingReview ? (
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-center p-3 rounded-full bg-gray-50 border border-gray-200/70 select-none text-center">
                    <span className="text-xs sm:text-[13px] text-gray-500 font-normal flex items-center gap-2">
                      <LockIcon className="w-4 h-4 text-gray-400" />
                      Messaging is disabled while the task is awaiting review by engaging counsel.
                    </span>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 h-12 px-4 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={isSending || !inputText.trim()}
                      className="h-12 px-8 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#00726d] hover:bg-[#005c58] text-white font-semibold text-xs transition active:scale-[0.98] cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <span>Send</span>
                    </button>
                  </div>
                )}
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
                    disabled={isCompleted || (role === 'assisting' && isAwaitingReview)}
                  />
                  {isCompleted ? (
                    <div className="w-full text-center py-2.5 px-4 rounded-lg bg-gray-50 border border-gray-200/60 text-xs text-gray-500 font-secondary flex items-center justify-center gap-2">
                      <LockIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>File sharing is disabled for completed tasks.</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={triggerFileUpload}
                      disabled={role === 'assisting' && isAwaitingReview}
                      className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-[#00726D] hover:border-[#00726d] bg-[#E6F1F0] px-4 text-xs font-semibold text-[#00726d] transition hover:bg-[#00726d]/1 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload File</span>
                    </button>
                  )}
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

      {/* Evidence of Completion Modal */}
      {isCompletionModalOpen && activeConvo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => !isRequestingCompletion && setIsCompletionModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-9 flex flex-col gap-6 border border-gray-150 animate-in fade-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-primary text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Evidence Of Completion
                </h2>
                <p className="font-secondary text-xs sm:text-sm text-gray-600 font-normal">
                  Once the task is done, submit evidence of completion below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCompletionModalOpen(false)}
                disabled={isRequestingCompletion}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer shrink-0 -mr-1 -mt-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestCompletionSubmit} className="flex flex-col gap-5">
              {/* Evidence of Completion Rich Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900 font-secondary flex items-center gap-1">
                  Evidence of Completion <span className="text-red-500">*</span>
                </label>
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:border-[#00726D]/50 focus-within:ring-2 focus-within:ring-[#00726D]/10 transition">
                  {/* Editor Toolbar */}
                  <div className="flex items-center gap-1 sm:gap-1.5 px-3 py-2 border-b border-gray-150 bg-white select-none text-gray-600">
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <Undo className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-black"
                    >
                      <Redo className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={4}
                    required
                    value={completionNote}
                    onChange={(e) => setCompletionNote(e.target.value)}
                    placeholder="Appeared at Ikeja High Court at 8:45am for the land dispute hearing. Matter was called at 10:10am. Held brief as instructed; next adjourned date is 14 August 2026."
                    className="w-full p-3.5 text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:outline-none resize-none leading-relaxed font-secondary min-h-27.5"
                  />
                </div>
              </div>

              {/* Supporting Files Dropzone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900 font-secondary">
                  Supporting Files (optional)
                </label>
                <div
                  onClick={() => completionFileInputRef.current?.click()}
                  className="w-full rounded-2xl border border-dashed border-gray-300 hover:border-[#00726D]/50 bg-white hover:bg-gray-50/50 p-6 flex flex-col items-center justify-center text-center gap-2.5 transition cursor-pointer select-none"
                >
                  <input
                    type="file"
                    ref={completionFileInputRef}
                    onChange={(e) => setCompletionFile(e.target.files?.[0] || null)}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-gray-500">
                    <UploadCloud className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 font-secondary">
                      Attendance slip, hearing note, or receipt
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 font-normal">
                      PDF or image, up to 10MB{' '}
                      <span className="text-[#00726D] font-medium underline">Choose File</span>
                    </span>
                  </div>

                  {completionFile && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#E6F1F0] text-[#00726D] border border-[#B0D3D2] text-xs"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="font-medium truncate max-w-xs">{completionFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setCompletionFile(null)}
                        className="text-gray-400 hover:text-red-500 p-0.5 ml-1 transition cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  disabled={isRequestingCompletion}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-medium transition cursor-pointer active:scale-[0.98] shadow-xs disabled:opacity-50"
                >
                  {isRequestingCompletion ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Completion Confirmation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
