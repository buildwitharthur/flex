import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'
import { UpsertUser } from './-components/upsert-user'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/app/admin/')({
    component: AdminPage,
})

function AdminPage() {
    return (
        <PageHeader
            title="Administração"
            description="Gerencie os usuários e acessos do sistema."
            children={
                <UpsertUser>
                    <Button>Adicionar Usuário</Button>
                </UpsertUser>
            }
        />
    )
}
