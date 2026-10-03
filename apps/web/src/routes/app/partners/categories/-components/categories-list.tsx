import { useListCategories } from '#/hooks/use-list-categories'
import { CategoryData } from './category-data'

export function CategoriesList() {
    const { data } = useListCategories()

    return <CategoryData categories={data.categories} />
}
