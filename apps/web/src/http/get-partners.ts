import { axiosClient } from '../lib/axios-client'

type GetPartnersResponse = {
    partners: Partner[]
}

export async function getPartners(signal?: AbortSignal) {
    const response = await axiosClient.get<GetPartnersResponse>('/partners', {
        signal,
    })

    return response.data
}
