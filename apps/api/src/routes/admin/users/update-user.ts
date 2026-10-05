import { hash } from 'bcryptjs'
import type { RequestHandler } from 'express'
import { z } from 'zod'

import { UserRole } from '../../../generated/prisma/client.js'
import { prisma } from '../../../lib/prisma/index.js'
import { userSelect } from './user-select.js'

const userParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

const updateUserSchema = z
    .strictObject({
        name: z.string().trim().min(1).optional(),
        username: z.string().trim().min(1).optional(),
        email: z.string().trim().email().nullable().optional(),
        password: z.string().min(1).optional(),
        role: z.enum(UserRole).optional(),
        isActive: z.boolean().optional(),
    })
    .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        {
            message: 'Informe ao menos um campo para atualização',
        },
    )

export const updateUser: RequestHandler = async (request, response) => {
    const paramsResult = userParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do usuário inválidos',
        })
    }

    const result = updateUserSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Dados do usuário inválidos',
        })
    }

    const { id } = paramsResult.data
    const { password, ...data } = result.data
    const existingUser = await prisma.user.findUnique({
        where: { id },
        select: { id: true },
    })

    if (!existingUser) {
        return response.status(404).json({
            message: 'Usuário não encontrado',
        })
    }

    const conflicts = [
        ...(data.username ? [{ username: data.username }] : []),
        ...(data.email ? [{ email: data.email }] : []),
    ]

    if (conflicts.length > 0) {
        const conflictingUser = await prisma.user.findFirst({
            where: {
                OR: conflicts,
                NOT: { id },
            },
        })

        if (conflictingUser) {
            return response.status(409).json({
                message: 'Usuário já cadastrado',
            })
        }
    }

    const user = await prisma.user.update({
        where: { id },
        data: {
            ...data,
            ...(password !== undefined && {
                passwordHash: await hash(password, 12),
            }),
        },
        select: userSelect,
    })

    return response.status(200).json({ user })
}
