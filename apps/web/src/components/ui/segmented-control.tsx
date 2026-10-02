import * as React from 'react'

import { cn } from '../../lib/cn'

export const SegmentedControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function SegmentedControl({ className, ...props }, ref) {
    return <div ref={ref} className={cn('inline-flex gap-0.5 rounded-md bg-surface-muted p-0.5', className)} {...props} />
  },
)

export const SegmentedControlItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function SegmentedControlItem({ className, type = 'button', ...props }, ref) {
    return <button ref={ref} type={type} className={cn('h-7 rounded-sm px-2 text-[13px] leading-5 font-semibold text-muted-foreground outline-none transition-colors duration-fast hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-pressed:bg-surface aria-pressed:text-foreground aria-pressed:shadow-sm', className)} {...props} />
  },
)
