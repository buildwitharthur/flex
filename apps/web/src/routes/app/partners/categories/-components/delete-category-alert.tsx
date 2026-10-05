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
import { deleteCategory } from '#/http/delete-category'

type DeleteCategoryAlertProps = {
    categoryId: string
    categoryName: string
    children: ReactNode
}

export function DeleteCategoryAlert({
    categoryId,
    categoryName,
    children,
}: DeleteCategoryAlertProps) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const mutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (_response, deletedCategoryId) => {
            queryClient.setQueryData<{ categories: Category[] }>(
                ['categories'],
                (current) =>
                    current && {
                        ...current,
                        categories: current.categories.filter(
                            (category) => category.id !== deletedCategoryId,
                        ),
                    },
            )
            setOpen(false)
            toast.success('Categoria excluída')
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
                    <AlertDialogTitle>Excluir categoria</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir a categoria “{categoryName}”? Esta ação não pode ser desfeita.
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
                            mutation.mutate(categoryId)
                        }}
                    >
                        {mutation.isPending ? 'Excluindo...' : 'Excluir categoria'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
