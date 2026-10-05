import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { PageHeader } from '#/components/page-header'
import { Skeleton } from '#/components/ui/skeleton'
import { ContactsList } from './-components/contacts-list'
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

            <ContactsSearch />

            <Suspense fallback={<Skeleton className="h-4 w-24" />}>
                <ContactsList />
            </Suspense>
        </div>
    )
}
