import { Contact, Store, type LucideIcon } from 'lucide-react'

export type AppRoutePath =
    | '/app/partners/overview'
    | '/app/partners'
    | '/app/partners/categories'
    | '/app/contacts/pipeline'
    | '/app/contacts'

export type AppNavigationChild = {
    label: string
    to: AppRoutePath
}

export type AppNavigationModule = {
    label: string
    icon: LucideIcon
    children: AppNavigationChild[]
}

export const appNavigation: AppNavigationModule[] = [
    {
        label: 'Parceiros',
        icon: Store,
        children: [
            { label: 'Visão geral', to: '/app/partners/overview' },
            { label: 'Parceiros', to: '/app/partners' },
            { label: 'Categorias', to: '/app/partners/categories' },
        ],
    },
    {
        label: 'Contatos',
        icon: Contact,
        children: [
            { label: 'Pipeline', to: '/app/contacts/pipeline' },
            { label: 'Todos os contatos', to: '/app/contacts' },
        ],
    },
]
