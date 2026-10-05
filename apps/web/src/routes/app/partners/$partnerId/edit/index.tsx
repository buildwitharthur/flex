import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

import { PageHeader } from '#/components/page-header'
import { Skeleton } from '#/components/ui/skeleton'
import { EditPartner } from './-components/edit-partner'

export const Route = createFileRoute('/app/partners/$partnerId/edit/')({
    component: EditPartnerPage,
})

function EditPartnerFallback() {
    return (
        <div className="grid max-w-[960px] gap-5">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-control-md w-full rounded-md" />
            <div className="grid gap-5 sm:grid-cols-2">
                <Skeleton className="h-control-md w-full rounded-md" />
                <Skeleton className="h-control-md w-full rounded-md" />
            </div>
            <Skeleton className="h-control-md w-full rounded-md" />
            <Skeleton className="h-[136px] w-full rounded-md" />
        </div>
    )
}

function EditPartnerPage() {
    const { partnerId } = Route.useParams()

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
                title="Editar parceiro"
                description="Atualize as informações do parceiro."
            />

            <Suspense fallback={<EditPartnerFallback />}>
                <EditPartner partnerId={partnerId} />
            </Suspense>
        </div>
    )
}
