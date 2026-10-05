import { Star } from 'lucide-react'

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
import { PartnerAction } from './partner-action'

type PartnersDataProps = {
    partners: Partner[]
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    onPageChange: (page: number) => void
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})

function formatDate(value: string) {
    const parts = dateFormatter.formatToParts(new Date(value))
    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? ''

    return `${get('day')} ${get('month')} ${get('year')}`
}

export function PartnersData({
    partners,
    page,
    pageSize,
    totalItems,
    totalPages,
    onPageChange,
}: PartnersDataProps) {
    const from = (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, totalItems)

    return (
        <TableContainer className="min-w-0">
            <TableScroll>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Parceiro</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Benefício</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Destaque</TableHead>
                            <TableHead>Atualizado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {partners.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-muted-foreground"
                                >
                                    Nenhum parceiro encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            partners.map((partner) => (
                                <TableRow key={partner.id}>
                                    <TableCell className="w-full">
                                        <span className="font-semibold text-foreground capitalize">
                                            {partner.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {partner.category.name}
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground">
                                        {partner.discount}
                                    </TableCell>
                                    <TableCell>
                                        {partner.isActive ? (
                                            <Badge variant="success">
                                                Ativo
                                            </Badge>
                                        ) : (
                                            <Badge variant="neutral">
                                                Inativo
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {partner.isFeatured ? (
                                            <Badge variant="brand" dot={false}>
                                                <Star aria-hidden="true" />
                                                Destaque
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {formatDate(partner.updatedAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <PartnerAction partner={partner} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableScroll>

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
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                            (pageNumber) => (
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
                            ),
                        )}
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
