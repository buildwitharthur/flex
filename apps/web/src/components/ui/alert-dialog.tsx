import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'

import { cn } from '../../lib/cn'
import { Button } from './button'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal

export const AlertDialogOverlay = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(function AlertDialogOverlay({ className, ...props }, ref) {
    return (
        <AlertDialogPrimitive.Overlay
            ref={ref}
            className={cn(
                'fixed inset-0 z-40 bg-overlay data-[state=open]:animate-[overlay-in_180ms_ease-out]',
                className,
            )}
            {...props}
        />
    )
})

type AlertDialogContentProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Content
> & {
    size?: 'sm' | 'md' | 'confirmation'
}

export const AlertDialogContent = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Content>,
    AlertDialogContentProps
>(function AlertDialogContent(
    { className, children, size = 'md', ...props },
    ref,
) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                ref={ref}
                className={cn(
                    'fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100vh-48px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface shadow-lg data-[state=open]:animate-[dialog-in_180ms_ease-out]',
                    size === 'sm' && 'w-[min(420px,calc(100vw-32px))]',
                    size === 'md' && 'w-[min(520px,calc(100vw-32px))]',
                    size === 'confirmation' &&
                        'w-[min(440px,calc(100vw-32px))]',
                    className,
                )}
                {...props}
            >
                {children}
            </AlertDialogPrimitive.Content>
        </AlertDialogPortal>
    )
})

export const AlertDialogHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function AlertDialogHeader({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn('grid gap-0 px-6 pt-6', className)}
            {...props}
        />
    )
})

export const AlertDialogBody = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function AlertDialogBody({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn('flex flex-col gap-4 px-6 py-5', className)}
            {...props}
        />
    )
})

export const AlertDialogFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function AlertDialogFooter({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn(
                'flex justify-end gap-2 rounded-b-xl border-t border-border bg-surface-muted px-6 py-4',
                className,
            )}
            {...props}
        />
    )
})

export const AlertDialogTitle = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(function AlertDialogTitle({ className, ...props }, ref) {
    return (
        <AlertDialogPrimitive.Title
            ref={ref}
            className={cn(
                'font-display text-[18px] leading-[26px] font-semibold',
                className,
            )}
            {...props}
        />
    )
})

export const AlertDialogDescription = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(function AlertDialogDescription({ className, ...props }, ref) {
    return (
        <AlertDialogPrimitive.Description
            ref={ref}
            className={cn('mt-1 text-sm leading-5 text-muted-foreground', className)}
            {...props}
        />
    )
})

type AlertDialogButtonProps = React.ComponentPropsWithoutRef<typeof Button>

export const AlertDialogCancel = React.forwardRef<
    HTMLButtonElement,
    AlertDialogButtonProps
>(function AlertDialogCancel(
    { className, variant = 'secondary', ...props },
    ref,
) {
    return (
        <AlertDialogPrimitive.Cancel asChild>
            <Button ref={ref} variant={variant} className={className} {...props} />
        </AlertDialogPrimitive.Cancel>
    )
})

export const AlertDialogAction = React.forwardRef<
    HTMLButtonElement,
    AlertDialogButtonProps
>(function AlertDialogAction({ className, variant = 'primary', ...props }, ref) {
    return (
        <AlertDialogPrimitive.Action asChild>
            <Button ref={ref} variant={variant} className={className} {...props} />
        </AlertDialogPrimitive.Action>
    )
})
