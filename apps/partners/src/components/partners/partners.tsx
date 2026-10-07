import { useMemo, useRef, useState } from 'react'
import type { PartnerCategoryFilter, PublicPartner } from '../../types/partner'
import PartnerCard from './partner-card'
import PartnerDialog from './partner-dialog'
import PartnersFilters from './partners-filters'

export type PartnerSort = 'featured' | 'discount' | 'name'

interface Props {
  partners: PublicPartner[]
}

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

function sortPartners(partners: PublicPartner[], sort: PartnerSort) {
  return [...partners].sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name, 'pt-BR')
    }

    if (sort === 'discount') {
      return parseDiscount(b.discount) - parseDiscount(a.discount) ||
        a.name.localeCompare(b.name, 'pt-BR')
    }

    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1
    }

    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

export default function Partners({ partners }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<PartnerSort>('featured')
  const [selectedPartner, setSelectedPartner] = useState<PublicPartner | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => {
    const categoryMap = new Map<string, PartnerCategoryFilter>()

    partners.forEach((partner) => {
      const key = partner.category.id
      const existing = categoryMap.get(key)

      categoryMap.set(key, {
        key,
        name: partner.category.name,
        count: (existing?.count ?? 0) + 1,
      })
    })

    return Array.from(categoryMap.values())
  }, [partners])

  const filteredPartners = useMemo(() => {
    const normalizedQuery = normalize(query)
    let result = partners

    if (normalizedQuery) {
      result = result.filter((partner) =>
        normalize([
          partner.name,
          partner.category.name,
          partner.description,
          partner.discount,
        ].join(' ')).includes(normalizedQuery),
      )
    }

    if (category !== 'all') {
      result = result.filter((partner) => partner.category.id === category)
    }

    return sortPartners(result, sort)
  }, [partners, query, category, sort])

  const hasActiveFilters = Boolean(query) || category !== 'all' || sort !== 'featured'

  function clearFilters() {
    setQuery('')
    setCategory('all')
    setSort('featured')
    searchRef.current?.focus()
  }

  return (
    <>
      <PartnersFilters
        query={query}
        category={category}
        sort={sort}
        categories={categories}
        resultCount={filteredPartners.length}
        hasActiveFilters={hasActiveFilters}
        searchRef={searchRef}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onClear={clearFilters}
      />

      {filteredPartners.length === 0 ? (
        <div className="mb-5 rounded-3xl border border-dashed border-ink/10 px-6 py-16 text-center">
          <p className="display-italic mb-2 text-3xl text-ink/40">Nada encontrado</p>
          <p className="text-ink/60">Tente ajustar os filtros ou buscar com outras palavras.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 text-sm text-coral hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onOpen={() => setSelectedPartner(partner)}
            />
          ))}
        </div>
      )}

      <PartnerDialog partner={selectedPartner} onClose={() => setSelectedPartner(null)} />
    </>
  )
}
