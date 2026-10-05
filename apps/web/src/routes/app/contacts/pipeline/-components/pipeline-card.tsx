import { useDraggable } from '@dnd-kit/core'
import {
    CheckCircle2,
    Copy,
    Ellipsis,
    MessageCircle,
    XCircle,
} from 'lucide-react'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { cn } from '#/lib/cn'

type StageChangeHandler = (contact: Contact, stage: ContactStage) => void

type PipelineCardProps = {
    contact: Contact
    disabled?: boolean
    overlay?: boolean
    onStageChange?: StageChangeHandler
}

function normalizePhone(phone: string) {
    const digits = phone.replace(/\D/g, '')

    return digits.startsWith('55') ? digits : `55${digits}`
}

function openWhatsApp(contact: Contact) {
    const message =
        contact.type === 'PARTNER'
            ? `Olá, ${contact.name}! Tudo bem? Aqui é da Flex Clube. Recebemos seu interesse em ser parceiro e estou entrando em contato para dar continuidade.`
            : `Olá, ${contact.name}! Tudo bem? Aqui é da Flex Clube. Recebemos seu contato e estou entrando em contato para dar continuidade.`
    const url = `https://wa.me/${normalizePhone(contact.phone)}?text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
}

async function copyPhone(phone: string) {
    try {
        await navigator.clipboard.writeText(phone)
        toast.success('Telefone copiado')
    } catch {
        toast.error('Não foi possível copiar o telefone')
    }
}

const contactTypeLabel: Record<ContactType, string> = {
    PARTNER: 'Quero ser Parceiro',
    MEMBER: 'Quero ser Flex',
}

const RECENT_LIMIT_IN_MINUTES = 60

function getElapsedMinutes(createdAt: string) {
    return Math.max(
        1,
        Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000),
    )
}

function formatRelativeTime(createdAt: string) {
    const minutes = getElapsedMinutes(createdAt)

    if (minutes < 60) {
        return `há ${minutes} min`
    }

    const hours = Math.floor(minutes / 60)

    if (hours < 24) {
        return `há ${hours}h`
    }

    const days = Math.floor(hours / 24)

    return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
}

type PipelineCardContentProps = ComponentPropsWithoutRef<'article'> & {
    contact: Contact
    onStageChange?: StageChangeHandler
    cardRef?: Ref<HTMLElement>
}

function PipelineCardContent({
    contact,
    onStageChange,
    cardRef,
    className,
    ...props
}: PipelineCardContentProps) {
    const isRecent =
        getElapsedMinutes(contact.createdAt) < RECENT_LIMIT_IN_MINUTES

    return (
        <article
            ref={cardRef}
            className={cn(
                'relative rounded-md border border-border bg-surface px-3 pt-2 pb-2.5 transition-colors duration-fast hover:border-border-strong',
                className,
            )}
            {...props}
        >
            <div className="flex min-w-0 items-center gap-1.5 pr-7 leading-5 font-semibold">
                {isRecent ? (
                    <>
                        <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="sr-only">Recebido há pouco.</span>
                    </>
                ) : null}
                <span className="truncate">{contact.name}</span>
            </div>

            {onStageChange ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Ações de ${contact.name}`}
                            className="absolute top-1 right-1 size-6 min-w-6"
                            onPointerDown={(event) => event.stopPropagation()}
                        >
                            <Ellipsis aria-hidden="true" className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        onPointerDown={(event) => event.stopPropagation()}
                    >
                        <DropdownMenuItem onSelect={() => openWhatsApp(contact)}>
                            <MessageCircle aria-hidden="true" />
                            Abrir no WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => void copyPhone(contact.phone)}
                        >
                            <Copy aria-hidden="true" />
                            Copiar telefone
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onSelect={() => onStageChange(contact, 'COMPLETED')}
                        >
                            <CheckCircle2 aria-hidden="true" />
                            Finalizar contato
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            destructive
                            onSelect={() => onStageChange(contact, 'LOST')}
                        >
                            <XCircle aria-hidden="true" />
                            Marcar como perdido
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Ações de ${contact.name}`}
                    className="absolute top-1 right-1 size-6 min-w-6"
                    tabIndex={-1}
                >
                    <Ellipsis aria-hidden="true" className="size-4" />
                </Button>
            )}

            <p className="truncate text-[13px] leading-4.5 text-muted-foreground">
                {contact.company ?? contactTypeLabel[contact.type]}
            </p>

            <div className="mt-0.5 flex items-baseline justify-between gap-2 text-xs leading-4 text-muted-foreground">
                <span className="min-w-0 truncate tabular-nums">
                    {contact.phone}
                </span>
                <span className="shrink-0 whitespace-nowrap">
                    {formatRelativeTime(contact.createdAt)}
                </span>
            </div>
        </article>
    )
}

function DraggablePipelineCard({
    contact,
    disabled,
    onStageChange,
}: Omit<PipelineCardProps, 'overlay'>) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: contact.id,
        data: { contactId: contact.id, stage: contact.stage },
        disabled,
    })

    return (
        <PipelineCardContent
            contact={contact}
            onStageChange={onStageChange}
            cardRef={setNodeRef}
            {...attributes}
            {...listeners}
            className={cn(
                disabled ? 'cursor-default' : 'cursor-grab',
                isDragging && 'opacity-40',
            )}
        />
    )
}

export function PipelineCard({
    contact,
    disabled,
    overlay,
    onStageChange,
}: PipelineCardProps) {
    if (overlay) {
        return (
            <PipelineCardContent
                contact={contact}
                aria-hidden="true"
                className="scale-[1.02] cursor-grabbing shadow-lg hover:border-border"
            />
        )
    }

    return (
        <DraggablePipelineCard
            contact={contact}
            disabled={disabled}
            onStageChange={onStageChange}
        />
    )
}
