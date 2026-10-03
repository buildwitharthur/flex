import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const categoryParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

export const deleteCategory: RequestHandler = async (request, response) => {
    const paramsResult = categoryParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados da categoria inválidos',
        })
    }

    const { id } = paramsResult.data
    const existingCategory = await prisma.category.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    partners: true,
                },
            },
        },
    })

    if (!existingCategory) {
        return response.status(404).json({
            message: 'Categoria não encontrada',
        })
    }

    if (existingCategory._count.partners > 0) {
        return response.status(409).json({
            message:
                'Não é possível excluir uma categoria que possui parceiros vinculados',
        })
    }

    await prisma.category.delete({
        where: { id },
    })

    return response.status(204).end()
}
