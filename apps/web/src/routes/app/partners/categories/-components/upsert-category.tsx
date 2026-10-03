import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { FieldError, Label } from '#/components/ui/label'
import { createCategory } from '#/http/create-category'
import { updateCategory } from '#/http/update-category'

const upsertCategorySchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, {
        message: 'Informe o nome da categoria',
    }),
})

type UpsertCategoryForm = z.infer<typeof upsertCategorySchema>

type UpsertCategoryProps = {
    category?: Category
    children: ReactNode
}

export function UpsertCategory({
    category,
    children,
}: UpsertCategoryProps) {
    const isEditing = Boolean(category)
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpsertCategoryForm>({
        resolver: zodResolver(upsertCategorySchema),
        defaultValues: {
            name: category?.name ?? '',
        },
    })

    useEffect(() => {
        reset({
            name: category?.name ?? '',
        })
    }, [category, reset])

    const mutation = useMutation({
        mutationFn: (data: UpsertCategoryForm) => {
            if (isEditing && category) {
                return updateCategory({
                    id: category.id,
                    name: data.name,
                })
            }

            return createCategory({
                name: data.name,
            })
        },
        onSuccess: async (_response, data) => {
            await queryClient.invalidateQueries({ queryKey: ['categories'] })
            setOpen(false)
            reset({
                name: isEditing ? data.name : '',
            })
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen)

        if (!nextOpen) {
            mutation.reset()
            reset({
                name: category?.name ?? '',
            })
        }
    }

    function onSubmit(data: UpsertCategoryForm) {
        mutation.mutate(data)
    }

    const errorMessage = mutation.error?.message

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? 'Editar categoria' : 'Nova categoria'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? 'Altere os dados da categoria selecionada.'
                                : 'Cadastre uma nova categoria para os parceiros.'}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogBody>
                        {errorMessage ? (
                            <Alert variant="danger">
                                <AlertTitle>
                                    Não foi possível salvar a categoria
                                </AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        ) : null}

                        <div className="grid gap-1.5">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <>
                                        <Label htmlFor="category-name" required>
                                            Nome
                                        </Label>
                                        <Input
                                            {...field}
                                            id="category-name"
                                            placeholder="Digite o nome da categoria"
                                            aria-describedby={
                                                errors.name
                                                    ? 'category-name-error'
                                                    : undefined
                                            }
                                            aria-invalid={
                                                errors.name ? 'true' : undefined
                                            }
                                            onChange={(event) => {
                                                if (mutation.isError) {
                                                    mutation.reset()
                                                }
                                                field.onChange(event)
                                            }}
                                        />
                                        {errors.name?.message ? (
                                            <span id="category-name-error">
                                                <FieldError>
                                                    {errors.name.message}
                                                </FieldError>
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            />
                        </div>
                    </DialogBody>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={mutation.isPending}
                        >
                            {mutation.isPending
                                ? isEditing
                                    ? 'Salvando...'
                                    : 'Criando...'
                                : isEditing
                                  ? 'Salvar alterações'
                                  : 'Criar categoria'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
