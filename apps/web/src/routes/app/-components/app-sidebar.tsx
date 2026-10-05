import { useSession } from '../../../hooks/use-session'
import { TooltipProvider } from '../../../components/ui/tooltip'
import { cn } from '../../../lib/cn'
import { SidebarNav } from './sidebar-nav'
import { ProfileDropdown } from './profile-dropdown'

type AppSidebarProps = {
    collapsed: boolean
}

export function AppSidebar({ collapsed }: AppSidebarProps) {
    const user = useSession()

    return (
        <TooltipProvider>
            <aside
                className={cn(
                    'sticky top-0 z-[30] flex h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-base',
                    collapsed
                        ? 'w-[var(--sidebar-width-collapsed)]'
                        : 'w-[var(--sidebar-width)]',
                )}
            >
                <div
                    className={cn(
                        'flex h-[var(--header-height)] min-h-[var(--header-height)] items-center border-b border-sidebar-border',
                        collapsed
                            ? 'justify-center px-0'
                            : 'justify-between px-4',
                    )}
                >
                    {collapsed ? (
                        <img
                            className="size-7 object-contain"
                            src="/brand/flex-simbolo.svg"
                            alt="Flex"
                        />
                    ) : (
                        <div className="flex items-center gap-1 whitespace-nowrap">
                            <span className="font-display text-[20px] leading-none font-bold tracking-[-0.02em] italic text-accent">
                                Flex
                            </span>
                            <span className="font-display text-[14px] leading-none font-medium text-sidebar-foreground">
                                Admin
                            </span>
                        </div>
                    )}

                    {!collapsed ? (
                        <div
                            className="flex items-center gap-[3px]"
                            aria-hidden="true"
                        >
                            <span className="h-[14px] w-[3px] skew-x-[-14deg] rounded-[1px] bg-accent opacity-[0.9]" />
                            <span className="h-[14px] w-[3px] skew-x-[-14deg] rounded-[1px] bg-accent opacity-[0.6]" />
                            <span className="h-[14px] w-[3px] skew-x-[-14deg] rounded-[1px] bg-accent opacity-[0.35]" />
                        </div>
                    ) : null}
                </div>

                <div
                    className={cn(
                        'min-h-0 flex-1 overflow-y-auto py-3',
                        collapsed ? 'px-2' : 'px-4',
                    )}
                >
                    <SidebarNav collapsed={collapsed} user={user} />
                </div>

                <div
                    className={cn(
                        'mt-auto border-t border-sidebar-border p-3',
                        collapsed && 'px-2',
                    )}
                >
                    <ProfileDropdown collapsed={collapsed} user={user} />
                </div>
            </aside>
        </TooltipProvider>
    )
}
