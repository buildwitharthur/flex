import { Ellipsis, Star } from 'lucide-react'

import { Avatar } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
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

type PartnersDataProps = {
    partners: Partner[]
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})

const nameConnectors = new Set(['de', 'da', 'do', 'das', 'dos', 'e'])

function formatDate(value: string) {
    const parts = dateFormatter.formatToParts(new Date(value))
    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? ''

    return `${get('day')} ${get('month')} ${get('year')}`
}

function getInitials(name: string) {
    const words = name
        .split(/\s+/)
        .filter(
            (word) =>
                /\p{L}/u.test(word) &&
                !nameConnectors.has(word.toLocaleLowerCase('pt-BR')),
        )

    if (words.length === 0) {
        return name.slice(0, 2).toLocaleUpperCase('pt-BR')
    }

    const letters =
        words.length === 1
            ? Array.from(words[0]).filter((char) => /\p{L}/u.test(char))
            : words.map((word) => Array.from(word).find((char) => /\p{L}/u.test(char)) ?? '')

    return letters.slice(0, 2).join('').toLocaleUpperCase('pt-BR')
}

export function PartnersData({ partners }: PartnersDataProps) {
    return (
        <TableContainer className="min-w-0 rounded-xl">
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
                                        <div className="flex items-center gap-3">
                                            <Avatar variant="partner">
                                                {getInitials(partner.name)}
                                            </Avatar>
                                            <span className="font-semibold text-foreground">
                                                {partner.name}
                                            </span>
                                        </div>
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
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 min-w-8"
                                            aria-label="Ações do parceiro"
                                        >
                                            <Ellipsis
                                                aria-hidden="true"
                                                className="size-4"
                                            />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableScroll>
        </TableContainer>
    )
}
