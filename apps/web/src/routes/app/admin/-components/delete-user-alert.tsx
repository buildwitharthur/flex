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
import { deleteUser } from '#/http/delete-user'

type DeleteUserAlertProps = {
    userId: string
    userName: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeleteUserAlert({
    userId,
    userName,
    open,
    onOpenChange,
}: DeleteUserAlertProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: (_response, deletedUserId) => {
            queryClient.setQueryData<{ users: User[] }>(
                ['users'],
                (current) =>
                    current && {
                        ...current,
                        users: current.users.filter(
                            (currentUser) => currentUser.id !== deletedUserId,
                        ),
                    },
            )
            onOpenChange(false)
            toast.success('Usuário excluído com sucesso')
        },
        onError: (error) => {
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
                    <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>
                    <AlertDialogDescription>
                        O usuário “{userName}” perderá permanentemente o acesso
                        ao painel.
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
                            mutation.mutate(userId)
                        }}
                    >
                        {mutation.isPending ? 'Excluindo...' : 'Excluir usuário'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
