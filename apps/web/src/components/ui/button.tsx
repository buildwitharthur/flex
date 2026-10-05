import { LoaderCircle } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md border border-transparent font-body font-medium leading-none whitespace-nowrap select-none transition-[background-color,background-image,border-color,color,box-shadow,transform] duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:not-disabled:translate-y-px',
  {
    variants: {
      variant: {
        primary: 'border-primary-edge bg-linear-to-b from-primary-raised to-primary text-primary-foreground shadow-brand-raised hover:from-primary-raised-hover hover:to-primary-hover hover:shadow-brand-raised-hover active:from-primary-active active:to-primary-active active:shadow-brand-pressed focus-visible:outline-focus',
        secondary: 'bg-secondary text-foreground hover:bg-secondary-hover active:bg-secondary-hover focus-visible:outline-focus',
        outline: 'border-control-border bg-linear-to-b from-surface to-surface-hover text-foreground shadow-control-raised hover:border-control-border-hover hover:from-surface-hover hover:to-surface-muted hover:shadow-control-raised-hover active:from-surface-muted active:to-surface-hover active:shadow-control-pressed focus-visible:outline-focus',
        ghost: 'bg-transparent text-foreground hover:bg-surface-muted active:bg-secondary-hover focus-visible:outline-focus',
        destructive: 'border-danger-edge bg-linear-to-b from-danger-raised to-danger text-primary-foreground shadow-brand-raised hover:from-danger hover:to-danger-hover hover:shadow-brand-raised-hover active:from-danger-hover active:to-danger-hover active:shadow-brand-pressed focus-visible:outline-danger',
        link: 'h-auto min-w-0 rounded-xs border-0 bg-transparent p-0 text-[13px] text-accent-foreground underline decoration-1 underline-offset-[3px] hover:bg-transparent active:translate-y-0 focus-visible:outline-focus',
      },
      size: {
        sm: 'h-control-sm min-w-control-sm gap-1.5 px-3 text-[13px]',
        md: 'h-control-md min-w-control-md gap-2 px-4 text-sm',
        lg: 'h-control-lg min-w-control-lg gap-2 px-5 text-[15px]',
        icon: 'h-control-md w-control-md min-w-control-md p-0',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        className: 'h-auto min-w-0 gap-0 px-0 text-[13px]',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, loading = false, disabled, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          loading && 'pointer-events-none cursor-progress opacity-100 [&>svg:not(.button-spinner)]:hidden',
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <LoaderCircle
            aria-hidden="true"
            className="button-spinner size-4 shrink-0 animate-spin"
          />
        ) : null}
        {children}
      </button>
    )
  },
)
