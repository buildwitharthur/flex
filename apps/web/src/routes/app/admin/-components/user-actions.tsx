import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { DeleteUserAlert } from './delete-user-alert'
import { UpsertUser } from './upsert-user'

type UserActionsProps = {
    user: User
}

export function UserActions({ user }: UserActionsProps) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 min-w-8 data-[state=open]:bg-surface-muted"
                    aria-label="Ações do usuário"
                >
                    <Ellipsis aria-hidden="true" className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                    <Pencil aria-hidden="true" />
                    Editar usuário
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    destructive
                    onSelect={() => setDeleteOpen(true)}
                >
                    <Trash2 aria-hidden="true" />
                    Excluir usuário
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <UpsertUser user={user} open={editOpen} onOpenChange={setEditOpen} />

        <DeleteUserAlert
            userId={user.id}
            userName={user.name}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
        />
        </>
    )
}
