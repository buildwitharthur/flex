import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'

export const Route = createFileRoute('/app/admin/')({
    component: AdminPage,
})

function AdminPage() {
    return (
        <PageHeader
            title="Administração"
            description="Gerencie os usuários e acessos do sistema."
        />
    )
}
