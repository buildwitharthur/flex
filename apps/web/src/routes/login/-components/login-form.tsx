import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../components/ui/alert'
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
    })

    const onSubmit = (values: LoginFormValues) => {
        if (mutation.isError) {
            mutation.reset()
        }

        mutation.mutate(values)
        navigate({ to: '/app', replace: true })
    }

    const errorMessage = mutation.error?.message

    return (
        <div className="grid gap-8">
            <header className="grid gap-2">
                <h1 className="t-page">Acesse sua conta</h1>
                <p className="t-body muted">
                    Entre com suas credenciais para acessar o Flex Admin.
                </p>
            </header>

            <form
                className="grid gap-5"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                {errorMessage ? (
                    <Alert variant="danger">
                        <AlertTitle>Não foi possível entrar</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                ) : null}

                <div className="grid gap-1.5">
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <>
                                <Label htmlFor="login-username">Usuário</Label>
                                <Input
                                    {...field}
                                    id="login-username"
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
                                    onChange={(event) => {
                                        if (mutation.isError) {
                                            mutation.reset()
                                        }
                                        field.onChange(event)
                                    }}
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
                                <Label htmlFor="login-password">Senha</Label>
                                <Input
                                    {...field}
                                    id="login-password"
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
                                    onChange={(event) => {
                                        if (mutation.isError) {
                                            mutation.reset()
                                        }
                                        field.onChange(event)
                                    }}
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
                    className="w-full"
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
