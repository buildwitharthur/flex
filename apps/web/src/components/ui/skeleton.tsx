import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '../../lib/cn'

export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Skeleton({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'animate-[shimmer_1.4s_ease-in-out_infinite] rounded-sm bg-[linear-gradient(90deg,var(--color-surface-muted)_0%,var(--color-surface-hover)_50%,var(--color-surface-muted)_100%)] bg-[length:200%_100%]',
          className,
        )}
        {...props}
      />
    )
  },
)
