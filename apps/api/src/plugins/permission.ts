import type { NextFunction, Request, Response } from 'express'

import type { UserRole } from '../generated/prisma/client.js'

export function permission(roles: UserRole[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!roles.includes(request.auth.role)) {
            return response.status(403).json({
                message: 'Usuário sem permissão para acessar este recurso',
            })
        }

        return next()
    }
}
