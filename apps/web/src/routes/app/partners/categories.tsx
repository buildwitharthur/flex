import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/partners/categories')({
    component: PartnersCategoriesPage,
})

function PartnersCategoriesPage() {
    return <h1 className="t-page">Categorias</h1>
}
