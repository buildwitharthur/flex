import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
    CircleCheck,
    CircleOff,
    Ellipsis,
    Pencil,
    Star,
    StarOff,
    Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

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
    const navigate = useNavigate()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const updateMutation = useMutation({
        mutationFn: updatePartner,
        onSuccess: ({ partner: updatedPartner }) => {
            queryClient.setQueryData(['partner', updatedPartner.id], {
                partner: updatedPartner,
            })
            queryClient.setQueryData<{ partners: Partner[] }>(
                ['partners'],
                (current) =>
                    current && {
                        ...current,
                        partners: current.partners.map((currentPartner) =>
                            currentPartner.id === updatedPartner.id
                                ? updatedPartner
                                : currentPartner,
                        ),
                    },
            )
            toast.success('Parceiro atualizado')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return (
        <>
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
                    onSelect={() =>
                        void navigate({
                            to: '/app/partners/$partnerId/edit',
                            params: { partnerId: partner.id },
                        })
                    }
                >
                    <Pencil aria-hidden="true" />
                    Editar
                </DropdownMenuItem>

                <DropdownMenuSeparator />

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

                <DropdownMenuItem
                    destructive
                    onSelect={() => setDeleteOpen(true)}
                >
                    <Trash2 aria-hidden="true" />
                    Excluir parceiro
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DeletePartnerAlert
            partnerId={partner.id}
            partnerName={partner.name}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
        />
        </>
    )
}
