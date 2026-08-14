import { useState, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Send, FileText, Plus } from 'lucide-react'
import Lock from '../../assets/icons/lock.png'
import PDF from '../../assets/icons/pdf.png'
import JPG from '../../assets/icons/jpg.png'

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

interface Message {
  sender: 'user' | 'lawyer'
  text: string
  time: string
}

interface Conversation {
  id: string
  name: string
  initials: string
  online: boolean
  lastSnippet: string
  messages: Message[]
  sharedFiles: Array<{ name: string; size: string }>
}

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: 'onasanya',
    name: 'Onasanya Habeeb',
    initials: 'OH',
    online: true,
    lastSnippet: 'Thank you — please let me know once the hearing starts.',
    messages: [
      {
        sender: 'lawyer',
        text: "Good morning, I've received the case documents. I'll be at Ikeja High Court by 8:30am.",
        time: '8:02 AM',
      },
      {
        sender: 'user',
        text: 'Thank you — please let me know once the hearing starts.',
        time: '8:02 AM',
      },
      {
        sender: 'lawyer',
        text: "Will do. I've also attached the case file reference number for your records.",
        time: '8:02 AM',
      },
      {
        sender: 'lawyer',
        text: "Good morning, I've received the case documents. I'll be at Ikeja High Court by 8:30am.",
        time: '8:02 AM',
      },
      {
        sender: 'user',
        text: 'Thank you — please let me know once the hearing starts.',
        time: '8:02 AM',
      },
      {
        sender: 'lawyer',
        text: "Will do. I've also attached the case file reference number for your records.",
        time: '8:02 AM',
      },
    ],
    sharedFiles: [
      { name: 'Statement_of_Claim.pdf', size: '2.1 MB' },
      { name: 'Case_Reference_Note.pdf', size: '2.1 MB' },
      { name: 'Court_Filing_Receipt.jpg', size: '2.1 MB' },
    ],
  },
  {
    id: 'kunle',
    name: 'Kunle bakare',
    initials: 'KB',
    online: false,
    lastSnippet: 'Thank you — please let me know once the hearing starts.',
    messages: [
      {
        sender: 'user',
        text: 'Hello Kunle, can you review the statement?',
        time: '9:15 AM',
      },
      {
        sender: 'lawyer',
        text: 'Sure, I will review it by the end of the day today.',
        time: '9:30 AM',
      },
      {
        sender: 'user',
        text: 'Thank you — please let me know once the hearing starts.',
        time: '10:00 AM',
      },
    ],
    sharedFiles: [{ name: 'Draft_Defence_v1.pdf', size: '1.8 MB' }],
  },
  {
    id: 'ifeoma1',
    name: 'Ifeoma Chukwu',
    initials: 'IC',
    online: true,
    lastSnippet: 'Thank you — please let me know once the hearing starts.',
    messages: [
      {
        sender: 'lawyer',
        text: 'I have checked the tenancy rules for Lagos state.',
        time: 'Yesterday',
      },
      {
        sender: 'user',
        text: 'Great, thanks for the update.',
        time: 'Yesterday',
      },
      {
        sender: 'user',
        text: 'Thank you — please let me know once the hearing starts.',
        time: 'Yesterday',
      },
    ],
    sharedFiles: [{ name: 'Tenancy_Act_Lagos.pdf', size: '3.4 MB' }],
  },
  {
    id: 'ifeoma2',
    name: 'Ifeoma Chukwu',
    initials: 'IC',
    online: false,
    lastSnippet: 'Thank you — please let me know once the hearing starts.',
    messages: [
      {
        sender: 'lawyer',
        text: 'We are on track for the bail hearing scheduled tomorrow.',
        time: '2 days ago',
      },
      {
        sender: 'user',
        text: 'Thank you — please let me know once the hearing starts.',
        time: '2 days ago',
      },
    ],
    sharedFiles: [{ name: 'Bail_Application_Signed.pdf', size: '1.2 MB' }],
  },
]

export function MessagesView({ taskId }: { taskId?: string }) {
  const [conversations, setConversations] = useState<Conversation[]>(
    DEFAULT_CONVERSATIONS,
  )
  const [activeConvoId, setActiveConvoId] = useState<string>('onasanya')
  const [inputText, setInputText] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load task and assign active conversation dynamically if taskId is provided
  useEffect(() => {
    if (!taskId) return

    const stored = localStorage.getItem('counsel_tasks')
    if (stored) {
      const tasks: Task[] = JSON.parse(stored)
      const task = tasks.find((t) => t.id === taskId)
      if (task && task.workers) {
        const workerName = task.workers
        const workerId = workerName.toLowerCase().replace(/[^a-z0-9]/g, '')

        // Check if conversation already exists for this lawyer
        const existsIndex = conversations.findIndex((c) => c.id === workerId)
        if (existsIndex > -1) {
          setActiveConvoId(workerId)
        } else {
          // Dynamically add a new conversation for this worker
          const initials = workerName
            .split(' ')
            .map((w) => w[0])
            .join('')
            .toUpperCase()
          const newConvo: Conversation = {
            id: workerId,
            name: workerName,
            initials: initials,
            online: true,
            lastSnippet: 'Let me know how to proceed.',
            messages: [
              {
                sender: 'lawyer',
                text: `Hello, I'm ready to begin working on your task: "${task.title}".`,
                time: 'Just now',
              },
            ],
            sharedFiles: [{ name: 'Case_Details.pdf', size: '1.5 MB' }],
          }
          setConversations((prev) => [newConvo, ...prev])
          setActiveConvoId(workerId)
        }
      }
    }
  }, [taskId])

  // Scroll to bottom of container when messages change
  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [activeConvoId, conversations])

  const activeConvo =
    conversations.find((c) => c.id === activeConvoId) || conversations[0]

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const newMsg: Message = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    const updatedConvos = conversations.map((c) => {
      if (c.id === activeConvoId) {
        return {
          ...c,
          lastSnippet: inputText,
          messages: [...c.messages, newMsg],
        }
      }
      return c
    })

    setConversations(updatedConvos)
    setInputText('')

    // Simple lawyer auto-reply after 1.5 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        sender: 'lawyer',
        text: `Got your message. I am currently working on this and will keep you updated.`,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvoId) {
            return {
              ...c,
              lastSnippet: replyMsg.text,
              messages: [...c.messages, replyMsg],
            }
          }
          return c
        }),
      )
    }, 1500)
  }

  // Handle Mock File Upload
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Convert file size to MB readable format
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1)
    const newFile = {
      name: file.name,
      size: `${sizeInMB} MB`,
    }

    const updatedConvos = conversations.map((c) => {
      if (c.id === activeConvoId) {
        return {
          ...c,
          sharedFiles: [...c.sharedFiles, newFile],
        }
      }
      return c
    })

    setConversations(updatedConvos)

    // Add a chat log of the upload
    const uploadLogMsg: Message = {
      sender: 'user',
      text: `Uploaded file: ${file.name}`,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvoId) {
          return {
            ...c,
            lastSnippet: `Uploaded file: ${file.name}`,
            messages: [...c.messages, uploadLogMsg],
          }
        }
        return c
      }),
    )
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Header */}
      <div className="flex flex-col gap-3 select-none mb-6 text-left">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-205 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Communicate & share documents
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-2xl">
          Message {activeConvo.name.split(' ')[0]} directly and share files for
          this task. Access is limited to you and the assigned lawyer.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Side: Conversations List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[20px] border border-[#AAAAAA80] p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-3 max-h-150 overflow-y-auto">
          {conversations.map((convo) => {
            const isActive = convo.id === activeConvoId
            return (
              <div
                key={convo.id}
                onClick={() => setActiveConvoId(convo.id)}
                className={`p-3 rounded-xl flex items-start gap-3 cursor-pointer transition select-none ${
                  isActive
                    ? 'bg-[#E6F1F0] border-b-[0.5px] border-l-2 border-[#00726D] shadow-[0_2px_12px_rgba(0,114,109,0.02)]'
                    : 'border border-transparent hover:bg-gray-50/80 hover:border-gray-100'
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#00726D] text-white flex items-center justify-center font-medium text-[14px] shrink-0 select-none font-primary">
                  {convo.initials}
                </div>

                <div className="flex flex-col items-start text-left min-w-0">
                  <span className="text-[16px] font-medium text-black leading-tight font-secondary">
                    {convo.name}
                  </span>
                  <p className="text-[14px] text-[#737373] font-normal w-full mt-1.5 leading-normal font-secondary">
                    {convo.lastSnippet}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Message Feed & Shared Documents (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Chat Feed Box */}
          <div className="bg-white rounded-[20px] border border-[#AAAAAA80] p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col min-h-125 max-h-150">
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-[20px] shrink-0 select-none font-primary">
                {activeConvo.initials}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[18px] font-medium text-gray-900 font-primary">
                  {activeConvo.name}
                </span>
                <span
                  className={`text-[14px] font-normal tracking-wider ${
                    activeConvo.online ? 'text-[#00726D]' : 'text-gray-400'
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
              {activeConvo.messages.map((msg, i) => {
                const isUser = msg.sender === 'user'
                return (
                  <div
                    key={i}
                    className={`flex flex-col max-w-[75%] ${
                      isUser ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`p-3.5 rounded-[10px] text-xs sm:text-[14px] leading-relaxed text-left font-normal ${
                        isUser
                          ? 'bg-[#00726D] text-white rounded-br-none'
                          : 'bg-[#E6F1F0] text-[#00726D] rounded-bl-none border border-[#00726d]/5'
                      }`}
                    >
                      {msg.text}
                      <span
                        className={`text-[12px] block font-normal mt-1 select-none font-secondary ${isUser ? 'text-[#B0D3D2]' : 'text-[#00726D]'}`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Input text block */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message"
                className="flex-1 h-10 px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="h-10 w-22.5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#00726d] text-white font-semibold text-xs transition hover:bg-[#005c58] active:scale-[0.98] cursor-pointer shrink-0"
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
                Documents here are visible only to you and {activeConvo.name}{' '}
                for this task.
              </p>
            </div>

            {/* File items list layout */}
            <div className="flex flex-col divide-y divide-gray-100 text-sm">
              {activeConvo.sharedFiles.map((file, idx) => (
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
                      Uploaded by you • {file.size}
                    </span>
                  </div>
                </div>
              ))}
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
                onClick={triggerFileUpload}
                className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-[#00726D] hover:border-[#00726d] bg-[#E6F1F0] px-3 text-xs font-semibold text-[#00726d] transition hover:bg-[#00726d]/1 active:scale-[0.98] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload File</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
