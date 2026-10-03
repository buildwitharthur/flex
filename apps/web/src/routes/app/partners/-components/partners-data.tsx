type PartnersDataProps = {
    partners: Partner[]
}

export function PartnersData({ partners }: PartnersDataProps) {
    return <div data-partners-count={partners.length}>PartnersData</div>
}
