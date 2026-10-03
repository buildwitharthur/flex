import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const partnerParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

export const getPartner: RequestHandler = async (request, response) => {
    const paramsResult = partnerParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do parceiro inválidos',
        })
    }

    const { id } = paramsResult.data
    const partner = await prisma.partner.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    })

    if (!partner) {
        return response.status(404).json({
            message: 'Parceiro não encontrado',
        })
    }

    return response.status(200).json({ partner })
}
