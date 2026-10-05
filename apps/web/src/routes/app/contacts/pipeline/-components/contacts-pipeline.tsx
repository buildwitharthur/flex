import {
    DndContext,
    DragOverlay,
    PointerSensor,
    pointerWithin,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '#/components/ui/alert-dialog'
import { useListContacts } from '#/hooks/use-list-contacts'
import { updateContact } from '#/http/update-contact'
import { PipelineCard } from './pipeline-card'
import { PipelineColumn } from './pipeline-column'

const PIPELINE_VISIBLE_LIMIT = 15

type ContactsQueryData = { contacts: Contact[] }
type UpdateStageInput = { id: string; stage: ContactStage }
type TerminalStage = Extract<ContactStage, 'COMPLETED' | 'LOST'>
type PendingTerminalChange = { contact: Contact; stage: TerminalStage }

const TERMINAL_COPY: Record<
    TerminalStage,
    { title: string; description: string; action: string }
> = {
    COMPLETED: {
        title: 'Finalizar contato?',
        description:
            'O contato será removido do Pipeline e marcado como concluído.',
        action: 'Finalizar contato',
    },
    LOST: {
        title: 'Marcar como perdido?',
        description:
            'O contato será removido do Pipeline e marcado como perdido.',
        action: 'Marcar como perdido',
    },
}

function isPipelineStage(value: unknown): value is ContactStage {
    return value === 'NEW' || value === 'CONTACTED' || value === 'NEGOTIATION'
}

function byOldestFirst(a: Contact, b: Contact) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
}

export function ContactsPipeline() {
    const { data } = useListContacts()
    const queryClient = useQueryClient()
    const [activeContactId, setActiveContactId] = useState<string | null>(null)
    const [pendingChange, setPendingChange] =
        useState<PendingTerminalChange | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    )

    const stageMutation = useMutation({
        mutationFn: ({ id, stage }: UpdateStageInput) =>
            updateContact({ id, stage }),
        onMutate: async ({ id, stage }) => {
            await queryClient.cancelQueries({ queryKey: ['contacts'] })

            const previousData = queryClient.getQueryData<ContactsQueryData>([
                'contacts',
            ])

            queryClient.setQueryData<ContactsQueryData>(
                ['contacts'],
                (old) =>
                    old && {
                        ...old,
                        contacts: old.contacts.map((contact) =>
                            contact.id === id ? { ...contact, stage } : contact,
                        ),
                    },
            )

            return { previousData }
        },
        onError: (error, _input, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(['contacts'], context.previousData)
            }
            toast.error(error.message)
        },
        onSuccess: ({ contact }) => {
            queryClient.setQueryData<ContactsQueryData>(
                ['contacts'],
                (current) =>
                    current && {
                        ...current,
                        contacts: current.contacts.map((item) =>
                            item.id === contact.id ? contact : item,
                        ),
                    },
            )
        },
    })

    const activeContact = data.contacts.find(
        (contact) => contact.id === activeContactId,
    )

    function handleDragStart(event: DragStartEvent) {
        const contactId = event.active.data.current?.contactId

        if (typeof contactId !== 'string') return

        stageMutation.reset()
        setActiveContactId(contactId)
    }

    function handleStageChange(id: string, stage: ContactStage) {
        stageMutation.mutate({ id, stage })
    }

    function handleCardStageChange(contact: Contact, stage: ContactStage) {
        if (stage === 'COMPLETED' || stage === 'LOST') {
            setPendingChange({ contact, stage })
            return
        }

        handleStageChange(contact.id, stage)
    }

    function handleDragCancel() {
        setActiveContactId(null)
    }

    function handleDragEnd(event: DragEndEvent) {
        const contactId = event.active.data.current?.contactId
        const sourceStage = event.active.data.current?.stage
        const targetStage = event.over?.data.current?.stage

        setActiveContactId(null)

        if (typeof contactId !== 'string') return
        if (!isPipelineStage(sourceStage) || !isPipelineStage(targetStage)) {
            return
        }
        if (sourceStage === targetStage) return

        handleStageChange(contactId, targetStage)
    }

    // filter() cria novos arrays, então o sort não muta o cache.
    const newContacts = data.contacts
        .filter((contact) => contact.stage === 'NEW')
        .sort(byOldestFirst)
    const contactedContacts = data.contacts
        .filter((contact) => contact.stage === 'CONTACTED')
        .sort(byOldestFirst)
    const negotiationContacts = data.contacts
        .filter((contact) => contact.stage === 'NEGOTIATION')
        .sort(byOldestFirst)

    const newTotal = newContacts.length
    const contactedTotal = contactedContacts.length
    const negotiationTotal = negotiationContacts.length

    const visibleNewContacts = newContacts.slice(0, PIPELINE_VISIBLE_LIMIT)
    const visibleContactedContacts = contactedContacts.slice(
        0,
        PIPELINE_VISIBLE_LIMIT,
    )
    const visibleNegotiationContacts = negotiationContacts.slice(
        0,
        PIPELINE_VISIBLE_LIMIT,
    )

    const newColumn = {
        stage: 'NEW' as const,
        title: 'Novo',
        contacts: visibleNewContacts,
        total: newTotal,
    }

    const contactedColumn = {
        stage: 'CONTACTED' as const,
        title: 'Em contato',
        contacts: visibleContactedContacts,
        total: contactedTotal,
    }

    const negotiationColumn = {
        stage: 'NEGOTIATION' as const,
        title: 'Negociação',
        contacts: visibleNegotiationContacts,
        total: negotiationTotal,
    }

    const dragDisabled = stageMutation.isPending

    return (
        <div className="flex flex-col gap-3">
            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                onDragEnd={handleDragEnd}
            >
                <div className="flex items-start gap-3 overflow-x-auto pb-2">
                    {[newColumn, contactedColumn, negotiationColumn].map(
                        (column) => (
                            <PipelineColumn
                                key={column.stage}
                                stage={column.stage}
                                title={column.title}
                                contacts={column.contacts}
                                total={column.total}
                                dragDisabled={dragDisabled}
                                onStageChange={handleCardStageChange}
                            />
                        ),
                    )}
                </div>

                <DragOverlay dropAnimation={null}>
                    {activeContact ? (
                        <PipelineCard contact={activeContact} overlay />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <AlertDialog
                open={pendingChange !== null}
                onOpenChange={(open) => {
                    if (!open) setPendingChange(null)
                }}
            >
                <AlertDialogContent size="confirmation">
                    {pendingChange ? (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {TERMINAL_COPY[pendingChange.stage].title}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {
                                        TERMINAL_COPY[pendingChange.stage]
                                            .description
                                    }
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel type="button">
                                    Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    type="button"
                                    variant={
                                        pendingChange.stage === 'LOST'
                                            ? 'destructive'
                                            : undefined
                                    }
                                    disabled={stageMutation.isPending}
                                    onClick={() =>
                                        handleStageChange(
                                            pendingChange.contact.id,
                                            pendingChange.stage,
                                        )
                                    }
                                >
                                    {TERMINAL_COPY[pendingChange.stage].action}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    ) : null}
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
