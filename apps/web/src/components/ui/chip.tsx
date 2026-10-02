import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/cn'

type ChipProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  label: React.ReactNode
  value: React.ReactNode
  onRemove?: () => void
  removeLabel?: string
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  function Chip({ className, label, value, onRemove, removeLabel = 'Remover filtro', ...props }, ref) {
    return <span ref={ref} className={cn('inline-flex h-6 items-center gap-1 rounded-full border border-border bg-surface py-0 pr-1 pl-2 text-[13px] leading-5', className)} {...props}><span className="text-muted-foreground">{label}</span><span className="font-semibold text-foreground">{value}</span>{onRemove ? <button type="button" aria-label={removeLabel} onClick={onRemove} className="grid size-5 place-items-center rounded-full text-muted-foreground outline-none hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus"><X aria-hidden="true" className="size-3" /></button> : null}</span>
  },
)
