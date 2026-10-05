import { hash } from 'bcryptjs'
import type { RequestHandler } from 'express'
import { z } from 'zod'

import { UserRole } from '../../../generated/prisma/client.js'
import { prisma } from '../../../lib/prisma/index.js'
import { userSelect } from './user-select.js'

const createUserSchema = z.strictObject({
    name: z.string().trim().min(1),
    username: z.string().trim().min(1),
    email: z.string().trim().email().optional(),
    password: z.string().min(1),
    role: z.enum(UserRole),
    isActive: z.boolean().optional(),
})

export const createUser: RequestHandler = async (request, response) => {
    const result = createUserSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Dados do usuário inválidos',
        })
    }

    const { password, ...data } = result.data
    const conflictingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username: data.username },
                ...(data.email ? [{ email: data.email }] : []),
            ],
        },
    })

    if (conflictingUser) {
        return response.status(409).json({
            message: 'Usuário já cadastrado',
        })
    }

    const passwordHash = await hash(password, 12)
    const user = await prisma.user.create({
        data: { ...data, passwordHash },
        select: userSelect,
    })

    return response.status(201).json({ user })
}
