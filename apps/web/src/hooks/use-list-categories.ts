import { useSuspenseQuery } from '@tanstack/react-query'

import { getCategories } from '#/http/get-categories'

export function useListCategories() {
    return useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: ({ signal }) => getCategories(signal),
    })
}
