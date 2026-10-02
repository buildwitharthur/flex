import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

import { cn } from '../../lib/cn'

export function TooltipProvider({ delayDuration = 120, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 8, ...props }, ref) {
  return <TooltipPrimitive.Portal><TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn('z-[120] whitespace-nowrap rounded-sm bg-sidebar px-2 py-1 text-xs leading-4 font-medium text-sidebar-foreground opacity-0 data-[state=closed]:opacity-0 data-[state=open]:animate-[tooltip-in_120ms_ease-out] data-[state=open]:opacity-100', className)} {...props} /></TooltipPrimitive.Portal>
})
