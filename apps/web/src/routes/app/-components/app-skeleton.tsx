import { Skeleton } from '../../../components/ui/skeleton'

export function AppSkeleton() {
  return (
    <div className="flex min-h-dvh bg-surface text-foreground">
      <aside className="hidden h-dvh w-[var(--sidebar-width)] shrink-0 flex-col justify-between bg-sidebar p-4 min-[1024px]:flex">
        <div className="grid gap-8">
          <Skeleton className="h-8 w-28 rounded-md bg-sidebar-hover" />

          <div className="grid gap-2">
            <Skeleton className="h-[var(--nav-item-height)] w-full rounded-md bg-sidebar-hover" />
            <Skeleton className="h-[var(--nav-item-height)] w-full rounded-md bg-sidebar-hover" />
            <Skeleton className="h-[var(--nav-item-height)] w-full rounded-md bg-sidebar-hover" />
            <Skeleton className="h-[var(--nav-item-height)] w-4/5 rounded-md bg-sidebar-hover" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-md bg-sidebar-hover" />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-[var(--header-height)] items-center justify-between border-b border-border bg-surface px-[var(--content-pad-x)]">
          <Skeleton className="h-5 w-5 rounded-md lg:hidden" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </header>

        <main className="mx-auto grid w-full max-w-[var(--content-max)] gap-8 px-[var(--content-pad-x)] py-8">
          <Skeleton className="h-4 w-36" />
          <div className="grid gap-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </main>
      </div>
    </div>
  )
}
