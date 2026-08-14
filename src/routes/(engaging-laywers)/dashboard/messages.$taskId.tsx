import { createFileRoute } from '@tanstack/react-router'
import { MessagesView } from '#/components/engaging-lawyers/MessagesView'

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/messages/$taskId',
)({
  component: MessagesDetailsPage,
})

function MessagesDetailsPage() {
  const { taskId } = Route.useParams()
  return <MessagesView taskId={taskId} />
}
