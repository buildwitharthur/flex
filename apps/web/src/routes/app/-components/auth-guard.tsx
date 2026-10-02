import { getProfile } from '#/http/get-profile'
import { useQuery } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'
import { AppSkeleton } from './app-skeleton'
import { Navigate } from '@tanstack/react-router'

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const { data, error, isPending } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    })

    if (isPending) {
        return <AppSkeleton />
    }

    if (!data?.user || error) {
        return <Navigate replace to="/login" />
    }

    return children
}
