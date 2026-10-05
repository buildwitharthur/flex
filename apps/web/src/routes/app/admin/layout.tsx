import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router'

import { useSession } from '#/hooks/use-session'
import { canPermission } from '#/utils/can-permission'

export const Route = createFileRoute('/app/admin')({
    component: AdminLayout,
})

function AdminLayout() {
    const user = useSession()

    if (!canPermission(user, ['ADMIN'])) {
        return <Navigate to="/app/partners" replace />
    }

    return <Outlet />
}
