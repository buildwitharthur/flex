import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const requiredTextSchema = z.string().trim().min(1)
const nullableTextSchema = z.string().trim().min(1).nullable().optional()

const contactParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

const updateContactSchema = z
    .strictObject({
        name: requiredTextSchema.optional(),
        email: nullableTextSchema,
        phone: requiredTextSchema.optional(),
        stage: z
            .enum(['NEW', 'CONTACTED', 'NEGOTIATION', 'COMPLETED', 'LOST'])
            .optional(),
    })
    .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        {
            message: 'Informe ao menos um campo para atualização',
        },
    )

export const updateContact: RequestHandler = async (request, response) => {
    const paramsResult = contactParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do contato inválidos',
        })
    }

    const result = updateContactSchema.safeParse(request.body)

    if (!result.success) {
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

    const { name, email, phone, stage } = result.data

    const contact = await prisma.contact.update({
        where: { id },
        data: {
            ...(name !== undefined ? { name } : {}),
            ...(email !== undefined ? { email } : {}),
            ...(phone !== undefined ? { phone } : {}),
            ...(stage !== undefined ? { stage } : {}),
        },
    })

    return response.status(200).json({ contact })
}
