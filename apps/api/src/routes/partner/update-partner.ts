import type { RequestHandler } from 'express'
import slugify from 'slugify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const partnerNameSchema = z.string().trim().min(1).toLowerCase()
const requiredTextSchema = z.string().trim().min(1)
const nullableTextSchema = z.string().trim().min(1).nullable().optional()
const categoryIdSchema = z.string().trim().min(1)

const partnerParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

const updatePartnerSchema = z
    .strictObject({
        name: partnerNameSchema.optional(),
        description: requiredTextSchema.optional(),
        shortDescription: nullableTextSchema,
        discount: requiredTextSchema.optional(),
        address: nullableTextSchema,
        phone: nullableTextSchema,
        whatsapp: nullableTextSchema,
        logoUrl: nullableTextSchema,
        websiteUrl: nullableTextSchema,
        couponCode: nullableTextSchema,
        redemptionInstructions: nullableTextSchema,
        categoryId: categoryIdSchema.optional(),
        isActive: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
    })
    .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        {
            message: 'Informe ao menos um campo para atualização',
        },
    )

export const updatePartner: RequestHandler = async (request, response) => {
    const paramsResult = partnerParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados do parceiro inválidos',
        })
    }

    const result = updatePartnerSchema.safeParse(request.body)

    if (!result.success) {
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

    const {
        name,
        description,
        shortDescription,
        discount,
        address,
        phone,
        whatsapp,
        logoUrl,
        websiteUrl,
        couponCode,
        redemptionInstructions,
        categoryId,
        isActive,
        isFeatured,
    } = result.data

    if (categoryId !== undefined) {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        })

        if (!category) {
            return response.status(404).json({
                message: 'Categoria não encontrada',
            })
        }
    }

    let slug: string | undefined

    if (name !== undefined) {
        slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true,
            locale: 'pt',
        })
        const conflictingPartner = await prisma.partner.findFirst({
            where: {
                slug,
                NOT: { id },
            },
        })

        if (conflictingPartner) {
            return response.status(409).json({
                message: 'Parceiro já cadastrado',
            })
        }
    }

    const partner = await prisma.partner.update({
        where: { id },
        data: {
            ...(name !== undefined ? { name } : {}),
            ...(slug !== undefined ? { slug } : {}),
            ...(description !== undefined ? { description } : {}),
            ...(shortDescription !== undefined ? { shortDescription } : {}),
            ...(discount !== undefined ? { discount } : {}),
            ...(address !== undefined ? { address } : {}),
            ...(phone !== undefined ? { phone } : {}),
            ...(whatsapp !== undefined ? { whatsapp } : {}),
            ...(logoUrl !== undefined ? { logoUrl } : {}),
            ...(websiteUrl !== undefined ? { websiteUrl } : {}),
            ...(couponCode !== undefined ? { couponCode } : {}),
            ...(redemptionInstructions !== undefined
                ? { redemptionInstructions }
                : {}),
            ...(categoryId !== undefined ? { categoryId } : {}),
            ...(isActive !== undefined ? { isActive } : {}),
            ...(isFeatured !== undefined ? { isFeatured } : {}),
        },
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

    return response.status(200).json({ partner })
}
