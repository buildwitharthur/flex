import type { APIRoute } from 'astro'
import { z } from 'zod'

export const prerender = false

const leadSchema = z.strictObject({
    type: z.enum(['PARTNER', 'MEMBER']).default('PARTNER'),
    name: z.string().trim().min(1).max(120),
    company: z.string().trim().min(1).max(160).optional(),
    phone: z
        .string()
        .trim()
        .min(8)
        .max(30)
        .transform((value) => value.replace(/\D/g, ''))
        .refine((value) => value.length >= 10 && value.length <= 13),
    email: z.string().trim().email().max(254).optional(),
}).superRefine((lead, context) => {
    if (lead.type === 'PARTNER' && !lead.company) {
        context.addIssue({ code: 'custom', path: ['company'], message: 'Empresa obrigatória para parceiros.' })
    }
})

const errorResponse = () =>
    new Response(
        JSON.stringify({
            success: false,
            message: 'Não foi possível enviar seu contato.',
        }),
        {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
        },
    )

export const POST: APIRoute = async ({ request }) => {
    let body: unknown

    try {
        body = await request.json()
    } catch {
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Dados do contato inválidos.',
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    }

    const result = leadSchema.safeParse(body)

    if (!result.success) {
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Dados do contato inválidos.',
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    }

    const apiUrl = import.meta.env.API_URL

    if (!apiUrl) {
        return errorResponse()
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    try {
        const response = await fetch(
            `${apiUrl.replace(/\/$/, '')}/contacts/public`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.data),
                signal: controller.signal,
            },
        )

        if (!response.ok) {
            return errorResponse()
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch {
        return errorResponse()
    } finally {
        clearTimeout(timeout)
    }
}

export const ALL: APIRoute = () =>
    new Response(
        JSON.stringify({
            success: false,
            message: 'Método não permitido.',
        }),
        {
            status: 405,
            headers: { Allow: 'POST', 'Content-Type': 'application/json' },
        },
    )
