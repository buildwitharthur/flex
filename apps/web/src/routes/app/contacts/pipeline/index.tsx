import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react'

import { PageHeader } from '#/components/page-header'
import { Skeleton } from '#/components/ui/skeleton'
import { ContactsViewNavigation } from '../-components/contacts-view-navigation'
import { ContactsPipeline } from './-components/contacts-pipeline'

export const Route = createFileRoute('/app/contacts/pipeline/')({
    component: ContactsPipelinePage,
})

function ContactsPipelinePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Pipeline"
                description="Acompanhe os contatos em andamento."
            ></PageHeader>

            <ContactsViewNavigation />

            <Suspense
                fallback={
                    <div className="grid gap-4 md:grid-cols-3">
                        <Skeleton className="h-96" />
                        <Skeleton className="h-96" />
                        <Skeleton className="h-96" />
                    </div>
                }
            >
                <ContactsPipeline />
            </Suspense>
        </div>
    )
}
