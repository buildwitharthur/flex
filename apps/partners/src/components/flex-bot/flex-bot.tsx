import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Loader2, X } from 'lucide-react'
import { COMMERCIAL_EMAIL, WHATSAPP_URL } from '../../lib/contact'
import BotAvatar from './bot-avatar'
import ContactSummary from './contact-summary'
import { digitsOnly, formatPhone, isValidPhone } from './phone'

type BotStep =
    | 'WELCOME'
    | 'MEMBER_NAME'
    | 'MEMBER_PHONE'
    | 'MEMBER_CONFIRM'
    | 'SUBMITTING'
    | 'SUCCESS'
    | 'ERROR'
    | 'PARTNER'

// Posição de cada etapa no funil; usada para podar o histórico ao voltar.
const STEP_RANK: Record<BotStep, number> = {
    WELCOME: 0,
    MEMBER_NAME: 1,
    PARTNER: 1,
    MEMBER_PHONE: 2,
    MEMBER_CONFIRM: 3,
    SUBMITTING: 3,
    ERROR: 4,
    SUCCESS: 4,
}

type BotMessage = {
    id: string
    role: 'bot' | 'user'
    content: string
    // Etapa à qual a mensagem pertence.
    at: BotStep
    summary?: ContactDraft
    emailCard?: boolean
}

type ContactDraft = {
    name: string
    phone: string
}

const EMPTY_DRAFT: ContactDraft = { name: '', phone: '' }

const TYPING_DELAY = 450

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

const buttonBase =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-50 [@media(max-height:480px)]:py-2'
const primaryButton = `${buttonBase} bg-ink text-cream-50 hover:bg-coral`
const secondaryButton = `${buttonBase} border border-ink/15 bg-cream-50 text-ink hover:bg-cream-200/50`
const ghostButton =
    'inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-50'

const choiceBase =
    'group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest motion-reduce:transition-colors motion-reduce:hover:translate-y-0 [@media(max-height:480px)]:py-2'

function ChoiceArrow({ light = false }: { light?: boolean }) {
    return (
        <span
            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                light
                    ? 'bg-cream-50/10 group-hover:bg-cream-50/20'
                    : 'bg-ink/5 group-hover:bg-ink/10'
            }`}
            aria-hidden="true"
        >
            <ArrowRight size={16} strokeWidth={2} />
        </span>
    )
}

function BackButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={ghostButton}
        >
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar
        </button>
    )
}

function TypingIndicator({ withAvatar }: { withAvatar: boolean }) {
    return (
        <div className="mt-3 flex gap-2" role="status">
            <div className="w-8 shrink-0">{withAvatar && <BotAvatar />}</div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-cream-100 px-4 py-3.5">
                <span className="sr-only">Flex está digitando</span>
                {[0, 150, 300].map((delay) => (
                    <span
                        key={delay}
                        aria-hidden="true"
                        style={{ animationDelay: `${delay}ms` }}
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/40 motion-reduce:animate-none"
                    />
                ))}
            </div>
        </div>
    )
}

export default function FlexBot() {
    const [visible, setVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<BotStep>('WELCOME')
    const [messages, setMessages] = useState<BotMessage[]>([])
    const [typing, setTyping] = useState(false)
    const [draft, setDraft] = useState<ContactDraft>(EMPTY_DRAFT)
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const triggerRef = useRef<HTMLButtonElement>(null)
    const panelRef = useRef<HTMLElement>(null)
    const messagesRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const abortRef = useRef<AbortController | null>(null)
    const nextId = useRef(0)
    const wasOpen = useRef(false)
    const copiedTimer = useRef<number | undefined>(undefined)
    // Invalida respostas pendentes (fechar, voltar, reiniciar).
    const replyTimer = useRef<number | undefined>(undefined)
    const replyFlow = useRef(0)

    const isInputStep = step === 'MEMBER_NAME' || step === 'MEMBER_PHONE'
    const lastMessage = messages[messages.length - 1]

    // Entrada suave do trigger depois de ~1.2s (sem delay com reduced motion).
    useEffect(() => {
        const timer = window.setTimeout(
            () => setVisible(true),
            prefersReducedMotion() ? 0 : 1200,
        )
        return () => window.clearTimeout(timer)
    }, [])

    useEffect(
        () => () => {
            abortRef.current?.abort()
            window.clearTimeout(copiedTimer.current)
            window.clearTimeout(replyTimer.current)
        },
        [],
    )

    // CTAs de parceria da landing abrem o Flex direto no estado PARTNER.
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const target = event.target
            if (!(target instanceof Element)) return
            if (!target.closest('[data-open-flex-partner]')) return
            event.preventDefault()
            openBot('PARTNER')
        }
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [])

    useEffect(() => {
        if (!open) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open])

    // Foco no painel ao abrir; devolve ao trigger (remontado) ao fechar.
    useEffect(() => {
        if (open) {
            wasOpen.current = true
            panelRef.current?.focus()
        } else if (wasOpen.current) {
            triggerRef.current?.focus()
        }
    }, [open])

    // Foco no input só depois que a resposta do Flex apareceu.
    useEffect(() => {
        if (isInputStep && !typing) inputRef.current?.focus()
    }, [step, typing])

    useEffect(() => {
        messagesRef.current?.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
    }, [messages, typing])

    function say(
        role: BotMessage['role'],
        content: string,
        at: BotStep,
        extra?: Pick<BotMessage, 'summary' | 'emailCard'>,
    ): BotMessage {
        return { id: String(nextId.current++), role, content, at, ...extra }
    }

    function append(...added: BotMessage[]) {
        setMessages((current) => [...current, ...added])
    }

    function cancelReply() {
        replyFlow.current += 1
        window.clearTimeout(replyTimer.current)
        setTyping(false)
    }

    // Mostra "digitando" por um instante e então revela a resposta do Flex.
    function reply(build: () => BotMessage[], then?: () => void) {
        cancelReply()
        if (prefersReducedMotion()) {
            append(...build())
            then?.()
            return
        }
        const flow = replyFlow.current
        setTyping(true)
        replyTimer.current = window.setTimeout(() => {
            if (flow !== replyFlow.current) return
            setTyping(false)
            append(...build())
            then?.()
        }, TYPING_DELAY)
    }

    // Volta para uma etapa, podando o histórico posterior (sem bolha de "Voltar").
    function goBack(target: BotStep) {
        cancelReply()
        abortRef.current?.abort()
        abortRef.current = null
        setMessages((current) =>
            current.filter((message) => STEP_RANK[message.at] <= STEP_RANK[target]),
        )
        setValue(
            target === 'MEMBER_NAME'
                ? draft.name
                : target === 'MEMBER_PHONE'
                  ? formatPhone(draft.phone)
                  : '',
        )
        setError('')
        setStep(target)
    }

    function reset() {
        cancelReply()
        abortRef.current?.abort()
        abortRef.current = null
        setStep('WELCOME')
        setMessages([])
        setDraft(EMPTY_DRAFT)
        setValue('')
        setError('')
        setCopied(false)
    }

    function openBot(initial: 'WELCOME' | 'PARTNER' = 'WELCOME') {
        reset()
        setOpen(true)
        if (initial === 'PARTNER') {
            append(say('bot', 'Oi! 👋 Sou o Flex.\nComo posso te ajudar?', 'WELCOME'))
            startPartner()
        } else {
            reply(() => [say('bot', 'Oi! 👋 Sou o Flex.\nComo posso te ajudar?', 'WELCOME')])
        }
    }

    function close() {
        setOpen(false)
        reset()
    }

    function startMember() {
        append(say('user', 'Quero ser Flex', 'MEMBER_NAME'))
        reply(
            () => [say('bot', 'Legal! Como posso te chamar?', 'MEMBER_NAME')],
            () => setStep('MEMBER_NAME'),
        )
    }

    function startPartner() {
        append(say('user', 'Quero ser parceiro', 'PARTNER'))
        reply(
            () => [
                say(
                    'bot',
                    'Para falar sobre parcerias, envie um e-mail para nossa equipe.\n\nCopie o endereço abaixo e fale com a gente pelo seu e-mail de preferência.',
                    'PARTNER',
                    { emailCard: true },
                ),
            ],
            () => setStep('PARTNER'),
        )
    }

    function handleInputSubmit(event: FormEvent) {
        event.preventDefault()
        const text = value.trim()

        if (step === 'MEMBER_NAME') {
            if (!text) return setError('Informe seu nome para continuar.')
            const firstName = text.split(/\s+/)[0]
            setDraft((current) => ({ ...current, name: text }))
            append(say('user', text, 'MEMBER_PHONE'))
            reply(
                () => [
                    say(
                        'bot',
                        `Perfeito, ${firstName}. Qual é o seu WhatsApp?`,
                        'MEMBER_PHONE',
                    ),
                ],
                () => {
                    setValue(formatPhone(draft.phone))
                    setStep('MEMBER_PHONE')
                },
            )
        } else {
            if (!isValidPhone(text)) {
                return setError('Informe um WhatsApp válido, com DDD.')
            }
            const phone = digitsOnly(text)
            const summary = { name: draft.name, phone }
            setDraft(summary)
            append(say('user', formatPhone(phone), 'MEMBER_CONFIRM'))
            reply(
                () => [say('bot', 'Confere seus dados?', 'MEMBER_CONFIRM', { summary })],
                () => setStep('MEMBER_CONFIRM'),
            )
        }

        setValue('')
        setError('')
    }

    async function submitContact() {
        if (step === 'SUBMITTING') return
        const controller = new AbortController()
        abortRef.current = controller
        setStep('SUBMITTING')

        try {
            const apiUrl = import.meta.env.PUBLIC_API_URL?.replace(/\/$/, '')
            if (!apiUrl) throw new Error('missing-public-api-url')

            const response = await fetch(`${apiUrl}/contacts/public`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: draft.name, phone: draft.phone }),
                signal: controller.signal,
            })

            if (!response.ok) throw new Error('contact-submit-failed')

            reply(
                () => [
                    say(
                        'bot',
                        'Tudo certo! ✓\n\nRecebi seu contato.\nNossa equipe vai falar com você pelo WhatsApp informado.',
                        'SUCCESS',
                    ),
                ],
                () => setStep('SUCCESS'),
            )
        } catch {
            if (controller.signal.aborted) return
            reply(
                () => [
                    say(
                        'bot',
                        'Não consegui enviar seu contato agora.\n\nVocê pode tentar novamente ou falar com nossa equipe pelo WhatsApp.',
                        'ERROR',
                    ),
                ],
                () => setStep('ERROR'),
            )
        }
    }

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(COMMERCIAL_EMAIL)
            setCopied(true)
            window.clearTimeout(copiedTimer.current)
            copiedTimer.current = window.setTimeout(() => setCopied(false), 1800)
        } catch {
            // O e-mail continua visível para cópia manual.
        }
    }

    function retrySubmit() {
        // Remove a mensagem de erro antes de tentar de novo.
        setMessages((current) => current.filter((message) => message.at !== 'ERROR'))
        submitContact()
    }

    return (
        <div>
            {!open && (
                <button
                    ref={triggerRef}
                    type="button"
                    aria-label="Abrir conversa com o Flex, assistente virtual"
                    onClick={() => openBot()}
                    className={`fixed right-4 bottom-4 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-ink py-2 pr-6 pl-2 text-base font-semibold tracking-tight text-cream-50 ring-1 ring-cream-50/15 shadow-[0_10px_28px_rgba(20,20,20,0.28)] transition-all duration-500 ease-out hover:-translate-y-px hover:bg-coral hover:shadow-[0_14px_36px_rgba(20,20,20,0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest motion-reduce:transition-none sm:right-6 sm:bottom-6 ${
                        visible
                            ? 'translate-y-0 scale-100 opacity-100'
                            : 'pointer-events-none translate-y-3 scale-95 opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100'
                    }`}
                >
                    <BotAvatar size="md" online />
                    <span>Fale com o Flex</span>
                </button>
            )}

            {open && (
                <section
                    ref={panelRef}
                    role="dialog"
                    aria-label="Conversa com o Flex, assistente virtual"
                    tabIndex={-1}
                    className="fixed right-4 bottom-4 z-50 flex h-[500px] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream-50 text-ink shadow-[0_20px_50px_rgba(20,20,20,0.16)] outline-none sm:right-6 sm:bottom-6"
                >
                    <header className="flex shrink-0 items-center gap-3 border-b border-ink/10 bg-cream-50 px-4 py-3 [@media(max-height:480px)]:py-2">
                        <BotAvatar size="md" online />
                        <div className="min-w-0 flex-1">
                            <p className="display text-xl leading-none">Flex</p>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/60">
                                <span>Assistente virtual</span>
                                <span aria-hidden="true">·</span>
                                <span className="inline-flex items-center gap-1">
                                    <span
                                        className="h-1.5 w-1.5 rounded-full bg-forest-light"
                                        aria-hidden="true"
                                    />
                                    online
                                </span>
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Fechar conversa"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest"
                        >
                            <X size={20} strokeWidth={2} aria-hidden="true" />
                        </button>
                    </header>

                    <div
                        ref={messagesRef}
                        role="log"
                        aria-live="polite"
                        aria-relevant="additions"
                        className="min-h-0 flex-1 overflow-y-auto bg-cream-50 p-4 [@media(max-height:480px)]:p-2"
                    >
                        {messages.map((message, index) => {
                            const isUser = message.role === 'user'
                            const startsBotGroup =
                                !isUser && messages[index - 1]?.role !== 'bot'

                            return (
                                <div
                                    key={message.id}
                                    className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'} ${
                                        index === 0
                                            ? ''
                                            : startsBotGroup || isUser
                                              ? 'mt-3'
                                              : 'mt-1.5'
                                    }`}
                                >
                                    {!isUser && (
                                        <div className="w-8 shrink-0">
                                            {startsBotGroup && <BotAvatar />}
                                        </div>
                                    )}
                                    <div
                                        className={`flex min-w-0 max-w-[80%] flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'}`}
                                    >
                                        <div
                                            className={`whitespace-pre-line break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                                isUser
                                                    ? 'rounded-br-sm bg-ink text-cream-50'
                                                    : 'rounded-bl-sm bg-cream-100 text-ink'
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                        {message.summary && (
                                            <div className="w-full">
                                                <ContactSummary
                                                    name={message.summary.name}
                                                    phone={message.summary.phone}
                                                />
                                            </div>
                                        )}
                                        {message.emailCard && (
                                            <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-ink/10 bg-cream-100 px-4 py-3">
                                                <div className="min-w-0">
                                                    <p className="text-xs text-ink/50">
                                                        E-mail comercial
                                                    </p>
                                                    <p className="text-sm break-all text-ink select-all">
                                                        {COMMERCIAL_EMAIL}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={copyEmail}
                                                    aria-label={
                                                        copied
                                                            ? 'E-mail copiado'
                                                            : 'Copiar e-mail comercial'
                                                    }
                                                    className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-forest transition-colors hover:bg-forest/10 focus-visible:outline-2 focus-visible:outline-forest"
                                                >
                                                    {copied ? 'Copiado' : 'Copiar'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                        {typing && <TypingIndicator withAvatar={lastMessage?.role !== 'bot'} />}
                    </div>

                    <fieldset
                        disabled={typing}
                        className={`m-0 min-w-0 shrink-0 border-x-0 border-b-0 border-t border-ink/10 bg-cream-100 p-4 transition-opacity [@media(max-height:480px)]:p-2 ${
                            typing ? 'pointer-events-none opacity-60' : ''
                        }`}
                    >
                        {step === 'WELCOME' && (
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={startMember}
                                    className={`${choiceBase} bg-forest text-cream-50 hover:bg-forest-dark`}
                                >
                                    <span>
                                        <span className="block font-medium">
                                            Quero ser Flex
                                        </span>
                                        <span className="mt-0.5 block text-sm text-cream-50/75">
                                            Quero fazer parte do clube
                                        </span>
                                    </span>
                                    <ChoiceArrow light />
                                </button>
                                <button
                                    type="button"
                                    onClick={startPartner}
                                    className={`${choiceBase} border border-ink/15 bg-cream-50 text-ink hover:border-ink/25 hover:bg-cream-200/50`}
                                >
                                    <span>
                                        <span className="block font-medium">
                                            Quero ser parceiro
                                        </span>
                                        <span className="mt-0.5 block text-sm text-ink/65">
                                            Quero cadastrar minha empresa como parceira
                                        </span>
                                    </span>
                                    <ChoiceArrow />
                                </button>
                            </div>
                        )}

                        {isInputStep && (
                            <form
                                onSubmit={handleInputSubmit}
                                noValidate
                                className="flex flex-col gap-2"
                            >
                                <label htmlFor="flex-bot-input" className="sr-only">
                                    {step === 'MEMBER_NAME' ? 'Seu nome' : 'Seu WhatsApp'}
                                </label>
                                <input
                                    key={step}
                                    ref={inputRef}
                                    id="flex-bot-input"
                                    type={step === 'MEMBER_NAME' ? 'text' : 'tel'}
                                    autoComplete={step === 'MEMBER_NAME' ? 'name' : 'tel'}
                                    placeholder={
                                        step === 'MEMBER_NAME'
                                            ? 'Seu nome'
                                            : '(21) 99999-9999'
                                    }
                                    value={value}
                                    onChange={(event) => {
                                        setValue(event.target.value)
                                        setError('')
                                    }}
                                    aria-invalid={error ? true : undefined}
                                    aria-describedby={error ? 'flex-bot-error' : undefined}
                                    className="w-full min-w-0 rounded-xl border border-ink/15 bg-cream-50 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-forest [@media(max-height:480px)]:py-2"
                                />
                                {error && (
                                    <p
                                        id="flex-bot-error"
                                        role="alert"
                                        className="text-xs text-coral-dark"
                                    >
                                        {error}
                                    </p>
                                )}
                                <button type="submit" className={primaryButton}>
                                    Continuar
                                </button>
                                <BackButton
                                    onClick={() =>
                                        goBack(
                                            step === 'MEMBER_NAME'
                                                ? 'WELCOME'
                                                : 'MEMBER_NAME',
                                        )
                                    }
                                />
                            </form>
                        )}

                        {(step === 'MEMBER_CONFIRM' || step === 'SUBMITTING') && (
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={submitContact}
                                    disabled={step === 'SUBMITTING'}
                                    className={primaryButton}
                                >
                                    {step === 'SUBMITTING' ? (
                                        <>
                                            <Loader2
                                                size={16}
                                                aria-hidden="true"
                                                className="animate-spin motion-reduce:animate-none"
                                            />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar contato'
                                    )}
                                </button>
                                <BackButton
                                    onClick={() => goBack('MEMBER_PHONE')}
                                    disabled={step === 'SUBMITTING'}
                                />
                            </div>
                        )}

                        {step === 'ERROR' && (
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={retrySubmit}
                                    className={primaryButton}
                                >
                                    Tentar novamente
                                </button>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={secondaryButton}
                                >
                                    Abrir WhatsApp
                                </a>
                                <BackButton onClick={() => goBack('MEMBER_CONFIRM')} />
                            </div>
                        )}

                        {step === 'SUCCESS' && (
                            <button type="button" onClick={close} className={primaryButton}>
                                Fechar atendimento
                            </button>
                        )}

                        {step === 'PARTNER' && (
                            <BackButton onClick={() => goBack('WELCOME')} />
                        )}
                    </fieldset>
                </section>
            )}
        </div>
    )
}
