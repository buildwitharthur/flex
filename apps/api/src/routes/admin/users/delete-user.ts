import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma/index.js'

const userParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

export const deleteUser: RequestHandler = async (request, response) => {
    const paramsResult = userParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do usuário inválidos',
        })
    }

    const { id } = paramsResult.data

    if (request.auth.userId === id) {
        return response.status(400).json({
            message: 'Você não pode excluir seu próprio usuário',
        })
    }

    const existingUser = await prisma.user.findUnique({
        where: { id },
        select: { id: true },
    })

    if (!existingUser) {
        return response.status(404).json({
            message: 'Usuário não encontrado',
        })
    }

    await prisma.user.delete({
        where: { id },
    })

    return response.status(204).end()
}
