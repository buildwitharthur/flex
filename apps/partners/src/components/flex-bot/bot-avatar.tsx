import { Bot } from 'lucide-react'

type Props = {
    size?: 'sm' | 'md'
    online?: boolean
}

const sizes = {
    sm: { box: 'h-8 w-8', icon: 16 },
    md: { box: 'h-10 w-10', icon: 20 },
}

export default function BotAvatar({ size = 'sm', online = false }: Props) {
    const { box, icon } = sizes[size]

    return (
        <span
            className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-forest text-cream-50 ring-1 ring-cream-50/20 ${box}`}
            aria-hidden="true"
        >
            <Bot size={icon} strokeWidth={1.8} />
            {online && (
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-forest-light ring-2 ring-cream-50" />
            )}
        </span>
    )
}
