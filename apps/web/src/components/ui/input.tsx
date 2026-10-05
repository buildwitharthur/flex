import { forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const inputVariants = cva(
  'w-full rounded-md border border-control-border bg-control shadow-control-inset px-3 font-body text-sm leading-5 font-normal text-foreground transition-[background-color,border-color,box-shadow] duration-fast placeholder:text-muted-foreground placeholder:opacity-[0.8] hover:not-disabled:border-control-border-hover focus:border-focus focus:ring-[3px] focus:ring-focus-ring focus:outline-none aria-invalid:border-danger aria-invalid:focus:ring-danger-ring disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:shadow-none disabled:text-muted-foreground read-only:cursor-default read-only:border-border read-only:bg-surface-muted read-only:text-muted-foreground read-only:hover:border-border',
  {
    variants: {
      size: {
        sm: 'h-control-sm text-[13px]',
        md: 'h-control-md',
        lg: 'h-control-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, size, ...props }, ref) {
    return <input ref={ref} className={cn(inputVariants({ size }), className)} {...props} />
  },
)
