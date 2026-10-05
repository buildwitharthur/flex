import { useListContacts } from '#/hooks/use-list-contacts'
import { PipelineColumn } from './pipeline-column'

const PIPELINE_VISIBLE_LIMIT = 15

function byOldestFirst(a: Contact, b: Contact) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
}

export function ContactsPipeline() {
    const { data } = useListContacts()

    // filter() cria novos arrays, então o sort não muta o cache.
    const newContacts = data.contacts
        .filter((contact) => contact.stage === 'NEW')
        .sort(byOldestFirst)
    const contactedContacts = data.contacts
        .filter((contact) => contact.stage === 'CONTACTED')
        .sort(byOldestFirst)
    const negotiationContacts = data.contacts
        .filter((contact) => contact.stage === 'NEGOTIATION')
        .sort(byOldestFirst)

    const newTotal = newContacts.length
    const contactedTotal = contactedContacts.length
    const negotiationTotal = negotiationContacts.length

    const visibleNewContacts = newContacts.slice(0, PIPELINE_VISIBLE_LIMIT)
    const visibleContactedContacts = contactedContacts.slice(
        0,
        PIPELINE_VISIBLE_LIMIT,
    )
    const visibleNegotiationContacts = negotiationContacts.slice(
        0,
        PIPELINE_VISIBLE_LIMIT,
    )

    const newColumn = {
        stage: 'NEW' as const,
        title: 'Novo',
        contacts: visibleNewContacts,
        total: newTotal,
    }

    const contactedColumn = {
        stage: 'CONTACTED' as const,
        title: 'Em contato',
        contacts: visibleContactedContacts,
        total: contactedTotal,
    }

    const negotiationColumn = {
        stage: 'NEGOTIATION' as const,
        title: 'Negociação',
        contacts: visibleNegotiationContacts,
        total: negotiationTotal,
    }

    return (
        <div className="flex items-start gap-3 overflow-x-auto pb-2">
            <PipelineColumn
                stage={newColumn.stage}
                title={newColumn.title}
                contacts={newColumn.contacts}
                total={newColumn.total}
            />
            <PipelineColumn
                stage={contactedColumn.stage}
                title={contactedColumn.title}
                contacts={contactedColumn.contacts}
                total={contactedColumn.total}
            />
            <PipelineColumn
                stage={negotiationColumn.stage}
                title={negotiationColumn.title}
                contacts={negotiationColumn.contacts}
                total={negotiationColumn.total}
            />
        </div>
    )
}
