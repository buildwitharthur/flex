import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/contacts/')({
    component: ContactsPage,
})

function ContactsPage() {
    return <h1 className="t-page">Todos os contatos</h1>
}
