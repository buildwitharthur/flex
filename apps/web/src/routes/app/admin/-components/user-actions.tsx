import { Ellipsis, Pencil, Trash2 } from 'lucide-react'

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
    return (
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
                <UpsertUser user={user}>
                    <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                    >
                        <Pencil aria-hidden="true" />
                        Editar usuário
                    </DropdownMenuItem>
                </UpsertUser>

                <DropdownMenuSeparator />

                <DeleteUserAlert userId={user.id} userName={user.name}>
                    <DropdownMenuItem
                        destructive
                        onSelect={(event) => event.preventDefault()}
                    >
                        <Trash2 aria-hidden="true" />
                        Excluir usuário
                    </DropdownMenuItem>
                </DeleteUserAlert>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
