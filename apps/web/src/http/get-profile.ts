import { axiosClient } from '../lib/axios-client'

export type UserRole = 'ADMIN' | 'STAFF'

export type ProfileResponse = {
    user: {
        userId: string
        username: string
        role: UserRole
    }
}

type GetProfileOptions = {
    signal?: AbortSignal
}

export async function getProfile(
    options?: GetProfileOptions,
): Promise<ProfileResponse> {
    const response = await axiosClient.get<ProfileResponse>('/profile', {
        signal: options?.signal,
    })

    return response.data
}
