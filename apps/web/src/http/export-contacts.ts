import { axiosClient } from '../lib/axios-client'

export async function exportContacts() {
    const response = await axiosClient.get<Blob>('/contacts/export', {
        responseType: 'blob',
    })

    return response.data
}
