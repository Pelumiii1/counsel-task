import { createFileRoute } from '@tanstack/react-router'
import { MessagesView } from '#/components/engaging-lawyers/MessagesView'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/messages',
)({
  component: AssistingMessagesPage,
})

function AssistingMessagesPage() {
  return <MessagesView backTo="/assisting-dashboard" role="assisting" />
}
