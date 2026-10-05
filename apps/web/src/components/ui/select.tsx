import { ChevronDown } from 'lucide-react'
import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const selectVariants = cva(
  'w-full appearance-none rounded-md border border-control-border bg-control shadow-control-inset pl-3 pr-8 font-body font-normal text-foreground transition-[background-color,border-color,box-shadow] duration-fast hover:not-disabled:border-control-border-hover focus:border-focus focus:ring-[3px] focus:ring-focus-ring focus:outline-none aria-invalid:border-danger aria-invalid:focus:ring-danger-ring disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:shadow-none disabled:text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-control-sm text-[13px] leading-5',
        md: 'h-control-md text-sm leading-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> &
  VariantProps<typeof selectVariants>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, size, children, ...props }, ref) {
    return (
      <span className="relative block w-full">
        <select ref={ref} className={cn(selectVariants({ size }), className)} {...props}>
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={2}
        />
      </span>
    )
  },
)
