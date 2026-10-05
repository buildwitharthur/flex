import { axiosClient } from '../lib/axios-client'

type GetUsersResponse = {
    users: User[]
}

export async function getUsers(signal?: AbortSignal) {
    const response = await axiosClient.get<GetUsersResponse>('/admin/users', {
        signal,
    })

    return response.data
}
