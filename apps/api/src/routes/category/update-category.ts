import type { RequestHandler } from 'express'
import slugify from 'slugify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma/index.js'

const categoryNameSchema = z
    .string()
    .trim()
    .min(1, 'Informe o nome da categoria')
    .toLowerCase()

const categoryIconSchema = z.string().trim().min(1)

const categoryParamsSchema = z.strictObject({
    id: z.string().trim().min(1),
})

const updateCategorySchema = z
    .strictObject({
        name: categoryNameSchema.optional(),
        icon: categoryIconSchema.optional(),
    })
    .refine(({ name, icon }) => name !== undefined || icon !== undefined, {
        message: 'Informe ao menos um campo para atualização',
    })

export const updateCategory: RequestHandler = async (request, response) => {
    const paramsResult = categoryParamsSchema.safeParse(request.params)

    if (!paramsResult.success) {
        return response.status(400).json({
            message: 'Dados da categoria inválidos',
        })
    }

    const result = updateCategorySchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Dados da categoria inválidos',
        })
    }

    const { id } = paramsResult.data
    const { name, icon } = result.data
    const existingCategory = await prisma.category.findUnique({
        where: { id },
    })

    if (!existingCategory) {
        return response.status(404).json({
            message: 'Categoria não encontrada',
        })
    }

    const data: { name?: string; slug?: string; icon?: string } = {}

    if (name !== undefined) {
        const slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true,
            locale: 'pt',
        })
        const conflictingCategory = await prisma.category.findFirst({
            where: {
                OR: [{ name }, { slug }],
                NOT: { id },
            },
        })

        if (conflictingCategory) {
            return response.status(409).json({
                message: 'Categoria já cadastrada',
            })
        }

        data.name = name
        data.slug = slug
    }

    if (icon !== undefined) {
        data.icon = icon
    }

    const category = await prisma.category.update({
        where: { id },
        data,
    })

    return response.status(200).json({ category })
}
