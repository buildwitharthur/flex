import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from './-components/login-form'

export const Route = createFileRoute('/login/')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <main className="min-h-screen bg-surface text-foreground">
            <div className="grid min-h-screen min-[641px]:grid-cols-[58%_42%]">
                <section className="relative hidden overflow-hidden bg-sidebar px-12 py-12 text-sidebar-foreground min-[641px]:flex min-[641px]:flex-col min-[641px]:justify-between">
                    <div
                        className="absolute inset-0 opacity-40"
                        aria-hidden="true"
                    >
                        <div className="absolute -top-24 -right-24 size-80 rounded-full border border-sidebar-border" />
                        <div className="absolute -bottom-32 -left-20 size-96 rounded-full border border-sidebar-border" />
                        <div className="absolute inset-x-12 top-1/2 h-px bg-sidebar-border" />
                    </div>

                    <div className="relative">
                        <img
                            className="h-auto w-36 object-contain"
                            src="/brand/flex-logo-branco.svg"
                            alt="Flex"
                        />
                    </div>

                    <p className="relative font-display text-xl font-semibold">
                        Flex Admin
                    </p>

                    <p className="relative text-xs text-sidebar-muted">
                        Acesso administrativo
                    </p>
                </section>

                <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
                    <div className="w-full max-w-[420px]">
                        <img
                            className="mx-auto mb-8 h-auto w-36 object-contain min-[641px]:hidden"
                            src="/brand/flex-logo-navy.svg"
                            alt="Flex"
                        />
                        <LoginForm />
                    </div>
                </section>
            </div>
        </main>
    )
}
