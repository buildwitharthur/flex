import * as React from 'react'

import { cn } from '../../lib/cn'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex flex-col rounded-lg border border-border bg-surface', className)} {...props} />
  },
)

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex min-h-14 items-center gap-3 border-b border-border px-5 py-4', className)} {...props} />
  },
)

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return <h3 ref={ref} className={cn('font-display text-[15px] leading-[22px] font-semibold', className)} {...props} />
  },
)

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex flex-col gap-3 p-5', className)} {...props} />
  },
)

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn('border-t border-border px-5 py-3 text-xs text-muted-foreground', className)} {...props} />
  },
)
