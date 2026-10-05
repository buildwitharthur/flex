import { useLocation } from '@tanstack/react-router'
import { Fragment } from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { appNavigation } from './app-navigation'
import { SidebarToggle } from './sidebar-toggle'

type AppHeaderProps = {
    collapsed: boolean
    onToggleSidebar: () => void
}

export function AppHeader({ collapsed, onToggleSidebar }: AppHeaderProps) {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const activeNavigation = appNavigation
        .map((module) => ({
            module,
            child: module.children.find((item) => item.to === pathname),
        }))
        .find((item) => item.child)

    const root = { id: 'root', label: 'Flex Admin' }
    const breadcrumbs = activeNavigation?.child
        ? [
              root,
              // módulo e página com o mesmo nome representam o mesmo nível
              ...(activeNavigation.module.label !==
              activeNavigation.child.label
                  ? [
                        {
                            id: `module:${activeNavigation.module.label}`,
                            label: activeNavigation.module.label,
                        },
                    ]
                  : []),
              {
                  id: activeNavigation.child.to,
                  label: activeNavigation.child.label,
              },
          ]
        : [root]

    return (
        <header className="sticky top-0 z-[20] flex h-[var(--header-height)] min-h-[var(--header-height)] items-center gap-2 border-b border-border bg-background pl-3 pr-8">
            <SidebarToggle collapsed={collapsed} onToggle={onToggleSidebar} />

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
                                <Fragment key={item.id}>
                                    <BreadcrumbItem>
                                        {isCurrent ? (
                                            <BreadcrumbPage>
                                                {item.label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <span className="min-w-0 truncate text-muted-foreground">
                                                {item.label}
                                            </span>
                                        )}
                                    </BreadcrumbItem>
                                    {!isCurrent ? <BreadcrumbSeparator /> : null}
                                </Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
