import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AuthGuard } from './-components/auth-guard'

export const Route = createFileRoute('/app')({
    component: AppLayout,
})

function AppLayout() {
    return (
        <AuthGuard>
            <Outlet />
        </AuthGuard>
    )
}
