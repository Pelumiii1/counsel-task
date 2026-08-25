import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/admin-dashboard/tasks')({
  component: AdminTasksLayout,
})

function AdminTasksLayout() {
  return <Outlet />
}
