import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-body text-xs leading-none font-medium whitespace-nowrap [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        neutral: 'bg-neutral-soft text-neutral',
        brand: 'bg-accent-soft text-accent-foreground',
        info: 'bg-info-soft text-info',
        success: 'bg-success-soft text-success',
        warning: 'bg-warning-soft text-warning',
        danger: 'bg-danger-soft text-danger',
        outline: 'bg-surface text-neutral shadow-[inset_0_0_0_1px_var(--color-border)]',
        stage: 'bg-neutral-soft text-foreground',
      },
      size: {
        default: 'h-[22px] px-2',
        compact: 'h-5 px-2',
        counter: 'h-[18px] px-1.5',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'default',
    },
  },
)

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean
    tone?: 'new' | 'contacted' | 'qualified' | 'completed' | 'discarded'
  }

const toneClasses = {
  new: 'before:bg-accent',
  contacted: 'before:bg-info',
  qualified: 'before:bg-warning',
  completed: 'before:bg-success',
  discarded: 'before:bg-border-strong',
} as const

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ className, variant, size, dot = true, tone, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          dot && 'before:size-1.5 before:shrink-0 before:rounded-full before:bg-current before:content-[""]',
          !dot && 'before:hidden',
          variant === 'stage' && tone && toneClasses[tone],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)
