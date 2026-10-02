import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'

const avatarVariants = cva(
  'grid shrink-0 place-items-center font-body text-xs font-semibold leading-none',
  {
    variants: {
      variant: {
        user: 'size-7 rounded-full bg-accent-soft text-accent-foreground',
        partner: 'size-7 rounded-md border border-border bg-surface-muted tracking-[0.02em] text-muted-foreground',
        responsible: 'size-6 rounded-full border border-border bg-surface-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'user',
    },
  },
)

type AvatarProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof avatarVariants>

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar({ className, variant, ...props }, ref) {
    return <span ref={ref} className={cn(avatarVariants({ variant }), className)} {...props} />
  },
)
