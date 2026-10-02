import { SidebarNav } from './sidebar-nav'
import { ProfileDropdown } from './profile-dropdown'

export function AppSidebar() {
    return (
        <aside className="sticky top-0 z-[30] flex h-dvh w-[var(--sidebar-width)] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
            <div
                className="flex h-[var(--header-height)] min-h-[var(--header-height)] items-center justify-between border-b border-sidebar-border px-4"
            >
                <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="font-display text-[20px] leading-none font-bold tracking-[-0.02em] italic text-accent">
                        Flex
                    </span>
                    <span className="font-display text-[14px] leading-none font-medium text-sidebar-foreground">
                        Admin
                    </span>
                </div>

                <div className="flex items-center gap-[3px]" aria-hidden="true">
                    <span className="h-[14px] w-[3px] skew-x-[-14deg] rounded-[1px] bg-accent opacity-[0.9]" />
                    <span className="h-[14px] w-[3px] skew-x-[-14deg] rounded-[1px] bg-accent opacity-[0.6]" />
                    <span className="h-[14px] w-[3px] skew-x-[-14deg] rounded-[1px] bg-accent opacity-[0.35]" />
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                <SidebarNav />
            </div>

            <div className="mt-auto border-t border-sidebar-border p-3">
                <ProfileDropdown />
            </div>
        </aside>
    )
}
