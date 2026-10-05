import { stringify } from 'csv-stringify/sync'
import type { RequestHandler } from 'express'

import type { ContactStage, ContactType } from '../../generated/prisma/enums.js'
import { prisma } from '../../lib/prisma/index.js'

const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
    PARTNER: 'Quero ser Parceiro',
    MEMBER: 'Quero ser Flex',
}

const CONTACT_STAGE_LABELS: Record<ContactStage, string> = {
    NEW: 'Novo',
    CONTACTED: 'Em contato',
    NEGOTIATION: 'Negociação',
    COMPLETED: 'Concluído',
    LOST: 'Perdido',
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
})

export const exportContacts: RequestHandler = async (_request, response) => {
    const contacts = await prisma.contact.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    const rows = contacts.map((contact) => ({
        name: contact.name,
        type: CONTACT_TYPE_LABELS[contact.type],
        company: contact.company ?? '',
        email: contact.email ?? '',
        phone: contact.phone,
        stage: CONTACT_STAGE_LABELS[contact.stage],
        createdAt: dateFormatter.format(contact.createdAt),
        updatedAt: dateFormatter.format(contact.updatedAt),
    }))

    const csv = stringify(rows, {
        header: true,
        columns: [
            { key: 'name', header: 'Nome' },
            { key: 'type', header: 'Tipo' },
            { key: 'company', header: 'Empresa' },
            { key: 'email', header: 'Email' },
            { key: 'phone', header: 'Telefone' },
            { key: 'stage', header: 'Etapa' },
            { key: 'createdAt', header: 'Criado em' },
            { key: 'updatedAt', header: 'Atualizado em' },
        ],
    })

    response.setHeader('Content-Type', 'text/csv; charset=utf-8')
    response.setHeader(
        'Content-Disposition',
        'attachment; filename="contatos.csv"',
    )

    return response.status(200).send('﻿' + csv)
}
