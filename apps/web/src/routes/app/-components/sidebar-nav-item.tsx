import { ChevronRight, type LucideIcon } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link, useMatchRoute } from '@tanstack/react-router'

import { cn } from '../../../lib/cn'

export type SidebarNavChild = {
    label: string
    to:
        | '/app/partners/overview'
        | '/app/partners'
        | '/app/partners/categories'
        | '/app/contacts/pipeline'
        | '/app/contacts'
}

type SidebarNavItemProps = {
    label: string
    icon: LucideIcon
    children: SidebarNavChild[]
}

export function SidebarNavItem({
    label,
    icon: Icon,
    children,
}: SidebarNavItemProps) {
    const contentId = useId()
    const matchRoute = useMatchRoute()
    const active = children.some((child) =>
        matchRoute({ to: child.to, fuzzy: false }),
    )
    const [open, setOpen] = useState(active)

    useEffect(() => {
        if (active) {
            setOpen(true)
        }
    }, [active])

    return (
        <div>
            <button
                aria-controls={contentId}
                aria-expanded={open}
                className="group flex h-[var(--nav-item-height)] w-full items-center gap-3 rounded-md border-0 bg-transparent px-2 font-body text-sm leading-5 font-semibold text-sidebar-foreground outline-none transition-colors duration-fast hover:bg-sidebar-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus"
                type="button"
                onClick={() => setOpen((value) => !value)}
            >
                <Icon
                    aria-hidden="true"
                    className={cn(
                        'size-4 shrink-0 transition-colors duration-fast',
                        active
                            ? 'text-accent'
                            : 'text-sidebar-muted group-hover:text-sidebar-foreground',
                    )}
                    strokeWidth={1.8}
                />
                <span className="truncate">{label}</span>
                <ChevronRight
                    aria-hidden="true"
                    className={cn(
                        'ml-auto size-4 shrink-0 text-sidebar-muted transition-transform duration-base',
                        open && 'rotate-90',
                    )}
                    strokeWidth={1.8}
                />
            </button>

            <div
                id={contentId}
                aria-hidden={!open}
                className={cn(
                    'grid overflow-hidden transition-[grid-template-rows,opacity] duration-base',
                    open
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'pointer-events-none grid-rows-[0fr] opacity-0',
                )}
            >
                <div className="relative min-h-0 overflow-hidden pl-3.5 pt-0.5 before:absolute before:inset-y-1 before:left-1 before:w-px before:bg-sidebar-border">
                    <div className="relative grid gap-0.5">
                        {children.map((child) => (
                            <Link
                                key={child.to}
                                activeOptions={{ exact: true }}
                                aria-current={
                                    matchRoute({ to: child.to, fuzzy: false })
                                        ? 'page'
                                        : undefined
                                }
                                className={cn(
                                    'relative flex h-[var(--nav-item-height)] w-full items-center rounded-md px-3 font-body text-[13px] leading-5 font-medium text-sidebar-muted outline-none transition-colors duration-fast hover:bg-sidebar-hover hover:text-sidebar-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus',
                                    matchRoute({
                                        to: child.to,
                                        fuzzy: false,
                                    }) && [
                                        'bg-sidebar-active font-semibold text-sidebar-foreground',
                                        'before:absolute before:-left-[5px] before:top-1/2 before:h-4 before:w-[3px] before:-translate-y-1/2 before:skew-x-[-14deg] before:rounded-[1px] before:bg-accent',
                                    ],
                                )}
                                to={child.to}
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
