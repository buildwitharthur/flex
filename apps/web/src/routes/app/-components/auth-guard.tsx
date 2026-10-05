import { useSession } from '#/hooks/use-session'
import { type PropsWithChildren } from 'react'
import { AppSkeleton } from './app-skeleton'
import { Navigate } from '@tanstack/react-router'

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const user = useSession()

    if (user === undefined) {
        return <AppSkeleton />
    }

    if (!user) {
        return <Navigate replace to="/login" />
    }

    return children
}
