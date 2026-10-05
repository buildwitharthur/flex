import { useListContacts } from '#/hooks/use-list-contacts'

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
        stage: 'NEW',
        title: 'Novo',
        contacts: visibleNewContacts,
        total: newTotal,
    }

    const contactedColumn = {
        stage: 'CONTACTED',
        title: 'Em contato',
        contacts: visibleContactedContacts,
        total: contactedTotal,
    }

    const negotiationColumn = {
        stage: 'NEGOTIATION',
        title: 'Negociação',
        contacts: visibleNegotiationContacts,
        total: negotiationTotal,
    }

    const columns = [newColumn, contactedColumn, negotiationColumn]

    // Render temporário para validar os dados; removido na Etapa 2.
    return (
        <div className="grid gap-4">
            {columns.map((column) => (
                <div key={column.stage}>
                    <p className="font-medium">{column.title}</p>
                    <p>{column.total} contatos</p>
                    <p>{column.contacts.length} visíveis</p>
                </div>
            ))}
        </div>
    )
}
