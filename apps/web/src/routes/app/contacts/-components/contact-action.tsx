import { Ellipsis, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { DeleteContactAlert } from './delete-contact-alert'

type ContactActionProps = {
    contact: Contact
}

export function ContactAction({ contact }: ContactActionProps) {
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 min-w-8 data-[state=open]:bg-surface-muted"
                        aria-label={`Ações de ${contact.name}`}
                    >
                        <Ellipsis aria-hidden="true" className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        destructive
                        onSelect={() => setDeleteOpen(true)}
                    >
                        <Trash2 aria-hidden="true" />
                        Excluir contato
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteContactAlert
                contactId={contact.id}
                contactName={contact.name}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    )
}
