import { axiosClient } from '../lib/axios-client'

type GetPartnerResponse = {
    partner: Partner
}

export async function getPartner(id: string, signal?: AbortSignal) {
    const response = await axiosClient.get<GetPartnerResponse>(
        `/partners/${id}`,
        { signal },
    )

    return response.data
}
