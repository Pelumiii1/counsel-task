import { createFileRoute } from '@tanstack/react-router'
import { MessagesView } from '#/components/engaging-lawyers/MessagesView'

export const Route = createFileRoute('/(engaging-laywers)/dashboard/messages')({
  component: MessagesPage,
})

function MessagesPage() {
  return <MessagesView />
}
