import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef } from 'react'

import { cn } from '../../lib/cn'

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(function Switch({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'relative inline-flex h-5 w-[34px] shrink-0 cursor-pointer rounded-full bg-border-strong transition-colors duration-base hover:not-disabled:bg-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[state=checked]:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-4 translate-x-0.5 rounded-full bg-surface shadow-sm transition-transform duration-base data-[state=checked]:translate-x-[14px]" />
    </SwitchPrimitive.Root>
  )
})
