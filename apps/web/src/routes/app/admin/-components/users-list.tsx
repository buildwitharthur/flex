import { useSuspenseQuery } from '@tanstack/react-query'

import { getUsers } from '#/http/get-users'
import { UsersData } from './users-data'

export function UsersList() {
    const { data } = useSuspenseQuery({
        queryKey: ['users'],
        queryFn: ({ signal }) => getUsers(signal),
    })

    return <UsersData users={data.users} />
}
