import { axiosClient } from '../lib/axios-client'

export async function deletePartner(id: string): Promise<void> {
    await axiosClient.delete(`/partners/${id}`)
}
