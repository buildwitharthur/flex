import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '#/components/ui/sonner'
import { NuqsIntegration } from '#/integrations/nuqs'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <NuqsIntegration>
      <Outlet />
      <Toaster />
    </NuqsIntegration>
  )
}
