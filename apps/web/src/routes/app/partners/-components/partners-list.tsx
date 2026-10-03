import { useSuspenseQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useMemo } from 'react'

import { getPartners } from '#/http/get-partners'
import { PartnersData } from './partners-data'

const PAGE_SIZE = 20

export function PartnersList() {
    const { data } = useSuspenseQuery({
        queryKey: ['partners'],
        queryFn: ({ signal }) => getPartners(signal),
    })

    const [search] = useQueryState('search', {
        defaultValue: '',
    })

    const [page, setPage] = useQueryState(
        'page',
        parseAsInteger.withDefault(1).withOptions({
            clearOnDefault: true,
            history: 'push',
        }),
    )

    const filteredPartners = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

        if (!normalizedSearch) {
            return data.partners
        }

        return data.partners.filter((partner) =>
            partner.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
        )
    }, [data.partners, search])

    const totalItems = filteredPartners.length
    const totalPages = Math.ceil(totalItems / PAGE_SIZE)
    const lastPage = Math.max(1, totalPages)
    const currentPage = Math.min(Math.max(page, 1), lastPage)
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const partners = filteredPartners.slice(startIndex, startIndex + PAGE_SIZE)

    useEffect(() => {
        if (page !== currentPage) {
            void setPage(currentPage, { history: 'replace' })
        }
    }, [page, currentPage, setPage])

    function handlePageChange(nextPage: number) {
        void setPage(nextPage)
    }

    return (
        <PartnersData
            partners={partners}
            page={currentPage}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    )
}
