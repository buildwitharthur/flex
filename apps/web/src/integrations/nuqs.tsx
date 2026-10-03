import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import type { PropsWithChildren } from 'react'

export function NuqsIntegration({ children }: PropsWithChildren) {
    return <NuqsAdapter>{children}</NuqsAdapter>
}
