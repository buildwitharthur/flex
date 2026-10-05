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

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { useListContacts } from '#/hooks/use-list-contacts'
import { updateContact } from '#/http/update-contact'
import { PipelineCard } from './pipeline-card'
import { PipelineColumn } from './pipeline-column'

const PIPELINE_VISIBLE_LIMIT = 15

type ContactsQueryData = { contacts: Contact[] }
type UpdateStageInput = { id: string; stage: ContactStage }

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
        onError: (_error, _input, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(['contacts'], context.previousData)
            }
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

        stageMutation.mutate({ id: contactId, stage: targetStage })
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
            {stageMutation.isError ? (
                <Alert variant="danger">
                    <AlertTitle>Não foi possível mover o contato</AlertTitle>
                    <AlertDescription>
                        {stageMutation.error.message}
                    </AlertDescription>
                </Alert>
            ) : null}

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
        </div>
    )
}
