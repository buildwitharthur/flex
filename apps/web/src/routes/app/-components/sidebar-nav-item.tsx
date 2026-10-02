import { ChevronRight, type LucideIcon } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link, useMatchRoute } from '@tanstack/react-router'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '../../../components/ui/tooltip'
import { cn } from '../../../lib/cn'
import type { AppNavigationChild } from './app-navigation'

type SidebarNavItemProps = {
    label: string
    icon: LucideIcon
    children: AppNavigationChild[]
    collapsed: boolean
}

export function SidebarNavItem({
    label,
    icon: Icon,
    children,
    collapsed,
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

    if (collapsed) {
        return (
            <DropdownMenu>
                <Tooltip>
                    <DropdownMenuTrigger asChild>
                        <TooltipTrigger asChild>
                            <button
                                aria-label={label}
                                className={cn(
                                    'group relative flex size-8 items-center justify-center rounded-md border-0 bg-transparent outline-none transition-colors duration-fast hover:bg-sidebar-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus',
                                    active && [
                                        'bg-sidebar-active',
                                        'before:absolute before:-left-[5px] before:top-1/2 before:h-6 before:w-[3px] before:-translate-y-1/2 before:skew-x-[-14deg] before:rounded-[1px] before:bg-accent',
                                    ],
                                )}
                                type="button"
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
                            </button>
                        </TooltipTrigger>
                    </DropdownMenuTrigger>
                    <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>

                <DropdownMenuContent align="start" className="min-w-[208px]" side="right">
                    <DropdownMenuLabel>{label}</DropdownMenuLabel>
                    {children.map((child) => {
                        const childActive = matchRoute({
                            to: child.to,
                            fuzzy: false,
                        })

                        return (
                            <DropdownMenuItem
                                key={child.to}
                                asChild
                                className={cn(
                                    childActive && 'bg-surface-muted font-semibold',
                                )}
                            >
                                <Link
                                    aria-current={childActive ? 'page' : undefined}
                                    to={child.to}
                                >
                                    {child.label}
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className="w-full min-w-0">
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
                <span className="min-w-0 truncate">{label}</span>
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
                    <div className="relative grid min-w-0 gap-0.5">
                        {children.map((child) => {
                            const childActive = matchRoute({
                                to: child.to,
                                fuzzy: false,
                            })

                            return (
                                <Link
                                    key={child.to}
                                    aria-current={childActive ? 'page' : undefined}
                                    className={cn(
                                        'relative flex h-[var(--nav-item-height)] w-full items-center rounded-md px-3 font-body text-[13px] leading-5 font-medium text-sidebar-muted outline-none transition-colors duration-fast hover:bg-sidebar-hover hover:text-sidebar-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus',
                                        childActive && [
                                            'bg-sidebar-active font-semibold text-sidebar-foreground',
                                            'before:absolute before:-left-[5px] before:top-1/2 before:h-4 before:w-[3px] before:-translate-y-1/2 before:skew-x-[-14deg] before:rounded-[1px] before:bg-accent',
                                        ],
                                    )}
                                    to={child.to}
                                >
                                    {child.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
