import type { CSSProperties } from 'react'
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-right"
      closeButton
      style={
        {
          '--width': '380px',
          '--border-radius': 'var(--radius-lg)',
          '--normal-bg': 'var(--color-surface)',
          '--normal-border': 'var(--color-border)',
          '--normal-text': 'var(--color-foreground)',
          '--success-bg': 'var(--color-surface)',
          '--success-border': 'var(--color-border)',
          '--success-text': 'var(--color-success)',
          '--error-bg': 'var(--color-surface)',
          '--error-border': 'var(--color-border)',
          '--error-text': 'var(--color-danger)',
          '--info-bg': 'var(--color-surface)',
          '--info-border': 'var(--color-border)',
          '--info-text': 'var(--color-info)',
          '--warning-bg': 'var(--color-surface)',
          '--warning-border': 'var(--color-border)',
          '--warning-text': 'var(--color-warning)',
        } as CSSProperties
      }
      toastOptions={{
        style: {
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          boxShadow: 'var(--shadow-md)',
        },
      }}
      {...props}
    />
  )
}
