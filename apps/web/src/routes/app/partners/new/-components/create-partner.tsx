import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { createPartner } from '#/http/create-partner'
import {
    PartnerForm,
    type PartnerFormData,
} from '#/routes/app/partners/-components/partner-form'

export function CreatePartner() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: createPartner,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['partners'] })
            await queryClient.invalidateQueries({ queryKey: ['categories'] })
            await navigate({ to: '/app/partners' })
            toast.success('Parceiro criado')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    function handleCreatePartner(data: PartnerFormData) {
        mutation.mutate({
            name: data.name,
            categoryId: data.categoryId,
            discount: data.discount,
            description: data.description,
            shortDescription: data.shortDescription || undefined,
            address: data.address || undefined,
            phone: data.phone || undefined,
            whatsapp: data.whatsapp || undefined,
            websiteUrl: data.websiteUrl || undefined,
            couponCode: data.couponCode || undefined,
            redemptionInstructions: data.redemptionInstructions || undefined,
            logoUrl: data.logoUrl || undefined,
            isActive: data.isActive,
            isFeatured: data.isFeatured,
        })
    }

    function handleCancel() {
        void navigate({ to: '/app/partners' })
    }

    return (
        <PartnerForm
            onSubmit={handleCreatePartner}
            onCancel={handleCancel}
            isPending={mutation.isPending}
        />
    )
}
