import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { AppHeader } from './-components/app-header'
import { AppSidebar } from './-components/app-sidebar'
import { AuthGuard } from './-components/auth-guard'

export const Route = createFileRoute('/app')({
    component: AppLayout,
})

function AppLayout() {
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window === 'undefined') {
            return false
        }

        return window.localStorage.getItem('flex.sidebar.collapsed') === 'true'
    })

    useEffect(() => {
        window.localStorage.setItem('flex.sidebar.collapsed', String(collapsed))
    }, [collapsed])

    return (
        <AuthGuard>
            <div
                className={
                    collapsed
                        ? 'grid min-h-dvh grid-cols-[var(--sidebar-width-collapsed)_minmax(0,1fr)] transition-[grid-template-columns] duration-base'
                        : 'grid min-h-dvh grid-cols-[var(--sidebar-width)_minmax(0,1fr)] transition-[grid-template-columns] duration-base'
                }
            >
                <AppSidebar collapsed={collapsed} />

                <div className="flex min-h-dvh min-w-0 flex-col bg-background">
                    <AppHeader
                        collapsed={collapsed}
                        onToggleSidebar={() => setCollapsed((value) => !value)}
                    />

                    <main className="min-w-0 flex-1 bg-background">
                        <div className="mx-auto w-full max-w-[var(--content-max)] px-4 pt-5 pb-12 min-[640px]:px-6 min-[640px]:pt-6 min-[1024px]:px-[var(--content-pad-x)]">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    )
}
