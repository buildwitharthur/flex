import { Search } from 'lucide-react'
import { debounce, defaultRateLimit, useQueryState } from 'nuqs'

import { Input } from '#/components/ui/input'

export function PartnersSearch() {
    const [search, setSearch] = useQueryState('search', {
        defaultValue: '',
        clearOnDefault: true,
        history: 'replace',
    })

    return (
        <div className="relative w-full max-w-[400px]">
            <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
                type="search"
                aria-label="Buscar parceiros"
                placeholder="Buscar parceiros..."
                className="pl-9"
                value={search}
                onChange={(event) => {
                    const value = event.target.value

                    setSearch(value, {
                        limitUrlUpdates:
                            value === '' ? defaultRateLimit : debounce(400),
                    })
                }}
            />
        </div>
    )
}
