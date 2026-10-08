import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { PageHeader } from '#/components/page-header'
import { CreatePartner } from './-components/create-partner'

export const Route = createFileRoute('/app/partners/new/')({
    component: NewPartnerPage,
})

function NewPartnerPage() {
    return (
        <div className="space-y-6">
            <Link
                to="/app/partners"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Voltar para parceiros
            </Link>

            <PageHeader
                title="Novo parceiro"
                description="Cadastre as informações que serão utilizadas no catálogo do Clube Flex."
            />

            <CreatePartner />
        </div>
    )
}
