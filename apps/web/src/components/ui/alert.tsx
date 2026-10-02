import { CircleCheck, Info, OctagonAlert, TriangleAlert } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const alertVariants = cva(
  'grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-md border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        info: 'border-[color-mix(in_srgb,var(--color-info)_28%,transparent)] bg-info-soft',
        success: 'border-[color-mix(in_srgb,var(--color-success)_28%,transparent)] bg-success-soft',
        warning: 'border-[color-mix(in_srgb,var(--color-warning)_30%,transparent)] bg-warning-soft',
        danger: 'border-[color-mix(in_srgb,var(--color-danger)_28%,transparent)] bg-danger-soft',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const alertIcon = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: OctagonAlert,
} as const

const alertIconColors = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
} as const

type AlertProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ className, variant = 'info', role, children, ...props }, ref) {
    const Icon = alertIcon[variant]

    return (
      <div
        ref={ref}
        role={role ?? (variant === 'danger' ? 'alert' : 'status')}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon aria-hidden="true" className={cn('mt-0.5 size-[18px]', alertIconColors[variant])} />
        <div className="min-w-0">{children}</div>
      </div>
    )
  },
)

type AlertContentProps = {
  children: ReactNode
  className?: string
}

export function AlertTitle({ children, className }: AlertContentProps) {
  return <p className={cn('font-semibold', className)}>{children}</p>
}

export function AlertDescription({ children, className }: AlertContentProps) {
  return <p className={cn('text-foreground/86', className)}>{children}</p>
}

export function AlertActions({ children, className }: AlertContentProps) {
  return <div className={cn('mt-2 flex gap-2', className)}>{children}</div>
}
