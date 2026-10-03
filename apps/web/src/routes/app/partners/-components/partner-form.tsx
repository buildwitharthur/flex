import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { FieldError, FieldHelper, Label } from '#/components/ui/label'
import { Skeleton } from '#/components/ui/skeleton'
import { Switch } from '#/components/ui/switch'
import { Textarea } from '#/components/ui/textarea'
import { ListCategoriesSelect } from './list-categories-select'

const SHORT_DESCRIPTION_MAX_LENGTH = 160

function requiredText(message: string) {
    return z.string().refine((value) => value.trim().length > 0, { message })
}

const partnerFormSchema = z.object({
    name: requiredText('Informe o nome do parceiro'),
    categoryId: z.string().min(1, 'Selecione uma categoria'),
    discount: requiredText('Informe o desconto'),
    shortDescription: z
        .string()
        .max(
            SHORT_DESCRIPTION_MAX_LENGTH,
            `A descrição curta deve ter no máximo ${SHORT_DESCRIPTION_MAX_LENGTH} caracteres`,
        ),
    description: requiredText('Informe a descrição do parceiro'),
    address: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    websiteUrl: z.string(),
    couponCode: z.string(),
    redemptionInstructions: z.string(),
    logoUrl: z.string(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
})

export type PartnerFormData = z.infer<typeof partnerFormSchema>

type PartnerFormProps = {
    partner?: Partner
    onSubmit: (data: PartnerFormData) => void
    onCancel?: () => void
    isPending?: boolean
    errorMessage?: string
}

function getDefaultValues(partner?: Partner): PartnerFormData {
    return {
        name: partner?.name ?? '',
        categoryId: partner?.categoryId ?? '',
        discount: partner?.discount ?? '',
        shortDescription: partner?.shortDescription ?? '',
        description: partner?.description ?? '',
        address: partner?.address ?? '',
        phone: partner?.phone ?? '',
        whatsapp: partner?.whatsapp ?? '',
        websiteUrl: partner?.websiteUrl ?? '',
        couponCode: partner?.couponCode ?? '',
        redemptionInstructions: partner?.redemptionInstructions ?? '',
        logoUrl: partner?.logoUrl ?? '',
        isActive: partner?.isActive ?? true,
        isFeatured: partner?.isFeatured ?? false,
    }
}

export function PartnerForm({
    partner,
    onSubmit,
    onCancel,
    isPending = false,
    errorMessage,
}: PartnerFormProps) {
    const isEditing = Boolean(partner)
    const { control, handleSubmit, reset } = useForm<PartnerFormData>({
        resolver: zodResolver(partnerFormSchema),
        defaultValues: getDefaultValues(partner),
    })
    const shortDescription = useWatch({ control, name: 'shortDescription' })

    useEffect(() => {
        reset(getDefaultValues(partner))
    }, [partner, reset])

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-8"
        >
            <section className="grid gap-5">
                <div className="grid gap-1">
                    <h2 className="text-base font-semibold text-foreground">
                        Informações principais
                    </h2>
                    <p className="text-[13px] text-muted-foreground">
                        Campos com * são obrigatórios.
                    </p>
                </div>

                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-name" required>
                                Nome do parceiro
                            </Label>
                            <Input
                                {...field}
                                id="partner-name"
                                placeholder="Ex: Centro Clínico Master"
                                disabled={isPending}
                                aria-invalid={
                                    fieldState.error ? 'true' : undefined
                                }
                            />
                            {fieldState.error?.message ? (
                                <FieldError>
                                    {fieldState.error.message}
                                </FieldError>
                            ) : null}
                        </div>
                    )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field, fieldState }) => (
                            <div className="grid content-start gap-1.5">
                                <Label htmlFor="partner-category" required>
                                    Categoria
                                </Label>
                                <Suspense
                                    fallback={
                                        <div>Carregando categorias...</div>
                                    }
                                >
                                    <ListCategoriesSelect
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isPending}
                                    />
                                </Suspense>
                                {fieldState.error?.message ? (
                                    <FieldError>
                                        {fieldState.error.message}
                                    </FieldError>
                                ) : null}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="discount"
                        render={({ field, fieldState }) => (
                            <div className="grid content-start gap-1.5">
                                <Label htmlFor="partner-discount" required>
                                    Desconto
                                </Label>
                                <Input
                                    {...field}
                                    id="partner-discount"
                                    placeholder="Ex: 30% OFF ou Até 50% OFF"
                                    disabled={isPending}
                                    aria-invalid={
                                        fieldState.error ? 'true' : undefined
                                    }
                                />
                                {fieldState.error?.message ? (
                                    <FieldError>
                                        {fieldState.error.message}
                                    </FieldError>
                                ) : null}
                            </div>
                        )}
                    />
                </div>

                <Controller
                    control={control}
                    name="shortDescription"
                    render={({ field, fieldState }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-short-description">
                                Descrição curta
                            </Label>
                            <Input
                                {...field}
                                id="partner-short-description"
                                placeholder="Ex: Várias especialidades"
                                disabled={isPending}
                                aria-invalid={
                                    fieldState.error ? 'true' : undefined
                                }
                            />
                            <div className="flex items-start justify-between gap-4">
                                {fieldState.error?.message ? (
                                    <FieldError>
                                        {fieldState.error.message}
                                    </FieldError>
                                ) : (
                                    <FieldHelper>
                                        Um resumo curto para exibição nos cards
                                        do catálogo.
                                    </FieldHelper>
                                )}
                                <FieldHelper className="shrink-0">
                                    {shortDescription.length}/
                                    {SHORT_DESCRIPTION_MAX_LENGTH}
                                </FieldHelper>
                            </div>
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-description" required>
                                Descrição
                            </Label>
                            <Textarea
                                {...field}
                                id="partner-description"
                                placeholder="Descreva os serviços e benefícios oferecidos pelo parceiro"
                                className="min-h-[136px]"
                                disabled={isPending}
                                aria-invalid={
                                    fieldState.error ? 'true' : undefined
                                }
                            />
                            {fieldState.error?.message ? (
                                <FieldError>
                                    {fieldState.error.message}
                                </FieldError>
                            ) : null}
                        </div>
                    )}
                />
            </section>

            <section className="grid gap-5 border-t border-border pt-8">
                <h2 className="text-base font-semibold text-foreground">
                    Contato e localização
                </h2>

                <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-address">Endereço</Label>
                            <Input
                                {...field}
                                id="partner-address"
                                placeholder="Ex: Rua João de Almeida, 109 — Alcântara"
                                disabled={isPending}
                            />
                        </div>
                    )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <div className="grid content-start gap-1.5">
                                <Label htmlFor="partner-phone">Telefone</Label>
                                <Input
                                    {...field}
                                    id="partner-phone"
                                    placeholder="Ex: 2702-9060 / 3100-5137"
                                    disabled={isPending}
                                />
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="whatsapp"
                        render={({ field }) => (
                            <div className="grid content-start gap-1.5">
                                <Label htmlFor="partner-whatsapp">
                                    WhatsApp
                                </Label>
                                <Input
                                    {...field}
                                    id="partner-whatsapp"
                                    placeholder="Ex: (21) 99999-0000"
                                    disabled={isPending}
                                />
                            </div>
                        )}
                    />
                </div>

                <Controller
                    control={control}
                    name="websiteUrl"
                    render={({ field }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-website">
                                Site do parceiro
                            </Label>
                            <Input
                                {...field}
                                id="partner-website"
                                placeholder="https://..."
                                disabled={isPending}
                            />
                        </div>
                    )}
                />
            </section>

            <section className="grid gap-5 border-t border-border pt-8">
                <div className="grid gap-1">
                    <h2 className="text-base font-semibold text-foreground">
                        Benefício
                    </h2>
                    <p className="text-[13px] text-muted-foreground">
                        Como o associado utiliza a vantagem oferecida.
                    </p>
                </div>

                <Controller
                    control={control}
                    name="couponCode"
                    render={({ field }) => (
                        <div className="grid gap-1.5  sm:pr-2.5">
                            <Label htmlFor="partner-coupon">
                                Código do cupom
                            </Label>
                            <Input
                                {...field}
                                id="partner-coupon"
                                placeholder="Ex: CLUBE20"
                                disabled={isPending}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="redemptionInstructions"
                    render={({ field }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-instructions">
                                Instruções de uso
                            </Label>
                            <Textarea
                                {...field}
                                id="partner-instructions"
                                placeholder="Explique como o associado deve apresentar ou aplicar o benefício"
                                disabled={isPending}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="logoUrl"
                    render={({ field }) => (
                        <div className="grid gap-1.5">
                            <Label htmlFor="partner-logo">URL do logo</Label>
                            <Input
                                {...field}
                                id="partner-logo"
                                placeholder="https://..."
                                disabled={isPending}
                            />
                            <FieldHelper>
                                Imagem utilizada para identificar o parceiro no
                                catálogo.
                            </FieldHelper>
                        </div>
                    )}
                />
            </section>

            <section className="grid gap-4 border-t border-border pt-8">
                <h2 className="text-base font-semibold text-foreground">
                    Visibilidade
                </h2>

                <Controller
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3.5">
                            <div className="grid gap-0.5">
                                <span
                                    id="partner-active-label"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Parceiro ativo
                                </span>
                                <span className="text-[13px] text-muted-foreground">
                                    Quando desativado, o parceiro deixa de
                                    aparecer no catálogo.
                                </span>
                            </div>
                            <Switch
                                aria-labelledby="partner-active-label"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isPending}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="isFeatured"
                    render={({ field }) => (
                        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3.5">
                            <div className="grid gap-0.5">
                                <span
                                    id="partner-featured-label"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Em destaque
                                </span>
                                <span className="text-[13px] text-muted-foreground">
                                    Exibe o parceiro com maior destaque no
                                    catálogo.
                                </span>
                            </div>
                            <Switch
                                aria-labelledby="partner-featured-label"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isPending}
                            />
                        </div>
                    )}
                />
            </section>

            {errorMessage ? (
                <Alert variant="danger">
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            ) : null}

            <div className="flex justify-end gap-3 border-t border-border pt-6">
                {onCancel ? (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                ) : null}
                <Button type="submit" loading={isPending} disabled={isPending}>
                    {isPending
                        ? isEditing
                            ? 'Salvando...'
                            : 'Criando...'
                        : isEditing
                          ? 'Salvar alterações'
                          : 'Criar parceiro'}
                </Button>
            </div>
        </form>
    )
}
