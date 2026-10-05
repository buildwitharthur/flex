import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'
import { ContactsSearch } from './-components/contacts-search'

export const Route = createFileRoute('/app/contacts/')({
    component: ContactsPage,
})

function ContactsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Todos os contatos"
                description="Consulte e gerencie todos os contatos recebidos pelo Flex."
            />

            <div className="flex items-center gap-2">
                <ContactsSearch />
            </div>
        </div>
    )
}
