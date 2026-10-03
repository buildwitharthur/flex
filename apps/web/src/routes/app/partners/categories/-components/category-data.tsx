import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from '#/components/ui/table'
import { DeleteCategoryAlert } from './delete-category-alert'
import { UpsertCategory } from './upsert-category'

type CategoryDataProps = {
    categories: Category[]
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

export function CategoryData({ categories }: CategoryDataProps) {
    return (
        <TableContainer className="rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="w-28 text-right">
                            Parceiros
                        </TableHead>
                        <TableHead className="w-44">Data de cadastro</TableHead>
                        <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-muted-foreground"
                            >
                                Nenhuma categoria cadastrada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-semibold capitalize">
                                    {category.name}
                                </TableCell>
                                <TableCell className="text-right">—</TableCell>
                                <TableCell>
                                    {dateFormatter.format(
                                        new Date(category.createdAt),
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <UpsertCategory category={category}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Editar categoria"
                                                title="Editar categoria"
                                                className="h-8 w-8 min-w-8 rounded-lg"
                                            >
                                                <Pencil
                                                    aria-hidden="true"
                                                    className="size-4"
                                                />
                                            </Button>
                                        </UpsertCategory>
                                        <DeleteCategoryAlert
                                            categoryId={category.id}
                                            categoryName={category.name}
                                        >
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Excluir categoria"
                                                title="Excluir categoria"
                                                className="h-8 w-8 min-w-8 rounded-lg text-danger hover:bg-danger-soft hover:text-danger"
                                            >
                                                <Trash2
                                                    aria-hidden="true"
                                                    className="size-4"
                                                />
                                            </Button>
                                        </DeleteCategoryAlert>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
