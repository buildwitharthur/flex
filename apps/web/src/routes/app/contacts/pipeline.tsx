import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/contacts/pipeline')({
    component: ContactsPipelinePage,
})

function ContactsPipelinePage() {
    return <h1 className="t-page">Pipeline</h1>
}
