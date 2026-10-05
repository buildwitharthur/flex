import { useMutation } from '@tanstack/react-query'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import { exportContacts } from '#/http/export-contacts'

export function ExportContactsButton() {
    const mutation = useMutation({
        mutationFn: exportContacts,
        onSuccess: (blob) => {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.download = 'contatos.csv'
            document.body.appendChild(link)
            link.click()
            link.remove()

            URL.revokeObjectURL(url)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return (
        <Button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
        >
            <Download />
            {mutation.isPending ? 'Exportando...' : 'Exportar CSV'}
        </Button>
    )
}
