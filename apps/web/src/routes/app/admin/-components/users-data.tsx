import { Badge } from '#/components/ui/badge'
import { UserActions } from './user-actions'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from '#/components/ui/table'

type UsersDataProps = {
    users: User[]
}

const roleLabels: Record<UserRole, string> = {
    ADMIN: 'Administrador',
    STAFF: 'Equipe',
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

export function UsersData({ users }: UsersDataProps) {
    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead className="w-44">Permissão</TableHead>
                        <TableHead className="w-36">Criado em</TableHead>
                        <TableHead className="w-16 text-right">
                            <span className="sr-only">Ações</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-muted-foreground"
                            >
                                Nenhum usuário encontrado.
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium text-foreground capitalize">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            user.role === 'ADMIN'
                                                ? 'brand'
                                                : 'neutral'
                                        }
                                    >
                                        {roleLabels[user.role]}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {dateFormatter.format(
                                        new Date(user.createdAt),
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <UserActions user={user} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
