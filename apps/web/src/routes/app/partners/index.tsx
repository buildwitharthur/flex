import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/partners/')({
    component: PartnersPage,
})

function PartnersPage() {
    return <h1 className="t-page">Parceiros</h1>
}
