type PartnerSort = 'featured' | 'discount' | 'name'

export function setupPartnersFilter() {
  const DEFAULT_SORT: PartnerSort = 'featured'
  const state: {
    query: string
    category: string
    sort: PartnerSort
  } = {
    query: '',
    category: 'all',
    sort: DEFAULT_SORT,
  }

  const searchInput =
    document.querySelector<HTMLInputElement>('#partners-search')

  const sortSelect =
    document.querySelector<HTMLSelectElement>('#partners-sort')

  const grid =
    document.querySelector<HTMLElement>('[data-partners-grid]')

  const resultCount =
    document.querySelector<HTMLElement>('[data-partners-result-count]')

  const clearButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-partners-clear]'),
  )

  const emptyState =
    document.querySelector<HTMLElement>('[data-partners-empty]')

  const categoryButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-category-filter]'),
  )

  const cards = grid
    ? Array.from(
        grid.querySelectorAll<HTMLElement>('[data-partner-card]'),
      )
    : []

  function normalize(value: unknown) {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase('pt-BR')
      .trim()
  }

  function parseDiscount(value: string | undefined) {
    const match = String(value ?? '').match(/\d+/)
    return match ? Number(match[0]) : 0
  }

  function hasActiveFilters() {
    return Boolean(state.query) || state.category !== 'all' || state.sort !== DEFAULT_SORT
  }

  function updateCategoryButtons() {
    categoryButtons.forEach((button) => {
      const isActive = button.dataset.categoryFilter === state.category
      button.setAttribute('aria-pressed', String(isActive))
      button.classList.toggle('border-ink', isActive)
      button.classList.toggle('bg-ink', isActive)
      button.classList.toggle('text-cream-50', isActive)
      button.classList.toggle('border-ink/15', !isActive)
      button.classList.toggle('bg-transparent', !isActive)
      button.classList.toggle('text-ink', !isActive)
    })
  }

  function updatePartners() {
    if (!grid || !resultCount || !emptyState) return

    let filtered = [...cards]
    const normalizedQuery = normalize(state.query)

    if (normalizedQuery) {
      filtered = filtered.filter((card) => {
        const searchable = normalize([
          card.dataset.name,
          card.dataset.categoryName,
          card.dataset.description,
          card.dataset.discount,
        ].join(' '))

        return searchable.includes(normalizedQuery)
      })
    }

    if (state.category !== 'all') {
      filtered = filtered.filter(
        (card) => card.dataset.categoryId === state.category,
      )
    }

    filtered.sort((a, b) => {
      if (state.sort === 'name') {
        return (a.dataset.name ?? '').localeCompare(b.dataset.name ?? '', 'pt-BR')
      }

      if (state.sort === 'discount') {
        return parseDiscount(b.dataset.discount) - parseDiscount(a.dataset.discount) ||
          (a.dataset.name ?? '').localeCompare(b.dataset.name ?? '', 'pt-BR')
      }

      if (a.dataset.featured !== b.dataset.featured) {
        return a.dataset.featured === 'true' ? -1 : 1
      }

      return (a.dataset.name ?? '').localeCompare(b.dataset.name ?? '', 'pt-BR')
    })

    cards.forEach((card) => {
      card.hidden = true
    })

    filtered.forEach((card) => {
      card.hidden = false
      grid.append(card)
    })

    const countLabel = filtered.length === 1 ? 'parceiro encontrado' : 'parceiros encontrados'
    resultCount.textContent = `${filtered.length} ${countLabel}`
    grid.hidden = filtered.length === 0
    emptyState.hidden = filtered.length !== 0
    clearButtons.forEach((button) => {
      button.hidden = !hasActiveFilters()
    })
    updateCategoryButtons()
  }

  if (searchInput && sortSelect && grid && cards.length > 0) {
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value
      updatePartners()
    })

    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value as PartnerSort
      updatePartners()
    })

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        state.category = button.dataset.categoryFilter ?? 'all'
        updatePartners()
      })
    })

    clearButtons.forEach((button) => {
      button.addEventListener('click', () => {
        state.query = ''
        state.category = 'all'
        state.sort = DEFAULT_SORT
        searchInput.value = ''
        sortSelect.value = DEFAULT_SORT
        updatePartners()
        searchInput.focus()
      })
    })

    updatePartners()
  }
}
