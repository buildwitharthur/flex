import { Skeleton } from '#/components/ui/skeleton'
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
import { Pagination, PaginationContent } from '#/components/ui/pagination'

const ROWS = 8

export function ContactsTableSkeleton() {
    return (
        <TableContainer aria-hidden="true" className="min-w-0 rounded-xl">
            <TableScroll>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>
                                <Skeleton className="h-3 w-16" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-3 w-10" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-3 w-12" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-3 w-16" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-3 w-20" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array.from({ length: ROWS }, (_, index) => (
                            <TableRow key={index} className="hover:bg-transparent">
                                <TableCell className="w-full max-w-0 min-w-56">
                                    <Skeleton className="h-3.5 w-36" />
                                    <Skeleton className="mt-1.5 h-3 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-[22px] w-32 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-[22px] w-24 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3.5 w-28" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3.5 w-20" />
                                    <Skeleton className="mt-1.5 h-3 w-10" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableScroll>

            <Pagination>
                <Skeleton className="h-3.5 w-24" />
                <PaginationContent>
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                </PaginationContent>
            </Pagination>
        </TableContainer>
    )
}
