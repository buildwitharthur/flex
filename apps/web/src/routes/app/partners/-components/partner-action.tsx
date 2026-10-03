import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    CircleCheck,
    CircleOff,
    Ellipsis,
    Eye,
    Pencil,
    Star,
    StarOff,
    Trash2,
} from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { updatePartner } from '#/http/update-partner'
import { DeletePartnerAlert } from './delete-partner-alert'

type PartnerActionProps = {
    partner: Partner
}

export function PartnerAction({ partner }: PartnerActionProps) {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: updatePartner,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['partners'] }),
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 min-w-8 data-[state=open]:bg-surface-muted"
                    aria-label="Ações do parceiro"
                >
                    <Ellipsis aria-hidden="true" className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    disabled={updateMutation.isPending}
                    onSelect={() =>
                        updateMutation.mutate({
                            id: partner.id,
                            isFeatured: !partner.isFeatured,
                        })
                    }
                >
                    {partner.isFeatured ? (
                        <StarOff aria-hidden="true" />
                    ) : (
                        <Star aria-hidden="true" />
                    )}
                    {partner.isFeatured
                        ? 'Remover dos destaques'
                        : 'Adicionar aos destaques'}
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={updateMutation.isPending}
                    onSelect={() =>
                        updateMutation.mutate({
                            id: partner.id,
                            isActive: !partner.isActive,
                        })
                    }
                >
                    {partner.isActive ? (
                        <CircleOff aria-hidden="true" />
                    ) : (
                        <CircleCheck aria-hidden="true" />
                    )}
                    {partner.isActive ? 'Desativar' : 'Ativar'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DeletePartnerAlert
                    partnerId={partner.id}
                    partnerName={partner.name}
                >
                    <DropdownMenuItem
                        destructive
                        onSelect={(event) => event.preventDefault()}
                    >
                        <Trash2 aria-hidden="true" />
                        Excluir parceiro
                    </DropdownMenuItem>
                </DeletePartnerAlert>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
