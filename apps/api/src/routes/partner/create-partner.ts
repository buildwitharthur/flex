import type { RequestHandler } from 'express'
import slugify from 'slugify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const partnerNameSchema = z.string().trim().min(1).toLowerCase()
const requiredTextSchema = z.string().trim().min(1)
const optionalTextSchema = z.string().trim().min(1).optional()
const categoryIdSchema = z.string().trim().min(1)

const createPartnerSchema = z.strictObject({
    name: partnerNameSchema,
    description: requiredTextSchema,
    shortDescription: optionalTextSchema,
    discount: requiredTextSchema,
    address: optionalTextSchema,
    phone: optionalTextSchema,
    whatsapp: optionalTextSchema,
    logoUrl: optionalTextSchema,
    websiteUrl: optionalTextSchema,
    couponCode: optionalTextSchema,
    redemptionInstructions: optionalTextSchema,
    categoryId: categoryIdSchema,
})

export const createPartner: RequestHandler = async (request, response) => {
    const result = createPartnerSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Dados do parceiro inválidos',
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
    } = result.data
    const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
        locale: 'pt',
    })
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    })

    if (!category) {
        return response.status(404).json({
            message: 'Categoria não encontrada',
        })
    }

    const existingPartner = await prisma.partner.findUnique({
        where: { slug },
    })

    if (existingPartner) {
        return response.status(409).json({
            message: 'Parceiro já cadastrado',
        })
    }

    const partner = await prisma.partner.create({
        data: {
            name,
            slug,
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

    return response.status(201).json({ partner })
}
