import { Skeleton } from '#/components/ui/skeleton'

const COLUMNS = [
    { dot: 'bg-accent', title: 'w-12', cards: 4 },
    { dot: 'bg-info', title: 'w-20', cards: 3 },
    { dot: 'bg-warning', title: 'w-20', cards: 2 },
]

function PipelineCardSkeleton() {
    return (
        <div className="rounded-md border border-border bg-surface px-3 pt-2 pb-2.5">
            <div className="flex h-5 items-center">
                <Skeleton className="h-3.5 w-32" />
            </div>
            <div className="flex h-4.5 items-center">
                <Skeleton className="h-3 w-24" />
            </div>
            <div className="mt-0.5 flex h-4 items-center justify-between gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}

export function ContactsPipelineSkeleton() {
    return (
        <div aria-hidden="true" className="flex flex-col gap-3">
            <div className="flex items-start gap-3 overflow-x-auto pb-2">
                {COLUMNS.map((column, columnIndex) => (
                    <section
                        key={columnIndex}
                        className="flex min-w-[84vw] flex-[1_1_296px] flex-col rounded-lg border border-border bg-surface-muted sm:min-w-74"
                    >
                        <header className="flex h-11 flex-none items-center gap-2 px-3">
                            <span
                                className={`size-1.5 shrink-0 rounded-full ${column.dot}`}
                            />
                            <Skeleton className={`h-3.5 ${column.title}`} />
                            <Skeleton className="ml-auto h-[18px] w-6 rounded-full" />
                        </header>

                        <div className="flex flex-col gap-1.5 px-2 pb-2">
                            {Array.from({ length: column.cards }, (_, index) => (
                                <PipelineCardSkeleton key={index} />
                            ))}
                        </div>

                        <footer className="mt-auto flex items-center justify-between gap-2 border-t border-border px-3 py-2">
                            <Skeleton className="h-3.5 w-16" />
                        </footer>
                    </section>
                ))}
            </div>
        </div>
    )
}
