type ContactsDataProps = {
    contacts: Contact[]
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function ContactsData({ totalItems }: ContactsDataProps) {
    return (
        <p className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'contato' : 'contatos'}
        </p>
    )
}
