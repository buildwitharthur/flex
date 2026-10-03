import { useSuspenseQuery } from '@tanstack/react-query'

import { getPartners } from '#/http/get-partners'
import { PartnersData } from './partners-data'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'

export function PartnersList() {
    const { data } = useSuspenseQuery({
        queryKey: ['partners'],
        queryFn: ({ signal }) => getPartners(signal),
    })

    const [search] = useQueryState('search', {
        defaultValue: '',
    })

    const partners = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

        if (!normalizedSearch) {
            return data.partners
        }

        return data.partners.filter((partner) =>
            partner.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
        )
    }, [data.partners, search])

    return <PartnersData partners={partners} />
}
