import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { getPartner } from '#/http/get-partner'
import { updatePartner } from '#/http/update-partner'
import {
    PartnerForm,
    type PartnerFormData,
} from '#/routes/app/partners/-components/partner-form'

type EditPartnerProps = {
    partnerId: string
}

export function EditPartner({ partnerId }: EditPartnerProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { data } = useSuspenseQuery({
        queryKey: ['partner', partnerId],
        queryFn: ({ signal }) => getPartner(partnerId, signal),
    })
    const partner = data.partner

    const mutation = useMutation({
        mutationFn: updatePartner,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['partners'] })
            await queryClient.invalidateQueries({
                queryKey: ['partner', partner.id],
            })
            await queryClient.invalidateQueries({ queryKey: ['categories'] })
            await navigate({ to: '/app/partners' })
            toast.success('Parceiro atualizado')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    function handleUpdatePartner(formData: PartnerFormData) {
        mutation.mutate({
            id: partner.id,
            name: formData.name,
            categoryId: formData.categoryId,
            discount: formData.discount,
            description: formData.description,
            shortDescription: formData.shortDescription || null,
            address: formData.address || null,
            phone: formData.phone || null,
            whatsapp: formData.whatsapp || null,
            websiteUrl: formData.websiteUrl || null,
            couponCode: formData.couponCode || null,
            redemptionInstructions: formData.redemptionInstructions || null,
            logoUrl: formData.logoUrl || null,
            isActive: formData.isActive,
            isFeatured: formData.isFeatured,
        })
    }

    function handleCancel() {
        void navigate({ to: '/app/partners' })
    }

    return (
        <PartnerForm
            partner={partner}
            onSubmit={handleUpdatePartner}
            onCancel={handleCancel}
            isPending={mutation.isPending}
        />
    )
    
}
