import { axiosClient } from '../lib/axios-client'

export async function deleteCategory(id: string): Promise<void> {
    await axiosClient.delete(`/categories/${id}`)
}
