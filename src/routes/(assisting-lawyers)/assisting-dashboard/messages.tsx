import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Send, Paperclip, Search, CheckCheck } from 'lucide-react'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard/messages')({
  component: AssistingMessagesPage,
})

function AssistingMessagesPage() {
  const [activeChat, setActiveChat] = useState('1')
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Record<string, Array<{ sender: 'me' | 'client'; text: string; time: string }>>>({
    '1': [
      { sender: 'client', text: 'Good morning Counselor Funke. Have you reviewed the case file for the Ikeja matter?', time: '09:30 AM' },
      { sender: 'me', text: 'Good morning Learned Colleague. Yes, I have examined the Motion on Notice and the supporting affidavit.', time: '09:35 AM' },
      { sender: 'client', text: 'Excellent. Please ensure you arrive at Court 4 by 8:45 AM tomorrow.', time: '09:40 AM' },
    ],
    '2': [
      { sender: 'client', text: 'Hello Funke, thank you for drafting the defence. It looks very thorough.', time: 'Yesterday' },
      { sender: 'me', text: 'You are welcome! I will finalize the clean copy after your final review.', time: 'Yesterday' },
    ],
  })

  const contacts = [
    {
      id: '1',
      name: 'Adeola & Partners LP',
      matter: 'Motion for Injunction — Ikeja High Court',
      lastMsg: 'Please ensure you arrive at Court 4 by 8:45 AM tomorrow.',
      time: '09:40 AM',
      unread: 1,
    },
    {
      id: '2',
      name: 'Kazeem Lawal & Co.',
      matter: 'Statement of Defence — Federal High Court',
      lastMsg: 'Hello Funke, thank you for drafting the defence.',
      time: 'Yesterday',
      unread: 0,
    },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    setMessages((prev) => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] || []),
        { sender: 'me', text: messageInput.trim(), time: 'Just now' },
      ],
    }))
    setMessageInput('')
  }

  const activeContact = contacts.find((c) => c.id === activeChat) || contacts[0]
  const currentMessages = messages[activeChat] || []

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4.375rem)] overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Left contacts column */}
        <div className="w-80 border-r border-gray-150 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-150 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-gray-900">Messages</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#00726D]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => setActiveChat(contact.id)}
                className={`w-full p-4 flex flex-col gap-1 text-left transition cursor-pointer ${
                  activeChat === contact.id ? 'bg-[#E8F5F3]/60' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 truncate">
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{contact.time}</span>
                </div>
                <span className="text-[11px] font-medium text-[#00726D] truncate">
                  {contact.matter}
                </span>
                <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right chat messages window */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-150 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00726D]/10 text-[#00726D] flex items-center justify-center font-bold text-xs">
                {activeContact.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{activeContact.name}</span>
                <span className="text-[11px] text-gray-500">{activeContact.matter}</span>
              </div>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#FAFBFB]">
            {currentMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[70%] ${
                  msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'me'
                      ? 'bg-[#00726D] text-white rounded-br-none shadow-2xs'
                      : 'bg-white border border-gray-150 text-gray-800 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-[#00726D]" />}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Footer */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-150 bg-white flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              title="Attach Document"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message to the engaging lawyer..."
              className="flex-1 h-10 px-4 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-[#00726D] text-white text-xs font-semibold hover:bg-[#005c58] transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
