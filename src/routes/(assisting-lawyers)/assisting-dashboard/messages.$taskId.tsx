import { createFileRoute } from '@tanstack/react-router'
import { MessagesView } from '#/components/engaging-lawyers/MessagesView'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/messages/$taskId',
)({
  component: AssistingMessagesDetailsPage,
})

function AssistingMessagesDetailsPage() {
  const { taskId } = Route.useParams()
  return <MessagesView taskId={taskId} backTo="/assisting-dashboard" role="assisting" />
}
