import type { RequestHandler } from 'express'
import { z } from 'zod'

import { ContactStage, ContactType } from '../../generated/prisma/enums.js'
import { prisma } from '../../lib/prisma/index.js'

const publicContactSchema = z.strictObject({
    name: z.string().trim().min(1).max(120),
    company: z.string().trim().min(1).max(160),
    phone: z
        .string()
        .trim()
        .min(8)
        .max(30)
        .transform((value) => value.replace(/\D/g, ''))
        .refine((value) => value.length >= 10 && value.length <= 13),
    email: z.string().trim().email().max(254).optional(),
})

export const createPublicContact: RequestHandler = async (
    request,
    response,
) => {
    const result = publicContactSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            success: false,
            message: 'Dados do contato inválidos',
        })
    }

    await prisma.contact.create({
        data: {
            ...result.data,
            type: ContactType.PARTNER,
            stage: ContactStage.NEW,
        },
    })

    return response.status(201).json({ success: true })
}
