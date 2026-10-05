import { Search, X } from 'lucide-react'
import { useQueryState } from 'nuqs'

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
                onChange={(event) => setSearch(event.target.value)}
            />
            {search !== '' ? (
                <Button
                    type="button"
                    variant="ghost"
                    aria-label="Limpar busca"
                    className="absolute top-1/2 right-0.5 size-7 min-w-0 -translate-y-1/2 p-0"
                    onClick={() => setSearch('')}
                >
                    <X aria-hidden="true" className="size-4" />
                </Button>
            ) : null}
        </div>
    )
}
