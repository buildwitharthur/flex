import { useLocation } from '@tanstack/react-router'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { appNavigation } from './app-navigation'
import { SidebarToggle } from './sidebar-toggle'

export function AppHeader() {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const activeNavigation = appNavigation
        .map((module) => ({
            module,
            child: module.children.find((item) => item.to === pathname),
        }))
        .find((item) => item.child)

    const breadcrumbs = activeNavigation?.child
        ? [
              { label: 'Flex Admin' },
              { label: activeNavigation.module.label },
              { label: activeNavigation.child.label },
          ]
        : [{ label: 'Flex Admin' }]

    return (
        <header className="sticky top-0 z-[20] flex h-[var(--header-height)] min-h-[var(--header-height)] items-center gap-2 border-b border-border bg-background pl-3 pr-8">
            <SidebarToggle />

            <div
                aria-hidden="true"
                className="mx-1 h-4 w-px shrink-0 bg-border"
            />

            <div className="min-w-0 flex-1 overflow-hidden">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isCurrent = index === breadcrumbs.length - 1

                            return (
                                <BreadcrumbItem key={item.label}>
                                    {isCurrent ? (
                                        <BreadcrumbPage>
                                            {item.label}
                                        </BreadcrumbPage>
                                    ) : (
                                        <span className="min-w-0 truncate text-muted-foreground">
                                            {item.label}
                                        </span>
                                    )}
                                    {!isCurrent ? (
                                        <BreadcrumbSeparator />
                                    ) : null}
                                </BreadcrumbItem>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
