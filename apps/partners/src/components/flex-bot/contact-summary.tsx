import { formatPhone } from './phone'

type Props = { name: string; phone: string }

export default function ContactSummary({ name, phone }: Props) {
    return (
        <dl className="rounded-xl border border-ink/10 bg-cream-100 px-4 py-3">
            <dt className="text-xs text-ink/50">Nome</dt>
            <dd className="display mb-3 text-lg leading-tight break-words">
                {name}
            </dd>
            <dt className="text-xs text-ink/50">WhatsApp</dt>
            <dd className="text-sm text-ink">{formatPhone(phone)}</dd>
        </dl>
    )
}
