export function canPermission(
    user: Pick<User, 'role'> | null | undefined,
    roles: UserRole[],
): boolean {
    if (!user) {
        return false
    }

    return roles.includes(user.role)
}
