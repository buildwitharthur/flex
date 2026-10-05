import { Badge } from '#/components/ui/badge'
import {
    Pagination,
    PaginationButton,
    PaginationContent,
    PaginationInfo,
} from '#/components/ui/pagination'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableScroll,
} from '#/components/ui/table'

type ContactsDataProps = {
    contacts: Contact[]
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    onPageChange: (page: number) => void
}

const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
    PARTNER: 'Quero ser Parceiro',
    MEMBER: 'Quero ser Flex',
}

const CONTACT_STAGE_LABELS: Record<ContactStage, string> = {
    NEW: 'Novo',
    CONTACTED: 'Em contato',
    NEGOTIATION: 'Negociação',
    COMPLETED: 'Concluído',
    LOST: 'Perdido',
}

const CONTACT_STAGE_TONES: Record<
    ContactStage,
    'new' | 'contacted' | 'qualified' | 'completed' | 'discarded'
> = {
    NEW: 'new',
    CONTACTED: 'contacted',
    NEGOTIATION: 'qualified',
    COMPLETED: 'completed',
    LOST: 'discarded',
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
})

export function ContactsData({
    contacts,
    page,
    pageSize,
    totalItems,
    totalPages,
    onPageChange,
}: ContactsDataProps) {
    const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, totalItems)

    return (
        <TableContainer className="min-w-0">
            {totalItems === 0 ? (
                <div className="px-6 py-12 text-center">
                    <h3 className="font-semibold text-foreground">
                        Nenhum contato encontrado
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tente alterar a busca aplicada.
                    </p>
                </div>
            ) : (
                <TableScroll>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Contato</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Etapa</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Criado em</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {contacts.map((contact) => {
                                const subtitle =
                                    contact.company || contact.email
                                const createdAt = new Date(contact.createdAt)

                                return (
                                    <TableRow key={contact.id}>
                                        <TableCell className="w-full max-w-0 min-w-56">
                                            <div className="truncate font-semibold text-foreground">
                                                {contact.name}
                                            </div>
                                            {subtitle ? (
                                                <div className="truncate text-[0.8125rem] text-muted-foreground">
                                                    {subtitle}
                                                </div>
                                            ) : null}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                dot={false}
                                            >
                                                {
                                                    CONTACT_TYPE_LABELS[
                                                        contact.type
                                                    ]
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="stage"
                                                tone={
                                                    CONTACT_STAGE_TONES[
                                                        contact.stage
                                                    ]
                                                }
                                            >
                                                {
                                                    CONTACT_STAGE_LABELS[
                                                        contact.stage
                                                    ]
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap tabular-nums">
                                            {contact.phone}
                                        </TableCell>
                                        <TableCell className="tabular-nums">
                                            <div>
                                                {dateFormatter.format(
                                                    createdAt,
                                                )}
                                            </div>
                                            <div className="text-[0.8125rem] text-muted-foreground">
                                                {timeFormatter.format(
                                                    createdAt,
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableScroll>
            )}

            {totalItems > pageSize ? (
                <Pagination>
                    <PaginationInfo>
                        {from}–{to} de {totalItems}
                    </PaginationInfo>

                    <PaginationContent>
                        <PaginationButton
                            disabled={page <= 1}
                            onClick={() => onPageChange(page - 1)}
                        >
                            Anterior
                        </PaginationButton>
                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1,
                        ).map((pageNumber) => (
                            <PaginationButton
                                key={pageNumber}
                                active={pageNumber === page}
                                aria-current={
                                    pageNumber === page ? 'page' : undefined
                                }
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </PaginationButton>
                        ))}
                        <PaginationButton
                            disabled={page >= totalPages}
                            onClick={() => onPageChange(page + 1)}
                        >
                            Próxima
                        </PaginationButton>
                    </PaginationContent>
                </Pagination>
            ) : null}
        </TableContainer>
    )
}
