import { createFileRoute } from '@tanstack/react-router'

import { Card } from '../../components/ui/card'
import { LoginForm } from './-components/login-form'

export const Route = createFileRoute('/login/')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <main className="flex min-h-dvh items-center justify-center bg-background px-4 pt-8 pb-16 text-foreground">
            <Card className="w-full max-w-105 p-7 shadow-md sm:p-8">
                <LoginForm />
            </Card>
        </main>
    )
}
