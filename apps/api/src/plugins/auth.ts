import { verify } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'

import type { UserRole } from '../generated/prisma/client.js'
import { AUTH_COOKIE_NAME } from '../lib/cookies/index.js'

interface Payload {
    sub: string
    username: string
    role: UserRole
}

interface AuthenticatedUser {
    userId: string
    username: string
    role: UserRole
}

declare global {
    namespace Express {
        interface Request {
            auth: AuthenticatedUser
        }
    }
}

export function auth(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies?.[AUTH_COOKIE_NAME]

    if (!token) {
        return response.status(401).json({
            message: 'Usuário não autenticado',
        })
    }

    try {
        const { sub, username, role } = verify(
            token,
            process.env.JWT_SECRET as string,
        ) as Payload

        request.auth = {
            userId: sub,
            username,
            role,
        }

        return next()
    } catch {
        return response.status(401).json({
            message: 'Sessão inválida ou expirada',
        })
    }
}
