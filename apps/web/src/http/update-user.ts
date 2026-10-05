import { axiosClient } from '../lib/axios-client'

type UpdateUserRequest = {
    id: string
    name?: string
    username?: string
    email?: string | null
    password?: string
    role?: UserRole
    isActive?: boolean
}

type UpdateUserResponse = {
    user: User
}

export async function updateUser(
    input: UpdateUserRequest,
): Promise<UpdateUserResponse> {
    const { id, ...data } = input
    const response = await axiosClient.patch<UpdateUserResponse>(
        `/admin/users/${id}`,
        data,
    )

    return response.data
}
