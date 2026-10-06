import type { RequestHandler } from 'express'

import { prisma } from '../../lib/prisma/index.js'

export const getPublicPartners: RequestHandler = async (_request, response) => {
    const partners = await prisma.partner.findMany({
        where: { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
        select: {
            id: true,
            name: true,
            description: true,
            discount: true,
            isFeatured: true,
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    return response.status(200).json({ partners })
}
