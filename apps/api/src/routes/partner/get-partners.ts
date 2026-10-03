import type { RequestHandler } from 'express'

import { prisma } from '../../lib/prisma/index.js'

export const getPartners: RequestHandler = async (_request, response) => {
    const partners = await prisma.partner.findMany({
        orderBy: {
            name: 'asc',
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

    return response.status(200).json({ partners })
}
