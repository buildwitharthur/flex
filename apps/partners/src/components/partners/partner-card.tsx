import { ArrowRight } from 'lucide-react'
import type { PublicPartner } from '../../types/partner'

interface Props {
    partner: PublicPartner
    onOpen: () => void
}

export default function PartnerCard({ partner, onOpen }: Props) {
    const cardDescription =
        partner.shortDescription?.trim() || partner.description.trim()

    return (
        <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-controls="partner-dialog"
            aria-label={`Ver detalhes de ${partner.name}`}
            className="group flex h-[240px] w-full min-w-0 flex-col rounded-3xl border border-ink/5 bg-cream-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-ink/20 hover:bg-cream-50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest gap-2"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    {partner.category.icon && (
                        <span className="text-xl" aria-hidden="true">
                            {partner.category.icon}
                        </span>
                    )}
                    <span className="text-xs uppercase tracking-wider text-ink/50">
                        {partner.category.name}
                    </span>
                </div>

                {partner.isFeatured && (
                    <span className="display-italic whitespace-nowrap text-sm text-coral">
                        ★ destaque
                    </span>
                )}
            </div>

            <h3 className="capitalize display mb-2 line-clamp-2 text-2xl text-ink transition-colors group-hover:text-coral">
                {partner.name}
            </h3>

            {cardDescription && (
                <p className="line-clamp-3 text-sm text-ink/60">
                    {cardDescription}
                </p>
            )}

            <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="display text-3xl text-coral">
                    {partner.discount}
                </span>

                <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-ink/40 transition-colors group-hover:text-coral">
                    ver mais
                    <ArrowRight aria-hidden="true" className="size-3" />
                </span>
            </div>
        </button>
    )
}
