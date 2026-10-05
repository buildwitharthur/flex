import { useSuspenseQuery } from '@tanstack/react-query'

import { getContacts } from '#/http/get-contacts'

export function useListContacts() {
    return useSuspenseQuery({
        queryKey: ['contacts'],
        queryFn: ({ signal }) => getContacts(signal),
    })
}
