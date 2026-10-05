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
import { deleteUser } from '#/http/delete-user'

type DeleteUserAlertProps = {
    userId: string
    userName: string
    children: ReactNode
}

export function DeleteUserAlert({
    userId,
    userName,
    children,
}: DeleteUserAlertProps) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
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
            setOpen(false)
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
