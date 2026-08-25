import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CheckCheck, Bell, Loader2 } from 'lucide-react'
import CardIcon from '#/assets/icons/card.png'
import ClipboardIcon from '#/assets/icons/clipboard.png'
import ChatIcon from '#/assets/icons/chat.png'
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  type NotificationItem,
} from '#/hooks/useNotifications'

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/notifications',
)({
  component: NotificationsPage,
})

function NotificationsPage() {
  const navigate = useNavigate()
  const { data: serverNotifications, isLoading } = useNotifications('engaging')
  const markAsReadMutation = useMarkNotificationAsRead()
  const markAllReadMutation = useMarkAllNotificationsAsRead('engaging')

  const notifications: NotificationItem[] = serverNotifications || []
  const hasUnread = notifications.some((n) => !n.isRead)

  const handleNotificationClick = (item: NotificationItem) => {
    if (!item.isRead) {
      markAsReadMutation.mutate(item.id)
    }

    if (item.link) {
      navigate({ to: item.link as any })
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'proposal':
      case 'verification':
        return (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 select-none shadow-xs border border-gray-100">
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
          <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 select-none shadow-xs border border-gray-100">
            <img src={CardIcon} alt="Card" className="w-5 h-5 object-contain" />
          </div>
        )
      case 'message':
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-[#EBF8FE] flex items-center justify-center shrink-0 select-none shadow-xs border border-gray-100">
            <img src={ChatIcon} alt="Chat" className="w-5 h-5 object-contain" />
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
            Updates on your tasks
          </h1>
          <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
            Real-time notifications for messages, proposals, payments, and account status.
          </p>
        </div>

        {hasUnread && (
          <button
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-[#00726D] hover:bg-gray-50 transition cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
          >
            {markAllReadMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCheck className="w-3.5 h-3.5" />
            )}
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="flex flex-col gap-4 mx-auto max-w-6xl w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-150">
            <Loader2 className="w-8 h-8 animate-spin text-[#00726D] mb-3" />
            <p className="text-xs text-gray-500">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-250 text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#f0faf9] flex items-center justify-center text-[#00726D]">
              <Bell className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-bold text-gray-800">No notifications yet</h3>
            <p className="text-xs text-gray-400 max-w-sm">
              You will receive notifications when lawyers submit proposals, send messages, or when escrow payments update.
            </p>
          </div>
        ) : (
          notifications.map((item) => {
            const isUnread = !item.isRead
            return (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-5 flex gap-4 transition-all duration-200 border rounded-2xl cursor-pointer ${
                  isUnread
                    ? 'border-[#B0D3D2] bg-[#E6F1F0] shadow-[0_2px_12px_rgba(0,114,109,0.02)] hover:border-[#00726D]/40'
                    : 'border-gray-150 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:border-gray-300'
                }`}
              >
                {/* Left Icon badge */}
                {getIcon(item.type)}

                {/* Right content details */}
                <div className="flex flex-col gap-1.5 text-left flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-[18px] font-bold text-black font-secondary leading-snug">
                      {item.title}
                    </span>
                    {isUnread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00726D] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] sm:text-sm text-black font-normal leading-relaxed">
                    {item.content}
                  </p>
                  <span className="text-[10px] sm:text-[12px] text-gray-500 font-normal select-none">
                    {item.timeFormatted}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
