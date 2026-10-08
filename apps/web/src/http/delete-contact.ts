import { axiosClient } from '../lib/axios-client'

export async function deleteContact(id: string): Promise<void> {
    await axiosClient.delete(`/contacts/${id}`)
}
