import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { Button } from '#/components/ui/button'
import { PageHeader } from '#/components/page-header'
import { CategoriesList } from './-components/categories-list'
import { UpsertCategory } from './-components/upsert-category'

export const Route = createFileRoute('/app/partners/categories/')({
    component: PartnersCategoriesPage,
})

function PartnersCategoriesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Categorias"
                description="Gerencie as categorias disponíveis para os parceiros."
            >
                <UpsertCategory>
                    <Button>Nova categoria</Button>
                </UpsertCategory>
            </PageHeader>

            <Suspense fallback={<div>Carregando categorias...</div>}>
                <CategoriesList />
            </Suspense>
        </div>
    )
}
