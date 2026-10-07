import { ArrowRight } from 'lucide-react'
import type { PublicPartner } from '../../types/partner'

interface Props {
  partner: PublicPartner
  onOpen: () => void
}

export default function PartnerCard({ partner, onOpen }: Props) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-ink/5 bg-cream-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_18px_50px_rgba(20,20,20,0.06)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
            {partner.category.name}
          </span>
        </div>

        {partner.isFeatured && (
          <span className="display-italic whitespace-nowrap text-sm text-coral">
            ★ destaque
          </span>
        )}
      </div>

      <h3 className="display mb-2 text-2xl text-ink transition-colors group-hover:text-coral">
        {partner.name}
      </h3>

      {partner.description && (
        <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/60">
          {partner.description}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-ink/10 pt-4">
        <span className="display text-3xl text-coral">{partner.discount}</span>

        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-controls="partner-dialog"
          aria-label={`Ver detalhes de ${partner.name}`}
          className="flex items-center gap-1 text-xs uppercase tracking-wider text-ink/40 transition-colors group-hover:text-coral"
        >
          ver mais
          <ArrowRight size={12} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
