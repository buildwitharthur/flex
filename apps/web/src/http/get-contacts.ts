import { axiosClient } from '../lib/axios-client'

type GetContactsResponse = {
    contacts: Contact[]
}

export async function getContacts(signal?: AbortSignal) {
    const response = await axiosClient.get<GetContactsResponse>('/contacts', {
        signal,
    })

    return response.data
}
