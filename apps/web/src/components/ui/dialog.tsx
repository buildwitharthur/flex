import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'

import { Button } from './button'
import { cn } from '../../lib/cn'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-40 bg-overlay data-[state=open]:animate-[overlay-in_180ms_ease-out]', className)}
      {...props}
    />
  )
})

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: 'sm' | 'md' | 'confirmation'
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ className, children, size = 'md', ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100vh-48px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface shadow-lg data-[state=open]:animate-[dialog-in_180ms_ease-out]',
          size === 'sm' && 'w-[min(420px,calc(100vw-32px))]',
          size === 'md' && 'w-[min(520px,calc(100vw-32px))]',
          size === 'confirmation' && 'w-[min(440px,calc(100vw-32px))]',
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Close asChild>
          <Button
            aria-label="Fechar"
            size="icon"
            variant="ghost"
            className="absolute top-6 right-6 z-10"
          >
            <X aria-hidden="true" className="size-4" />
          </Button>
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn('grid gap-0 px-6 pt-6', className)} {...props} />
  },
)

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cn('font-display text-[18px] leading-[26px] font-semibold', className)} {...props} />
})

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} className={cn('mt-1 text-sm leading-5 text-muted-foreground', className)} {...props} />
})

export const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex flex-col gap-4 px-6 py-5', className)} {...props} />
  },
)

export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex justify-end gap-2 rounded-b-xl border-t border-border bg-surface-muted px-6 py-4', className)} {...props} />
  },
)

export const DialogIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { tone?: 'danger' | 'info' }>(
  function DialogIcon({ className, tone = 'info', ...props }, ref) {
    return <div ref={ref} className={cn('grid size-10 place-items-center rounded-full', tone === 'danger' ? 'bg-danger-soft text-danger' : 'bg-info-soft text-info', className)} {...props} />
  },
)
