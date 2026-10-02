import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const textareaVariants = cva(
  'min-h-[88px] w-full resize-y rounded-md border border-border-strong bg-surface px-3 py-2 font-body text-sm leading-5 text-foreground transition-[border-color,box-shadow] duration-fast placeholder:text-muted-foreground placeholder:opacity-[0.85] hover:not-disabled:border-muted-foreground focus:border-focus focus:ring-[3px] focus:ring-focus-ring focus:outline-none aria-invalid:border-danger aria-invalid:focus:ring-danger-ring disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:text-muted-foreground read-only:cursor-default read-only:border-border read-only:bg-surface-muted read-only:text-muted-foreground read-only:hover:border-border',
  {
    variants: {
      size: {
        default: 'min-h-[88px]',
        compact: 'min-h-[72px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, size, ...props }, ref) {
    return <textarea ref={ref} className={cn(textareaVariants({ size }), className)} {...props} />
  },
)
