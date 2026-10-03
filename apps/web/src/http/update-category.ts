import { axiosClient } from '../lib/axios-client'

type UpdateCategoryRequest = {
    id: string
    name?: string
    icon?: string
}

type UpdateCategoryResponse = {
    category: Category
}

export async function updateCategory(
    input: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> {
    const { id, ...data } = input
    const response = await axiosClient.patch<UpdateCategoryResponse>(
        `/categories/${id}`,
        data,
    )

    return response.data
}
