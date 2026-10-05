import { Search, X } from 'lucide-react'
import { debounce, defaultRateLimit, useQueryState } from 'nuqs'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

const LABEL = 'Buscar por nome, empresa, telefone ou email'

export function ContactsSearch() {
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
                aria-label={LABEL}
                placeholder={LABEL}
                autoComplete="off"
                className="pr-9 pl-9 [&::-webkit-search-cancel-button]:appearance-none"
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
