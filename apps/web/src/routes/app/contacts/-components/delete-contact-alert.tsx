import { useMutation, useQueryClient } from '@tanstack/react-query'
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
} from '#/components/ui/alert-dialog'
import { deleteContact } from '#/http/delete-contact'

type DeleteContactAlertProps = {
    contactId: string
    contactName: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeleteContactAlert({
    contactId,
    contactName,
    open,
    onOpenChange,
}: DeleteContactAlertProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteContact,
        onSuccess: (_response, deletedContactId) => {
            queryClient.setQueryData<{ contacts: Contact[] }>(
                ['contacts'],
                (current) =>
                    current && {
                        ...current,
                        contacts: current.contacts.filter(
                            (contact) => contact.id !== deletedContactId,
                        ),
                    },
            )

            onOpenChange(false)
            toast.success('Contato excluído')
        },
        onError: (error) => {
            // contato pode já ter sido removido em outra sessão: ressincroniza
            void queryClient.invalidateQueries({ queryKey: ['contacts'] })
            toast.error(error.message)
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen && mutation.isPending) {
            return
        }

        onOpenChange(nextOpen)

        if (!nextOpen) {
            mutation.reset()
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent size="confirmation">
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir contato</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir {contactName}? Esta ação
                        não pode ser desfeita.
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
                            mutation.mutate(contactId)
                        }}
                    >
                        {mutation.isPending
                            ? 'Excluindo...'
                            : 'Excluir contato'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
