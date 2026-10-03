import { axiosClient } from '../lib/axios-client'

type GetCategoriesResponse = {
    categories: Category[]
}

export async function getCategories(signal?: AbortSignal) {
    const response = await axiosClient.get<GetCategoriesResponse>(
        '/categories',
        { signal },
    )

    return response.data
}
