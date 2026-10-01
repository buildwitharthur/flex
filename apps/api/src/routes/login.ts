import { Router } from 'express'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { authCookieOptions, AUTH_COOKIE_NAME } from '../lib/cookies/index.js'
import { prisma } from '../lib/prisma/index.js'

const loginSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().min(1),
})

export const loginRouter = Router()

loginRouter.post('/login', async (request, response) => {
    const result = loginSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Dados de login inválidos',
        })
    }

    const { username, password } = result.data

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    })

    if (!user) {
        return response.status(401).json({
            message: 'Usuário ou senha inválidos',
        })
    }

    if (!user.isActive) {
        return response.status(403).json({
            message:
                'Usuário sem acesso a plataforma. Contate o administrador do sistema.',
        })
    }

    const passwordMatches = await compare(password, user.passwordHash)

    if (!passwordMatches) {
        return response.status(401).json({
            message: 'Usuário ou senha inválidos',
        })
    }

    const token = jwt.sign(
        {
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
            subject: user.id,
            expiresIn: '1d',
        },
    )

    response.cookie(AUTH_COOKIE_NAME, token, authCookieOptions)

    return response.status(200).end()
})
