import { canPermission } from '#/utils/can-permission'
import { type ProfileResponse } from '#/http/get-profile'
import { appNavigation } from './app-navigation'
import { SidebarNavItem } from './sidebar-nav-item'

type SidebarNavProps = {
    collapsed: boolean
    user: ProfileResponse['user'] | null | undefined
}

export function SidebarNav({ collapsed, user }: SidebarNavProps) {
    const visibleNavigation = appNavigation.filter(
        (item) => !item.roles || canPermission(user, item.roles),
    )

    return (
        <nav aria-label="Módulos" className="grid gap-2 ">
            {collapsed ? (
                <div
                    aria-hidden="true"
                    className="mx-1 h-px bg-sidebar-border"
                />
            ) : (
                <span className="px-2 pb-1 font-body text-xs leading-4 font-semibold text-sidebar-muted">
                    Módulos
                </span>
            )}

            <div
                className={
                    collapsed
                        ? 'grid justify-items-center gap-0.5'
                        : 'grid w-full gap-0.5'
                }
            >
                {visibleNavigation.map((item) => (
                    <SidebarNavItem
                        key={item.label}
                        collapsed={collapsed}
                        icon={item.icon}
                        label={item.label}
                        children={item.children}
                    />
                ))}
            </div>
        </nav>
    )
}
