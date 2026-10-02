import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, KeyRound, LogOut } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Avatar } from '../../../components/ui/avatar'
import { getProfile, type UserRole } from '../../../http/get-profile'

const roleLabels: Record<UserRole, string> = {
    ADMIN: 'Administrador',
    STAFF: 'Colaborador',
}

function getInitials(username: string) {
    const parts = username.trim().split(/\s+/).filter(Boolean)

    if (parts.length > 1) {
        return parts
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase()
    }

    return username.slice(0, 2).toUpperCase()
}

export function ProfileDropdown() {
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    })

    if (!data?.user) {
        return null
    }

    const { username, role } = data.user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    aria-label="Abrir menu do usuário"
                    className="flex h-11 w-full items-center gap-2 rounded-md border-0 bg-transparent px-2 text-left outline-none transition-colors duration-fast hover:bg-sidebar-hover data-[state=open]:bg-sidebar-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus"
                    type="button"
                >
                    <Avatar variant="user">{getInitials(username)}</Avatar>

                    <span className="min-w-0 flex-1">
                        <span className="block truncate font-body text-[13px] leading-4 font-semibold text-sidebar-foreground">
                            {username}
                        </span>
                        <span className="block truncate font-body text-xs leading-4 text-sidebar-muted">
                            {roleLabels[role]}
                        </span>
                    </span>

                    <ChevronsUpDown
                        aria-hidden="true"
                        className="size-4 shrink-0 text-sidebar-muted"
                        strokeWidth={1.8}
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-0"
                side="top"
                sideOffset={6}
            >
                <DropdownMenuItem disabled>
                    <KeyRound aria-hidden="true" />
                    Alterar senha
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem disabled>
                    <LogOut aria-hidden="true" />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
