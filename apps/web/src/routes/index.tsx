import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="p-6">
      <h1>Flex Admin</h1>
    </main>
  )
}
