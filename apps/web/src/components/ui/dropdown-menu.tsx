import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/cn'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 6, ...props }, ref) {
  return <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn('z-50 min-w-[208px] rounded-lg bg-surface p-1 shadow-md', className)} {...props} /></DropdownMenuPrimitive.Portal>
})

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { destructive?: boolean }

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, destructive, ...props }, ref) {
  return <DropdownMenuPrimitive.Item ref={ref} className={cn('flex h-8 items-center gap-2 rounded-sm px-2 text-sm leading-5 text-foreground outline-none focus:bg-surface-muted data-[highlighted]:bg-surface-muted [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground', destructive && 'text-danger [&>svg]:text-danger data-[highlighted]:bg-danger-soft', className)} {...props} />
})

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return <DropdownMenuPrimitive.Label ref={ref} className={cn('px-2 pt-1.5 pb-1 text-xs leading-4 font-semibold text-muted-foreground', className)} {...props} />
})

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <DropdownMenuPrimitive.Separator ref={ref} className={cn('my-1 h-px bg-border', className)} {...props} />
})

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  return <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn('flex h-8 items-center gap-2 rounded-sm px-2 text-sm text-foreground outline-none data-[highlighted]:bg-surface-muted [&>svg]:size-4', className)} {...props}>{children}<ChevronRight aria-hidden="true" className="ml-auto text-muted-foreground" /></DropdownMenuPrimitive.SubTrigger>
})

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(function DropdownMenuSubContent({ className, sideOffset = 4, ...props }, ref) {
  return <DropdownMenuPrimitive.SubContent ref={ref} sideOffset={sideOffset} className={cn('z-50 min-w-[208px] rounded-lg bg-surface p-1 shadow-md', className)} {...props} />
})

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return <DropdownMenuPrimitive.RadioItem ref={ref} className={cn('relative flex h-8 items-center gap-2 rounded-sm px-2 pl-8 text-sm text-foreground outline-none data-[highlighted]:bg-surface-muted', className)} {...props}><span className="absolute left-2 grid size-4 place-items-center"><DropdownMenuPrimitive.ItemIndicator><Check aria-hidden="true" className="size-4" strokeWidth={2} /></DropdownMenuPrimitive.ItemIndicator></span>{children}</DropdownMenuPrimitive.RadioItem>
})

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs text-muted-foreground', className)} {...props} />
}
