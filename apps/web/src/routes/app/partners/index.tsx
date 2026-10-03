import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { PartnersList } from './-components/partners-list'
import { PartnersSearch } from './-components/partners-search'

export const Route = createFileRoute('/app/partners/')({
    component: PartnersPage,
})

function PartnersPage() {
    return (
        <div className="space-y-6">
            <h1 className="t-page">Parceiros</h1>

            <PartnersSearch />

            <Suspense fallback={<div>Carregando parceiros...</div>}>
                <PartnersList />
            </Suspense>
        </div>
    )
}
