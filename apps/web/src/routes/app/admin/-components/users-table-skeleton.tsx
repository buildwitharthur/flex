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

export function UsersTableSkeleton() {
    return (
        <TableContainer aria-hidden="true">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-3 w-12" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-3 w-16" />
                        </TableHead>
                        <TableHead className="w-44">
                            <Skeleton className="h-3 w-20" />
                        </TableHead>
                        <TableHead className="w-36">
                            <Skeleton className="h-3 w-16" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: ROWS }, (_, index) => (
                        <TableRow key={index} className="hover:bg-transparent">
                            <TableCell>
                                <Skeleton className="h-3.5 w-36" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-3.5 w-24" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-[22px] w-24 rounded-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-3.5 w-20" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
