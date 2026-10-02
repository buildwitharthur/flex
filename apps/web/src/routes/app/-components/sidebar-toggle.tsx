import { PanelLeft } from 'lucide-react'

import { Button } from '../../../components/ui/button'

export function SidebarToggle() {
    return (
        <Button
            aria-label="Recolher menu"
            className="size-8 min-w-6 p-0"
            size="icon"
            title="Recolher menu"
            variant="ghost"
        >
            <PanelLeft
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.8}
            />
        </Button>
    )
}
