export function setupPartnerDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('#partner-dialog')
  if (!dialog) return

  const name = dialog.querySelector<HTMLElement>('[data-partner-dialog-name]')
  const category = dialog.querySelector<HTMLElement>('[data-partner-dialog-category]')
  const discount = dialog.querySelector<HTMLElement>('[data-partner-dialog-discount]')
  const descriptionBlock = dialog.querySelector<HTMLElement>('[data-partner-dialog-description-block]')
  const descriptionLabel = dialog.querySelector<HTMLElement>('[data-partner-dialog-description-label]')
  const description = dialog.querySelector<HTMLElement>('[data-partner-dialog-description]')

  if (!name || !category || !discount || !descriptionBlock || !descriptionLabel || !description) return

  document.querySelectorAll<HTMLButtonElement>('[data-partner-dialog-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest<HTMLElement>('[data-partner-card]')
      if (!card) return

      name.textContent = card.dataset.name ?? ''
      category.textContent = card.dataset.categoryName ?? ''
      category.hidden = !category.textContent
      discount.textContent = card.dataset.discount ?? ''
      discount.hidden = !discount.textContent

      const text = card.dataset.description ?? ''
      // Preserve the existing description label and its spacing in the supplied UI.
      const specialties = text.match(/^(Especialidades:)\s*([\s\S]*)$/i)
      descriptionLabel.textContent = specialties?.[1] ?? ''
      descriptionLabel.hidden = !specialties
      description.textContent = specialties?.[2] ?? text
      descriptionBlock.hidden = !text.trim()

      if (!dialog.open) dialog.showModal()
      dialog.scrollTop = 0
    })
  })

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return

    const bounds = dialog.getBoundingClientRect()
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom

    if (outside) dialog.close()
  })
}
