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
        onSuccess: async ({ partner: updatedPartner }) => {
            queryClient.setQueryData(['partner', updatedPartner.id], {
                partner: updatedPartner,
            })
            queryClient.setQueryData<{ partners: Partner[] }>(
                ['partners'],
                (current) =>
                    current && {
                        ...current,
                        partners: current.partners
                            .map((currentPartner) =>
                                currentPartner.id === updatedPartner.id
                                    ? updatedPartner
                                    : currentPartner,
                            )
                            .sort((a, b) =>
                                a.name.localeCompare(b.name, 'pt-BR'),
                            ),
                    },
            )

            if (partner.categoryId !== updatedPartner.categoryId) {
                queryClient.setQueryData<{ categories: Category[] }>(
                    ['categories'],
                    (current) =>
                        current && {
                            ...current,
                            categories: current.categories.map((category) => {
                                if (category.id === partner.categoryId) {
                                    return {
                                        ...category,
                                        partnersCount: category.partnersCount - 1,
                                    }
                                }

                                if (category.id === updatedPartner.categoryId) {
                                    return {
                                        ...category,
                                        partnersCount: category.partnersCount + 1,
                                    }
                                }

                                return category
                            }),
                        },
                )
            }

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
