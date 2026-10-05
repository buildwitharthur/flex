import { ArrowRight } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { PipelineCard } from './pipeline-card'

type PipelineColumnProps = {
    stage: ContactStage
    title: string
    contacts: Contact[]
    total: number
}

const stageDot: Partial<Record<ContactStage, string>> = {
    NEW: 'bg-accent',
    CONTACTED: 'bg-info',
    NEGOTIATION: 'bg-warning',
}

function pluralizeContacts(count: number) {
    return `${count} ${count === 1 ? 'contato' : 'contatos'}`
}

export function PipelineColumn({
    stage,
    title,
    contacts,
    total,
}: PipelineColumnProps) {
    const hasMore = total > contacts.length

    return (
        <section
            aria-labelledby={`pipeline-${stage}`}
            className="flex min-w-[84vw] flex-[1_1_296px] flex-col rounded-lg border border-border bg-surface-muted sm:min-w-74"
        >
            <header className="flex h-11 flex-none items-center gap-2 px-3">
                <span
                    aria-hidden="true"
                    className={`size-1.5 shrink-0 rounded-full ${stageDot[stage] ?? 'bg-border-strong'}`}
                />
                <h2
                    id={`pipeline-${stage}`}
                    className="text-[13px] font-semibold"
                >
                    {title}
                </h2>
                <Badge
                    variant="outline"
                    size="counter"
                    dot={false}
                    aria-label={pluralizeContacts(total)}
                    className="ml-auto tabular-nums"
                >
                    {total}
                </Badge>
            </header>

            <div
                role="list"
                aria-labelledby={`pipeline-${stage}`}
                className="flex flex-col gap-1.5 px-2 pb-2"
            >
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <div key={contact.id} role="listitem">
                            <PipelineCard contact={contact} />
                        </div>
                    ))
                ) : (
                    <div className="rounded-md border border-dashed border-border-strong px-3 py-5 text-center text-[13px] text-muted-foreground">
                        Nenhum contato nesta etapa
                    </div>
                )}
            </div>

            {total > 0 ? (
                <footer className="mt-auto flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-[13px] text-muted-foreground">
                    {hasMore ? (
                        <>
                            <span className="tabular-nums">
                                {contacts.length} de {total}
                            </span>
                            <Button variant="link">
                                Ver todos
                                <ArrowRight
                                    aria-hidden="true"
                                    className="ml-1 size-3.5"
                                />
                            </Button>
                        </>
                    ) : (
                        <span className="tabular-nums">
                            {pluralizeContacts(total)}
                        </span>
                    )}
                </footer>
            ) : null}
        </section>
    )
}
