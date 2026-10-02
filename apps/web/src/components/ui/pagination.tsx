import * as React from 'react'

import { Button } from './button'
import { cn } from '../../lib/cn'

export const Pagination = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Pagination({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex min-h-12 flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-[13px] text-muted-foreground', className)} {...props} />
  },
)

export function PaginationInfo({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('tnum', className)} {...props} />
}

export const PaginationContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function PaginationContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex flex-wrap items-center gap-2', className)} {...props} />
  },
)

type PaginationButtonProps = React.ComponentPropsWithoutRef<typeof Button> & { active?: boolean }

export const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  function PaginationButton({ className, active, ...props }, ref) {
    return <Button ref={ref} variant="outline" size="sm" className={cn('min-h-8 min-w-8 px-2 text-[13px] tabular-nums', active && 'border-border-strong bg-surface', className)} {...props} />
  },
)

export const PaginationPage = PaginationButton
