import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { PageHeader } from '#/components/page-header'

import { ContactsPipeline } from './-components/contacts-pipeline'
import { ContactsPipelineSkeleton } from './-components/contacts-pipeline-skeleton'

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

            <Suspense fallback={<ContactsPipelineSkeleton />}>
                <ContactsPipeline />
            </Suspense>
        </div>
    )
}
