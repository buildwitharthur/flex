import { useEffect, useRef } from 'react'
import { ExternalLink, MapPin, MessageCircle, Phone, X } from 'lucide-react'
import type { MouseEvent } from 'react'
import { splitPhones, whatsappLink } from '../../lib/partner-contact'
import type { PublicPartner } from '../../types/partner'

interface Props {
    partner: PublicPartner | null
    onClose: () => void
}

const dialogClasses =
    'm-auto max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto border-0 p-0 w-[672px] rounded-3xl bg-cream-50 text-ink backdrop:bg-ink/60'

export default function PartnerDialog({ partner, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (partner && !dialog.open) dialog.showModal()
        if (!partner && dialog.open) dialog.close()
    }, [partner])

    const description = partner?.description ?? ''
    const specialties = description.match(/^(Especialidades:)\s*([\s\S]*)$/i)
    const descriptionLabel = specialties?.[1] ?? ''
    const descriptionText = specialties?.[2] ?? description

    const phones = splitPhones(partner?.phone)
    const whatsapp = whatsappLink(partner?.whatsapp)
    const hasContact =
        Boolean(partner?.address) || phones.length > 0 || Boolean(whatsapp)

    function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
        if (event.target !== event.currentTarget) return

        const bounds = event.currentTarget.getBoundingClientRect()
        const outside =
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom

        if (outside) event.currentTarget.close()
    }

    return (
        <dialog
            ref={dialogRef}
            id="partner-dialog"
            aria-labelledby="partner-dialog-title"
            className={dialogClasses}
            onClose={onClose}
            onClick={handleBackdropClick}
        >
            <div className="relative p-6 sm:p-10">
                <form method="dialog" className="absolute right-5 top-5">
                    <button
                        type="submit"
                        aria-label="Fechar"
                        autoFocus
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                    >
                        <X size={14} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                </form>

                {partner?.category.name && (
                    <div className="mb-4 flex items-center gap-2 pr-10">
                        {partner.category.icon && (
                            <span className="text-xl" aria-hidden="true">
                                {partner.category.icon}
                            </span>
                        )}
                        <span className="text-xs uppercase tracking-widest text-ink/50">
                            {partner.category.name}
                        </span>
                    </div>
                )}
                <h2
                    id="partner-dialog-title"
                    className="display mb-2 break-words pr-5 text-3xl leading-[1.1] text-ink sm:text-4xl"
                >
                    {partner?.name}
                </h2>
                {partner?.discount && (
                    <p className="display-italic mb-6 break-words text-3xl text-coral">
                        {partner.discount}
                    </p>
                )}

                {hasContact && (
                    <div className="mb-6 space-y-2 rounded-2xl border border-ink/5 bg-cream-100 p-5">
                        {partner?.address && (
                            <div className="flex items-start gap-3">
                                <MapPin
                                    aria-hidden="true"
                                    className="mt-0.5 size-4 shrink-0 text-ink/40"
                                />
                                <span className="break-words text-ink/80">
                                    {partner.address}
                                </span>
                            </div>
                        )}

                        {phones.length > 0 && (
                            <div className="flex items-start gap-3">
                                <Phone
                                    aria-hidden="true"
                                    className="mt-0.5 size-4 shrink-0 text-ink/40"
                                />
                                <span className="break-words text-ink/80">
                                    {phones.map((phone, index) => (
                                        <span key={`${phone.href}-${index}`}>
                                            {index > 0 && (
                                                <span className="text-ink/40">
                                                    {' '}
                                                    /{' '}
                                                </span>
                                            )}
                                            <a
                                                href={phone.href}
                                                className="transition-colors hover:text-coral"
                                            >
                                                {phone.label}
                                            </a>
                                        </span>
                                    ))}
                                </span>
                            </div>
                        )}

                        {whatsapp && (
                            <div className="flex items-start gap-3">
                                <MessageCircle
                                    aria-hidden="true"
                                    className="mt-0.5 size-4 shrink-0 text-ink/40"
                                />
                                <a
                                    href={whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink/80 transition-colors hover:text-coral"
                                >
                                    Falar no WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {Boolean(description.trim()) && (
                    <div className="mb-8 leading-relaxed text-ink/70">
                        {descriptionLabel && (
                            <p className="mb-7">{descriptionLabel}</p>
                        )}
                        <p className="whitespace-pre-line break-words">
                            {descriptionText}
                        </p>
                    </div>
                )}

                {partner?.couponCode && (
                    <div className="mb-6 rounded-2xl bg-forest p-5 text-cream-50">
                        <p className="mb-2 text-xs uppercase tracking-widest text-cream-50/60">
                            Código do cupom
                        </p>
                        <p className="display break-all text-3xl tracking-wider">
                            {partner.couponCode}
                        </p>
                    </div>
                )}

                {partner?.redemptionInstructions && (
                    <div className="mb-6">
                        <p className="mb-2 text-xs uppercase tracking-widest text-ink/50">
                            Como usar
                        </p>
                        <p className="whitespace-pre-line break-words text-ink/80">
                            {partner.redemptionInstructions}
                        </p>
                    </div>
                )}

                {partner?.websiteUrl && (
                    <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm text-cream-50 transition-colors hover:bg-forest/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                    >
                        Acessar site do parceiro
                        <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                )}
            </div>
        </dialog>
    )
}
