import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'

export const Route = createFileRoute('/app/partners/categories/')({
    component: PartnersCategoriesPage,
})

function PartnersCategoriesPage() {
    return <PageHeader title="Categorias" />
}
