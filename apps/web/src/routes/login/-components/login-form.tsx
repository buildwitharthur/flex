import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from 'sonner'

import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { FieldError, Label } from '../../../components/ui/label'
import { login } from '../../../http/login'
import { useNavigate } from '@tanstack/react-router'

const loginSchema = z.object({
    username: z.string().trim().min(1, 'Informe seu usuário.'),
    password: z.string().min(1, 'Informe sua senha.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const mutation = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Login realizado com sucesso!')
            navigate({ to: '/app/partners' })
        },
    })

    const onSubmit = (values: LoginFormValues) => {
        mutation.mutate(values)
    }

    return (
        <div className="grid gap-7">
            <header className="grid gap-1.5">
                <span
                    aria-hidden="true"
                    className="mb-2.5 h-0.75 w-8 rounded-full bg-primary"
                />
                <h1 className="t-page">Flex Admin</h1>
                <p className="t-body muted">Acesse sua conta para continuar.</p>
            </header>

            <form
                className="grid gap-4"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid gap-1.5">
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <>
                                <Label
                                    className="font-medium"
                                    htmlFor="login-username"
                                >
                                    Usuário
                                </Label>
                                <Input
                                    {...field}
                                    id="login-username"
                                    size="lg"
                                    type="text"
                                    autoComplete="username"
                                    autoFocus
                                    placeholder="Digite seu usuário"
                                    aria-describedby={
                                        errors.username
                                            ? 'login-username-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        errors.username ? 'true' : undefined
                                    }
                                />
                                {errors.username?.message ? (
                                    <span id="login-username-error">
                                        <FieldError>
                                            {errors.username.message}
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
                        name="password"
                        render={({ field }) => (
                            <>
                                <Label
                                    className="font-medium"
                                    htmlFor="login-password"
                                >
                                    Senha
                                </Label>
                                <Input
                                    {...field}
                                    id="login-password"
                                    size="lg"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Digite sua senha"
                                    aria-describedby={
                                        errors.password
                                            ? 'login-password-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        errors.password ? 'true' : undefined
                                    }
                                />
                                {errors.password?.message ? (
                                    <span id="login-password-error">
                                        <FieldError>
                                            {errors.password.message}
                                        </FieldError>
                                    </span>
                                ) : null}
                            </>
                        )}
                    />
                </div>

                <Button
                    className="mt-1 w-full text-sm font-semibold"
                    loading={mutation.isPending}
                    size="lg"
                    type="submit"
                >
                    {mutation.isPending ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
        </div>
    )
}
