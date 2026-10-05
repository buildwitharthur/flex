import { useQuery } from '@tanstack/react-query'

import { getProfile } from '#/http/get-profile'

// undefined: carregando | null: não autenticado | objeto: usuário da sessão
export function useSession() {
    const { data, error } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    })

    if (error) {
        return null
    }

    return data ? data.user || null : undefined
}
