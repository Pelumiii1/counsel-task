import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(admin)/admin-dashboard/lawyers')({
  component: AdminLawyersLayout,
})

function AdminLawyersLayout() {
  return <Outlet />
}
