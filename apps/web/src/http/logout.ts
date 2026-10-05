import { axiosClient } from '../lib/axios-client'

export async function logout(): Promise<void> {
    await axiosClient.post<void>('/logout')
}
