import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../http/get-profile'
import { AppSkeleton } from './-components/app-skeleton'

export const Route = createFileRoute('/app')({
    component: AppLayout,
})

function AppLayout() {
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

    return <Outlet />
}
