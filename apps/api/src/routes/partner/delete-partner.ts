import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const partnerParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

export const deletePartner: RequestHandler = async (request, response) => {
    const paramsResult = partnerParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do parceiro inválidos',
        })
    }

    const { id } = paramsResult.data
    const existingPartner = await prisma.partner.findUnique({
        where: { id },
    })

    if (!existingPartner) {
        return response.status(404).json({
            message: 'Parceiro não encontrado',
        })
    }

    await prisma.partner.delete({
        where: { id },
    })

    return response.status(204).end()
}
