import { useSuspenseQuery } from '@tanstack/react-query'

import { getCategories } from '#/http/get-categories'
import { CategoryData } from './category-data'

export function CategoriesList() {
    const { data } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: ({ signal }) => getCategories(signal),
    })

    return <CategoryData categories={data.categories} />
}
