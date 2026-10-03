import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'

import { PageHeader } from '#/components/page-header'
import { Button } from '#/components/ui/button'
import { PartnersList } from './-components/partners-list'
import { PartnersSearch } from './-components/partners-search'

export const Route = createFileRoute('/app/partners/')({
    component: PartnersPage,
})

function PartnersPage() {
    const navigate = useNavigate()

    return (
        <div className="space-y-6">
            <PageHeader
                title="Parceiros"
                description="Gerencie os parceiros disponíveis no Flex Clube."
            >
                <Button
                    onClick={() => void navigate({ to: '/app/partners/new' })}
                >
                    <Plus aria-hidden="true" className="size-4" />
                    Novo parceiro
                </Button>
            </PageHeader>

            <PartnersSearch />

            <Suspense fallback={<div>Carregando parceiros...</div>}>
                <PartnersList />
            </Suspense>
        </div>
    )
}
