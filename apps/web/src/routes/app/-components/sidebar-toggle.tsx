import { PanelLeft } from 'lucide-react'

import { Button } from '../../../components/ui/button'

type SidebarToggleProps = {
    collapsed: boolean
    onToggle: () => void
}

export function SidebarToggle({ collapsed, onToggle }: SidebarToggleProps) {
    return (
        <Button
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
            className="size-8 min-w-8 p-0"
            size="icon"
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
            variant="ghost"
            onClick={onToggle}
        >
            <PanelLeft
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.8}
            />
        </Button>
    )
}
