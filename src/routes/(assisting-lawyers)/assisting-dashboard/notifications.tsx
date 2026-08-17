import { createFileRoute } from '@tanstack/react-router'
import { Bell, Briefcase, CheckCircle, CreditCard, MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard/notifications')({
  component: AssistingNotificationsPage,
})

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'brief',
    icon: Briefcase,
    title: 'New Brief Match in your Practice Area',
    desc: 'Adeola & Partners LP posted a new brief: "Motion for Injunction Hearing at Ikeja High Court".',
    time: '20 minutes ago',
    unread: true,
  },
  {
    id: '2',
    type: 'proposal',
    icon: CheckCircle,
    title: 'Proposal Accepted!',
    desc: 'Kazeem Lawal & Co. accepted your proposal for Statement of Defence drafting.',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: '3',
    type: 'payment',
    icon: CreditCard,
    title: 'Escrow Payment Funded',
    desc: '₦45,000 escrow has been locked by Oluwarotimi Chambers for your completed bail hearing.',
    time: '1 day ago',
    unread: false,
  },
  {
    id: '4',
    type: 'message',
    icon: MessageSquare,
    title: 'New Message received',
    desc: 'You received briefing notes from Adeola & Partners LP.',
    time: '2 days ago',
    unread: false,
  },
]

function AssistingNotificationsPage() {
  return (
    <div className="flex flex-col w-full min-h-full pb-16">
      {/* Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
          Notifications
        </h1>
        <p className="font-secondary text-[13px] text-gray-500 font-normal">
          Stay updated with real-time brief opportunities, proposal status, and escrow payments.
        </p>
      </section>

      {/* List */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-3">
        {NOTIFICATIONS.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition flex items-start gap-4 ${
                item.unread
                  ? 'bg-white border-[#00726D]/30 shadow-2xs'
                  : 'bg-white/80 border-gray-150'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F3] text-[#00726D] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                  <span className="text-[11px] text-gray-400">{item.time}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
