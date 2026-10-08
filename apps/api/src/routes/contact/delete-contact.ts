import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const contactParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

export const deleteContact: RequestHandler = async (request, response) => {
    const paramsResult = contactParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do contato inválidos',
        })
    }

    const { id } = paramsResult.data
    const existingContact = await prisma.contact.findUnique({
        where: { id },
    })

    if (!existingContact) {
        return response.status(404).json({
            message: 'Contato não encontrado',
        })
    }

    await prisma.contact.delete({
        where: { id },
    })

    return response.status(204).end()
}
