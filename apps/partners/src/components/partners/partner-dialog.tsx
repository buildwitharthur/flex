import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { MouseEvent } from 'react'
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

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom

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
          <p className="mb-5 pr-10 text-xs uppercase leading-4 tracking-[0.1em] text-ink/40">
            {partner.category.name}
          </p>
        )}
        <h2
          id="partner-dialog-title"
          className="display break-words pr-5 text-3xl leading-[1.1] sm:text-4xl"
        >
          {partner?.name}
        </h2>
        {partner?.discount && (
          <p className="display-italic mt-1 break-words text-3xl leading-9 text-coral">
            {partner.discount}
          </p>
        )}

        {Boolean(description.trim()) && (
          <div className="mt-6 text-base leading-[26px] text-ink/70">
            {descriptionLabel && <p className="mb-7">{descriptionLabel}</p>}
            <p className="whitespace-pre-line break-words">{descriptionText}</p>
          </div>
        )}
      </div>
    </dialog>
  )
}
