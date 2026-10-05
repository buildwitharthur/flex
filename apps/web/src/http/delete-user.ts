import { axiosClient } from '../lib/axios-client'

export async function deleteUser(id: string): Promise<void> {
    await axiosClient.delete(`/admin/users/${id}`)
}
