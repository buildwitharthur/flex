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

const createCategorySchema = z.strictObject({
    name: categoryNameSchema,
    icon: categoryIconSchema.optional(),
})

export const createCategory: RequestHandler = async (request, response) => {
    const result = createCategorySchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Dados da categoria inválidos',
        })
    }

    const { name, icon } = result.data
    const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
        locale: 'pt',
    })
    const existingCategory = await prisma.category.findFirst({
        where: {
            OR: [{ name }, { slug }],
        },
    })

    if (existingCategory) {
        return response.status(409).json({
            message: 'Categoria já cadastrada',
        })
    }

    const category = await prisma.category.create({
        data: {
            name,
            slug,
            icon,
        },
    })

    return response.status(201).json({ category })
}
