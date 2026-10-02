export function AppSidebar() {
    return (
        <aside className="sticky top-0 z-[30] flex h-dvh w-[var(--sidebar-width)] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
            <div
                aria-hidden="true"
                className="flex h-[var(--header-height)] min-h-[var(--header-height)] items-center border-b border-sidebar-border px-4"
            />

            <div
                aria-hidden="true"
                className="min-h-0 flex-1 overflow-y-auto px-4 py-4"
            />
        </aside>
    )
}
