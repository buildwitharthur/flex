import * as ToastPrimitive from '@radix-ui/react-toast'
import { CircleCheck, Info, OctagonAlert, X } from 'lucide-react'
import * as React from 'react'

import { Button } from './button'
import { cn } from '../../lib/cn'

export function ToastProvider({ duration = 4500, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider>) {
  return <ToastPrimitive.Provider duration={duration} {...props} />
}

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return <ToastPrimitive.Viewport ref={ref} className={cn('fixed right-6 bottom-6 z-[130] flex w-[min(380px,calc(100vw-32px))] flex-col gap-2 outline-none max-[640px]:right-4 max-[640px]:bottom-4', className)} {...props} />
})

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & { variant?: 'success' | 'danger' | 'info' }

const toastIcons = { success: CircleCheck, danger: OctagonAlert, info: Info } as const
const toastIconColors = { success: 'text-on-dark-success', danger: 'text-on-dark-danger', info: 'text-on-dark-info' } as const

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(function Toast({ className, variant = 'info', children, ...props }, ref) {
  const Icon = toastIcons[variant]
  return <ToastPrimitive.Root ref={ref} className={cn('grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-lg bg-sidebar px-3 py-3 pl-4 text-sidebar-foreground shadow-lg data-[state=open]:animate-[toast-in_180ms_ease-out]', className)} {...props}><Icon aria-hidden="true" className={cn('mt-0.5 size-[18px]', toastIconColors[variant])} />{children}</ToastPrimitive.Root>
})

export const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function ToastTitle({ className, ...props }, ref) {
    return <ToastPrimitive.Title ref={ref} className={cn('font-semibold', className)} {...props} />
  },
)

export const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function ToastDescription({ className, ...props }, ref) {
    return <ToastPrimitive.Description ref={ref} className={cn('text-[13px] leading-[18px] text-sidebar-muted', className)} {...props} />
  },
)

export const ToastClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  function ToastClose({ className, ...props }, ref) {
    return <ToastPrimitive.Close asChild><Button ref={ref} aria-label="Fechar" size="icon" variant="ghost" className={cn('text-sidebar-muted hover:bg-sidebar-active hover:text-sidebar-foreground', className)} {...props}><X aria-hidden="true" className="size-4" /></Button></ToastPrimitive.Close>
  },
)
