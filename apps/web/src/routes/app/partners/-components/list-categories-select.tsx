import { Select } from '#/components/ui/select'
import { useListCategories } from '#/hooks/use-list-categories'

type ListCategoriesSelectProps = {
    value: string
    onValueChange: (value: string) => void
    disabled?: boolean
}

export function ListCategoriesSelect({
    value,
    onValueChange,
    disabled,
}: ListCategoriesSelectProps) {
    const { data } = useListCategories()
    const isEmpty = data.categories.length === 0

    return (
        <Select
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            disabled={disabled || isEmpty}
        >
            <option value="">
                {isEmpty
                    ? 'Nenhuma categoria cadastrada'
                    : 'Selecione uma categoria'}
            </option>

            {data.categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </Select>
    )
}
