import { axiosClient } from '../lib/axios-client'

type UpdateContactRequest = {
    id: string
    type?: ContactType
    name?: string
    company?: string | null
    email?: string | null
    phone?: string
    stage?: ContactStage
}

type UpdateContactResponse = {
    contact: Contact
}

export async function updateContact(
    input: UpdateContactRequest,
): Promise<UpdateContactResponse> {
    const { id, ...data } = input
    const response = await axiosClient.patch<UpdateContactResponse>(
        `/contacts/${id}`,
        data,
    )

    return response.data
}
