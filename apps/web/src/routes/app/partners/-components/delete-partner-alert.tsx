import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '#/components/ui/alert-dialog'
import { deletePartner } from '#/http/delete-partner'

type DeletePartnerAlertProps = {
    partnerId: string
    partnerName: string
    children: ReactNode
}

export function DeletePartnerAlert({
    partnerId,
    partnerName,
    children,
}: DeletePartnerAlertProps) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const mutation = useMutation({
        mutationFn: deletePartner,
        onSuccess: (_response, deletedPartnerId) => {
            const deletedPartner = queryClient
                .getQueryData<{ partners: Partner[] }>(['partners'])
                ?.partners.find((partner) => partner.id === deletedPartnerId)

            queryClient.setQueryData<{ partners: Partner[] }>(
                ['partners'],
                (current) =>
                    current && {
                        ...current,
                        partners: current.partners.filter(
                            (partner) => partner.id !== deletedPartnerId,
                        ),
                    },
            )
            queryClient.removeQueries({
                queryKey: ['partner', deletedPartnerId],
                exact: true,
            })

            if (deletedPartner) {
                queryClient.setQueryData<{ categories: Category[] }>(
                    ['categories'],
                    (current) =>
                        current && {
                            ...current,
                            categories: current.categories.map((category) =>
                                category.id === deletedPartner.categoryId
                                    ? {
                                          ...category,
                                          partnersCount:
                                              category.partnersCount - 1,
                                      }
                                    : category,
                            ),
                        },
                )
            } else {
                // categoria do parceiro desconhecida: apenas marca como stale
                void queryClient.invalidateQueries({
                    queryKey: ['categories'],
                })
            }

            setOpen(false)
            toast.success('Parceiro excluído')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen && mutation.isPending) {
            return
        }

        setOpen(nextOpen)

        if (!nextOpen) {
            mutation.reset()
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent size="confirmation">
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir parceiro</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir o parceiro “{partnerName}”? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        type="button"
                        disabled={mutation.isPending}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        type="button"
                        variant="destructive"
                        disabled={mutation.isPending}
                        onClick={(event) => {
                            event.preventDefault()
                            mutation.mutate(partnerId)
                        }}
                    >
                        {mutation.isPending ? 'Excluindo...' : 'Excluir parceiro'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
