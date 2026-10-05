import * as React from 'react'

import { cn } from '../../lib/cn'

export const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function TableContainer({ className, ...props }, ref) {
    return <div ref={ref} className={cn('overflow-hidden rounded-lg border border-border bg-surface', className)} {...props} />
  },
)

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...props }, ref) {
    return <table ref={ref} className={cn('w-full border-separate border-spacing-0 font-body text-sm', className)} {...props} />
  },
)

export const TableScroll = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function TableScroll({ className, ...props }, ref) {
    return <div ref={ref} className={cn('overflow-x-auto', className)} {...props} />
  },
)

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  },
)

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn('[&_tr:last-child_td]:border-b-0', className)} {...props} />
  },
)

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & { density?: 'default' | 'compact' }

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ className, density = 'default', ...props }, ref) {
    return <tr ref={ref} className={cn('transition-colors duration-fast hover:bg-surface-hover aria-selected:bg-accent-subtle aria-selected:[&>td:first-child]:shadow-[inset_3px_0_0_var(--color-accent)]', density === 'compact' ? 'h-[var(--table-row-sm)]' : 'h-[var(--table-row-md)]', className)} {...props} />
  },
)

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, ...props }, ref) {
    return <th ref={ref} className={cn('sticky top-0 z-[1] h-10 whitespace-nowrap border-b border-border bg-surface-muted px-4 text-left text-[13px] leading-5 font-medium text-muted-foreground', className)} {...props} />
  },
)

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...props }, ref) {
    return <td ref={ref} className={cn('h-[var(--table-row-md)] whitespace-nowrap border-b border-border px-4 align-middle', className)} {...props} />
  },
)
