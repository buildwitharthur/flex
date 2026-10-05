import { axiosClient } from '../lib/axios-client'

type CreateUserRequest = {
    name: string
    username: string
    email?: string
    password: string
    role: UserRole
    isActive?: boolean
}

type CreateUserResponse = {
    user: User
}

export async function createUser(
    input: CreateUserRequest,
): Promise<CreateUserResponse> {
    const { name, username, email, password, role, isActive } = input
    const response = await axiosClient.post<CreateUserResponse>(
        '/admin/users',
        { name, username, email, password, role, isActive },
    )

    return response.data
}
