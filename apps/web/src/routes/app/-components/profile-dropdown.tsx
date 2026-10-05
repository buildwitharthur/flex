import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ChevronsUpDown, KeyRound, LogOut } from 'lucide-react'
import { toast } from 'sonner'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Avatar } from '../../../components/ui/avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '../../../components/ui/tooltip'
import { useSession } from '../../../hooks/use-session'
import { type UserRole } from '../../../http/get-profile'
import { logout } from '../../../http/logout'
import { cn } from '../../../lib/cn'

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

type ProfileDropdownProps = {
    collapsed: boolean
}

export function ProfileDropdown({ collapsed }: ProfileDropdownProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const user = useSession()

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            // Navega antes de remover o profile para que AuthGuard e este
            // componente já estejam desmontados e não refaçam GET /profile.
            await navigate({ to: '/login', replace: true })
            queryClient.removeQueries({ queryKey: ['profile'], exact: true })
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    if (!user) {
        return null
    }

    const { username, role } = user

    return (
        <DropdownMenu>
            <Tooltip>
                <DropdownMenuTrigger asChild>
                    <TooltipTrigger asChild>
                        <button
                            aria-label="Abrir menu do usuário"
                            className={cn(
                                'flex h-11 w-full items-center gap-2 rounded-md border-0 bg-transparent px-2 text-left outline-none transition-colors duration-fast hover:bg-sidebar-hover data-[state=open]:bg-sidebar-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus',
                                collapsed && 'size-8 justify-center px-0',
                            )}
                            type="button"
                        >
                            <Avatar variant="user">{getInitials(username)}</Avatar>

                            {!collapsed ? (
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate font-body text-[13px] leading-4 font-semibold text-sidebar-foreground">
                                        {username}
                                    </span>
                                    <span className="block truncate font-body text-xs leading-4 text-sidebar-muted">
                                        {roleLabels[role]}
                                    </span>
                                </span>
                            ) : null}

                            {!collapsed ? (
                                <ChevronsUpDown
                                    aria-hidden="true"
                                    className="size-4 shrink-0 text-sidebar-muted"
                                    strokeWidth={1.8}
                                />
                            ) : null}
                        </button>
                    </TooltipTrigger>
                </DropdownMenuTrigger>
                {collapsed ? (
                    <TooltipContent side="right">{username}</TooltipContent>
                ) : null}
            </Tooltip>

            <DropdownMenuContent
                align="start"
                className={cn(
                    'min-w-0',
                    collapsed
                        ? 'w-[216px]'
                        : 'w-[var(--radix-dropdown-menu-trigger-width)]',
                )}
                side="top"
                sideOffset={6}
            >
                <DropdownMenuItem disabled>
                    <KeyRound aria-hidden="true" />
                    Alterar senha
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    disabled={logoutMutation.isPending}
                    onSelect={(event) => {
                        event.preventDefault()
                        logoutMutation.mutate()
                    }}
                >
                    <LogOut aria-hidden="true" />
                    {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
