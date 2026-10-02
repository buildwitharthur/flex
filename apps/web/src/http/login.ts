import { axiosClient } from '../lib/axios-client'

export type LoginRequest = {
    username: string
    password: string
}

export async function login(credentials: LoginRequest): Promise<void> {
    const response = await axiosClient.post<void>('/login', credentials)

    return response.data
}
