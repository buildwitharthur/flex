import { createFileRoute } from '@tanstack/react-router'

import { PartnersSearch } from './-components/partners-search'

export const Route = createFileRoute('/app/partners/')({
    component: PartnersPage,
})

function PartnersPage() {
    return (
        <div className="space-y-6">
            <h1 className="t-page">Parceiros</h1>

            <PartnersSearch />
        </div>
    )
}
