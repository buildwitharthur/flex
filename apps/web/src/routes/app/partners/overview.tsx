import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/partners/overview')({
    component: PartnersOverviewPage,
})

function PartnersOverviewPage() {
    return <h1 className="t-page">Visão geral</h1>
}
