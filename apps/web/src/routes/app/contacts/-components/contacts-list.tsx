import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useMemo } from 'react'

import { useListContacts } from '#/hooks/use-list-contacts'
import { ContactsData } from './contacts-data'

const PAGE_SIZE = 10

export function ContactsList() {
    const { data } = useListContacts()

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

    const filteredContacts = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

        if (!normalizedSearch) {
            return data.contacts
        }

        const normalizedPhoneSearch = search.replace(/\D/g, '')

        return data.contacts.filter(
            (contact) =>
                contact.name
                    .toLocaleLowerCase('pt-BR')
                    .includes(normalizedSearch) ||
                contact.company
                    ?.toLocaleLowerCase('pt-BR')
                    .includes(normalizedSearch) ||
                contact.email
                    ?.toLocaleLowerCase('pt-BR')
                    .includes(normalizedSearch) ||
                (normalizedPhoneSearch !== '' &&
                    contact.phone
                        .replace(/\D/g, '')
                        .includes(normalizedPhoneSearch)),
        )
    }, [data.contacts, search])

    const totalItems = filteredContacts.length
    const totalPages = Math.ceil(totalItems / PAGE_SIZE)
    const lastPage = Math.max(1, totalPages)
    const currentPage = Math.min(Math.max(page, 1), lastPage)
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const contacts = filteredContacts.slice(startIndex, startIndex + PAGE_SIZE)

    useEffect(() => {
        if (page !== currentPage) {
            void setPage(currentPage, { history: 'replace' })
        }
    }, [page, currentPage, setPage])

    function handlePageChange(nextPage: number) {
        void setPage(nextPage)
    }

    return (
        <ContactsData
            contacts={contacts}
            page={currentPage}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    )
}
