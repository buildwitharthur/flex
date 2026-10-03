import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogBody,
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['partners'] })
            await queryClient.invalidateQueries({ queryKey: ['categories'] })
            setOpen(false)
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

                <AlertDialogBody>
                    {mutation.error ? (
                        <Alert variant="danger">
                            <AlertTitle>Não foi possível excluir o parceiro</AlertTitle>
                            <AlertDescription>
                                {mutation.error.message}
                            </AlertDescription>
                        </Alert>
                    ) : null}
                </AlertDialogBody>

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
