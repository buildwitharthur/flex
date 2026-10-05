import { Skeleton } from '#/components/ui/skeleton'
import { Pagination, PaginationContent } from '#/components/ui/pagination'
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

const ROWS = 8

export function PartnersTableSkeleton() {
    return (
        <TableContainer aria-hidden="true" className="min-w-0 rounded-xl">
            <TableScroll>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>
                                <Skeleton className="h-3 w-14" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-3 w-16" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-3 w-16" />
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
                            <TableHead className="text-right">
                                <Skeleton className="ml-auto h-3 w-10" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Array.from({ length: ROWS }, (_, index) => (
                            <TableRow key={index} className="hover:bg-transparent">
                                <TableCell className="w-full">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="size-7 shrink-0 rounded-md" />
                                        <Skeleton className="h-3.5 w-40" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3.5 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3.5 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-[22px] w-16 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-[22px] w-24 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3.5 w-24" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="ml-auto size-8 rounded-md" />
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
