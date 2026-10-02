import { appNavigation } from './app-navigation'
import { SidebarNavItem } from './sidebar-nav-item'

export function SidebarNav() {
    return (
        <nav aria-label="Módulos" className="grid gap-2">
            <span className="px-2 pb-1 font-body text-xs leading-4 font-semibold text-sidebar-muted">
                Módulos
            </span>

            <div className="grid gap-0.5">
                {appNavigation.map((item) => (
                    <SidebarNavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        children={item.children}
                    />
                ))}
            </div>
        </nav>
    )
}
