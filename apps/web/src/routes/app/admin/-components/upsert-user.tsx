import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { FieldError, FieldHelper, Label } from '#/components/ui/label'
import { Select } from '#/components/ui/select'
import { createUser } from '#/http/create-user'
import { updateUser } from '#/http/update-user'

const roleLabels: Record<UserRole, string> = {
    ADMIN: 'Administrador',
    STAFF: 'Equipe',
}

const roles = Object.keys(roleLabels) as UserRole[]

const requiredText = (message: string) =>
    z.string().refine((value) => value.trim().length > 0, { message })

const upsertUserSchema = z
    .object({
        name: requiredText('Informe o nome do usuário'),
        username: requiredText('Informe o nome de usuário'),
        email: z
            .string()
            .refine(
                (value) =>
                    value.trim().length === 0 ||
                    z.string().email().safeParse(value.trim()).success,
                { message: 'Informe um e-mail válido' },
            ),
        role: z.enum(['ADMIN', 'STAFF']),
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    })

type UpsertUserForm = z.infer<typeof upsertUserSchema>

type UpsertUserProps = {
    user?: User
    children: ReactNode
}

function getDefaultValues(user?: User): UpsertUserForm {
    return {
        name: user?.name ?? '',
        username: user?.username ?? '',
        email: user?.email ?? '',
        role: user?.role ?? 'STAFF',
        password: '',
        confirmPassword: '',
    }
}

export function UpsertUser({ user, children }: UpsertUserProps) {
    const isEditing = Boolean(user)
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<UpsertUserForm>({
        resolver: zodResolver(upsertUserSchema),
        defaultValues: getDefaultValues(user),
    })

    useEffect(() => {
        reset(getDefaultValues(user))
    }, [user, reset])

    const mutation = useMutation({
        mutationFn: (data: UpsertUserForm) => {
            const name = data.name.trim()
            const username = data.username.trim()
            const email = data.email.trim()

            if (isEditing && user) {
                return updateUser({
                    id: user.id,
                    name,
                    username,
                    email: email || null,
                    role: data.role,
                    ...(data.password ? { password: data.password } : {}),
                })
            }

            return createUser({
                name,
                username,
                password: data.password,
                role: data.role,
                ...(email ? { email } : {}),
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            setOpen(false)
            reset(getDefaultValues(isEditing ? user : undefined))
            toast.success(
                isEditing
                    ? 'Usuário atualizado com sucesso'
                    : 'Usuário criado com sucesso',
            )
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen)

        if (!nextOpen) {
            mutation.reset()
            reset(getDefaultValues(user))
        }
    }

    function onSubmit(data: UpsertUserForm) {
        if (mutation.isPending) return

        if (!isEditing && data.password.length === 0) {
            setError('password', { message: 'Informe a senha' })
            return
        }

        mutation.mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? 'Editar usuário' : 'Novo usuário'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? 'Atualize os dados e permissões deste usuário.'
                                : 'Cadastre um novo usuário no sistema.'}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogBody>
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <>
                                            <Label htmlFor="user-name" required>
                                                Nome
                                            </Label>
                                            <Input
                                                {...field}
                                                id="user-name"
                                                placeholder="Digite o nome"
                                                aria-describedby={
                                                    errors.name
                                                        ? 'user-name-error'
                                                        : undefined
                                                }
                                                aria-invalid={
                                                    errors.name
                                                        ? 'true'
                                                        : undefined
                                                }
                                            />
                                            {errors.name?.message ? (
                                                <span id="user-name-error">
                                                    <FieldError>
                                                        {errors.name.message}
                                                    </FieldError>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Controller
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <>
                                            <Label
                                                htmlFor="user-username"
                                                required
                                            >
                                                Usuário
                                            </Label>
                                            <Input
                                                {...field}
                                                id="user-username"
                                                autoComplete="off"
                                                placeholder="Digite o nome de usuário"
                                                aria-describedby={
                                                    errors.username
                                                        ? 'user-username-error'
                                                        : undefined
                                                }
                                                aria-invalid={
                                                    errors.username
                                                        ? 'true'
                                                        : undefined
                                                }
                                            />
                                            {errors.username?.message ? (
                                                <span id="user-username-error">
                                                    <FieldError>
                                                        {
                                                            errors.username
                                                                .message
                                                        }
                                                    </FieldError>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <>
                                            <Label
                                                htmlFor="user-email"
                                                optional
                                            >
                                                E-mail
                                            </Label>
                                            <Input
                                                {...field}
                                                id="user-email"
                                                type="email"
                                                autoComplete="off"
                                                placeholder="Digite o e-mail"
                                                aria-describedby={
                                                    errors.email
                                                        ? 'user-email-error'
                                                        : undefined
                                                }
                                                aria-invalid={
                                                    errors.email
                                                        ? 'true'
                                                        : undefined
                                                }
                                            />
                                            {errors.email?.message ? (
                                                <span id="user-email-error">
                                                    <FieldError>
                                                        {errors.email.message}
                                                    </FieldError>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <>
                                            <Label htmlFor="user-role" required>
                                                Permissão
                                            </Label>
                                            <Select
                                                id="user-role"
                                                name={field.name}
                                                ref={field.ref}
                                                value={field.value}
                                                onBlur={field.onBlur}
                                                onChange={(event) =>
                                                    field.onChange(
                                                        event.target
                                                            .value as UserRole,
                                                    )
                                                }
                                            >
                                                {roles.map((role) => (
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {roleLabels[role]}
                                                    </option>
                                                ))}
                                            </Select>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <>
                                            {isEditing ? (
                                                <Label
                                                    htmlFor="user-password"
                                                    optional
                                                >
                                                    Nova senha
                                                </Label>
                                            ) : (
                                                <Label
                                                    htmlFor="user-password"
                                                    required
                                                >
                                                    Senha
                                                </Label>
                                            )}
                                            <Input
                                                {...field}
                                                id="user-password"
                                                type="password"
                                                autoComplete="new-password"
                                                placeholder={
                                                    isEditing
                                                        ? 'Digite a nova senha'
                                                        : 'Digite a senha'
                                                }
                                                aria-describedby={
                                                    errors.password
                                                        ? 'user-password-error'
                                                        : isEditing
                                                          ? 'user-password-help'
                                                          : undefined
                                                }
                                                aria-invalid={
                                                    errors.password
                                                        ? 'true'
                                                        : undefined
                                                }
                                            />
                                            {errors.password?.message ? (
                                                <span id="user-password-error">
                                                    <FieldError>
                                                        {
                                                            errors.password
                                                                .message
                                                        }
                                                    </FieldError>
                                                </span>
                                            ) : isEditing ? (
                                                <span id="user-password-help">
                                                    <FieldHelper>
                                                        Deixe em branco para
                                                        manter a senha atual.
                                                    </FieldHelper>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <>
                                            {isEditing ? (
                                                <Label
                                                    htmlFor="user-confirm-password"
                                                    optional
                                                >
                                                    Confirmar nova senha
                                                </Label>
                                            ) : (
                                                <Label
                                                    htmlFor="user-confirm-password"
                                                    required
                                                >
                                                    Confirmar senha
                                                </Label>
                                            )}
                                            <Input
                                                {...field}
                                                id="user-confirm-password"
                                                type="password"
                                                autoComplete="new-password"
                                                placeholder="Repita a senha"
                                                aria-describedby={
                                                    errors.confirmPassword
                                                        ? 'user-confirm-password-error'
                                                        : undefined
                                                }
                                                aria-invalid={
                                                    errors.confirmPassword
                                                        ? 'true'
                                                        : undefined
                                                }
                                            />
                                            {errors.confirmPassword?.message ? (
                                                <span id="user-confirm-password-error">
                                                    <FieldError>
                                                        {
                                                            errors
                                                                .confirmPassword
                                                                .message
                                                        }
                                                    </FieldError>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                />
                            </div>
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
                        <Button type="submit" loading={mutation.isPending}>
                            {mutation.isPending
                                ? isEditing
                                    ? 'Salvando...'
                                    : 'Criando...'
                                : isEditing
                                  ? 'Salvar alterações'
                                  : 'Criar usuário'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
