import { axiosClient } from '../lib/axios-client'

type CreateCategoryRequest = {
    name: string
    icon?: string
}

type CreateCategoryResponse = {
    category: Category
}

export async function createCategory(
    input: CreateCategoryRequest,
): Promise<CreateCategoryResponse> {
    const { name, icon } = input
    const response = await axiosClient.post<CreateCategoryResponse>(
        '/categories',
        { name, icon },
    )

    return response.data
}
