import { CircleAlert } from 'lucide-react'
import { forwardRef, type LabelHTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../lib/cn'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  (
    | { required?: true; optional?: never }
    | { required?: never; optional?: true }
    | { required?: false; optional?: false }
  )

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ className, children, required, optional, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={cn(
          'flex items-center gap-1 text-[13px] leading-[18px] font-semibold text-foreground',
          className,
        )}
        {...props}
      >
        {children}
        {required ? (
          <>
            <span aria-hidden="true" className="text-danger">*</span>
            <span className="sr-only">(obrigatório)</span>
          </>
        ) : optional ? (
          <span className="font-medium text-muted-foreground">(opcional)</span>
        ) : null}
      </label>
    )
  },
)

type FieldMessageProps = {
  children: ReactNode
  className?: string
}

export function FieldHelper({ children, className }: FieldMessageProps) {
  return (
    <span className={cn('text-xs leading-4 text-muted-foreground', className)}>
      {children}
    </span>
  )
}

export function FieldError({ children, className }: FieldMessageProps) {
  return (
    <span className={cn('flex items-start gap-1 text-xs leading-4 font-medium text-danger', className)}>
      <CircleAlert aria-hidden="true" className="mt-px size-3.5 shrink-0" />
      {children}
    </span>
  )
}
