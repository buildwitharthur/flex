import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '../../lib/cn'

export const Drawer = DialogPrimitive.Root
export const DrawerTrigger = DialogPrimitive.Trigger
export const DrawerClose = DialogPrimitive.Close

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DrawerOverlay({ className, ...props }, ref) {
  return <DialogPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-40 bg-overlay/[0.7] data-[state=open]:animate-[overlay-in_180ms_ease-out]', className)} {...props} />
})

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(function DrawerContent({ className, children, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn('fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(440px,100vw)] flex-col border-l border-border bg-surface shadow-lg data-[state=open]:animate-[drawer-in_180ms_ease-out]', className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

export const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DrawerHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex gap-3 border-b border-border px-6 pt-[calc(var(--space-5)+env(safe-area-inset-top,0px))] pb-4 max-[640px]:px-4', className)} {...props} />
  },
)

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cn('font-display text-[18px] leading-[26px] font-semibold', className)} {...props} />
})

export const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DrawerBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn('min-h-0 flex-1 overflow-y-auto', className)} {...props} />
  },
)

export const DrawerSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DrawerSection({ className, ...props }, ref) {
    return <section ref={ref} className={cn('grid gap-3 border-t border-border px-6 py-5 first:border-t-0 max-[640px]:px-4', className)} {...props} />
  },
)

export const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DrawerFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex justify-end gap-2 border-t border-border bg-surface-muted px-6 pt-3 pb-[calc(var(--space-3)+env(safe-area-inset-bottom,0px))] max-[640px]:px-4', className)} {...props} />
  },
)
