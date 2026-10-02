import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppHeader } from './-components/app-header'
import { AppSidebar } from './-components/app-sidebar'
import { AuthGuard } from './-components/auth-guard'

export const Route = createFileRoute('/app')({
    component: AppLayout,
})

function AppLayout() {
    return (
        <AuthGuard>
            <div className="grid min-h-dvh grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
                <AppSidebar />

                <div className="flex min-h-dvh min-w-0 flex-col bg-background">
                    <AppHeader />

                    <main className="min-w-0 flex-1 bg-background px-4 py-5 pb-12 min-[640px]:px-6 min-[1024px]:px-[var(--content-pad-x)] min-[1024px]:py-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </AuthGuard>
    )
}
