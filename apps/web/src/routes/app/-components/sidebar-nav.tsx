import { Contact, Store, type LucideIcon } from 'lucide-react'

import {
    SidebarNavItem,
    type SidebarNavChild,
} from './sidebar-nav-item'

type SidebarModule = {
    label: string
    icon: LucideIcon
    children: SidebarNavChild[]
}

const sidebarModules: SidebarModule[] = [
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

export function SidebarNav() {
    return (
        <nav aria-label="Módulos" className="grid gap-2">
            <span className="px-2 pb-1 font-body text-xs leading-4 font-semibold text-sidebar-muted">
                Módulos
            </span>

            <div className="grid gap-0.5">
                {sidebarModules.map((item) => (
                    <SidebarNavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        children={item.children}
                    />
                ))}
            </div>
        </nav>
    )
}
