import { ChevronDown, Search } from 'lucide-react'
import type { RefObject } from 'react'
import type { PartnerCategoryFilter } from '../../types/partner'
import type { PartnerSort } from './partners'

interface Props {
  query: string
  category: string
  sort: PartnerSort
  categories: PartnerCategoryFilter[]
  resultCount: number
  hasActiveFilters: boolean
  searchRef: RefObject<HTMLInputElement | null>
  onQueryChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: PartnerSort) => void
  onClear: () => void
}

export default function PartnersFilters({
  query,
  category,
  sort,
  categories,
  resultCount,
  hasActiveFilters,
  searchRef,
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onClear,
}: Props) {
  const allActive = category === 'all'

  return (
    <>
      <div className="mb-6 mt-12 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
          <label className="sr-only" htmlFor="partners-search">Buscar parceiros</label>
          <Search
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink/40"
            size={18}
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            ref={searchRef}
            id="partners-search"
            type="search"
            autoComplete="off"
            placeholder="Buscar por nome, categoria ou desconto..."
            value={query}
            onChange={(event) => onQueryChange(event.currentTarget.value)}
            className="w-full rounded-full border border-ink/10 bg-cream-50 py-4 px-5 pl-12 text-base text-ink placeholder:text-ink/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
          />
        </div>

        <div className="relative min-w-[190px] w-full">
          <label className="sr-only" htmlFor="partners-sort">Ordenar parceiros</label>
          <select
            id="partners-sort"
            value={sort}
            onChange={(event) => onSortChange(event.currentTarget.value as PartnerSort)}
            className="min-w-[190px] w-full appearance-none cursor-pointer rounded-full border border-ink/10 bg-cream-50 py-4 pl-5 pr-10 text-base text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
          >
            <option value="featured">Em destaque</option>
            <option value="discount">Maior desconto</option>
            <option value="name">Ordem alfabética</option>
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink"
          />
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={allActive}
          onClick={() => onCategoryChange('all')}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
            allActive
              ? 'border-ink bg-ink text-cream-50'
              : 'border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-cream-100'
          }`}
        >
          Tudo ({categories.reduce((count, item) => count + item.count, 0)})
        </button>

        {categories.map((item) => {
          const isActive = category === item.key

          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(item.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-ink bg-ink text-cream-50'
                  : 'border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-cream-100'
              }`}
            >
              {item.name} ({item.count})
            </button>
          )
        })}
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/50" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'parceiro encontrado' : 'parceiros encontrados'}
        </p>
        {hasActiveFilters && (
          <button type="button" onClick={onClear} className="text-sm text-coral hover:underline">
            Limpar filtros
          </button>
        )}
      </div>
    </>
  )
}
