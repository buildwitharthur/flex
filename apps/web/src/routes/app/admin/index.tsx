import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'

import { PageHeader } from '#/components/page-header'
import { Button } from '#/components/ui/button'
import { UpsertUser } from './-components/upsert-user'
import { UsersList } from './-components/users-list'
import { UsersTableSkeleton } from './-components/users-table-skeleton'

export const Route = createFileRoute('/app/admin/')({
    component: AdminUsersPage,
})

function AdminUsersPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Usuários"
                description="Gerencie os usuários com acesso ao painel administrativo."
            >
                <UpsertUser>
                    <Button>
                        <Plus aria-hidden="true" className="size-4" />
                        Novo usuário
                    </Button>
                </UpsertUser>
            </PageHeader>

            <Suspense fallback={<UsersTableSkeleton />}>
                <UsersList />
            </Suspense>
        </div>
    )
}
