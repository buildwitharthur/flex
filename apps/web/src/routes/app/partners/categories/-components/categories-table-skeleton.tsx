import { Skeleton } from '#/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from '#/components/ui/table'

const ROWS = 6

export function CategoriesTableSkeleton() {
    return (
        <TableContainer aria-hidden="true">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-3 w-16" />
                        </TableHead>
                        <TableHead className="w-28 text-right">
                            <Skeleton className="ml-auto h-3 w-16" />
                        </TableHead>
                        <TableHead className="w-44">
                            <Skeleton className="h-3 w-24" />
                        </TableHead>
                        <TableHead className="w-28 text-right">
                            <Skeleton className="ml-auto h-3 w-10" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: ROWS }, (_, index) => (
                        <TableRow key={index} className="hover:bg-transparent">
                            <TableCell>
                                <Skeleton className="h-3.5 w-32" />
                            </TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="ml-auto h-3.5 w-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-3.5 w-20" />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Skeleton className="size-8 rounded-lg" />
                                    <Skeleton className="size-8 rounded-lg" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
