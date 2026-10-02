import { ChevronRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/cn'

export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function Breadcrumb({ className, ...props }, ref) {
    return <nav ref={ref} aria-label="Você está em" className={cn('text-[13px] leading-5 text-muted-foreground', className)} {...props} />
  },
)

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  function BreadcrumbList({ className, ...props }, ref) {
    return <ol ref={ref} className={cn('flex items-center gap-1.5 whitespace-nowrap', className)} {...props} />
  },
)

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return <li ref={ref} className={cn('flex min-w-0 items-center gap-1.5 first:max-[640px]:hidden', className)} {...props} />
  },
)

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function BreadcrumbLink({ className, ...props }, ref) {
    return <a ref={ref} className={cn('rounded-xs text-inherit no-underline outline-none hover:text-foreground hover:underline hover:underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus', className)} {...props} />
  },
)

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function BreadcrumbPage({ className, ...props }, ref) {
    return <span ref={ref} aria-current="page" className={cn('min-w-0 truncate font-semibold text-foreground', className)} {...props} />
  },
)

export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  function BreadcrumbSeparator({ className, ...props }, ref) {
    return <li ref={ref} aria-hidden="true" className={cn('flex shrink-0 items-center text-border-strong', className)} {...props}><ChevronRight className="size-3.5" strokeWidth={2} /></li>
  },
)
