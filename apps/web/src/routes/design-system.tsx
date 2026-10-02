import { Plus, Star } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { createFileRoute } from '@tanstack/react-router'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../components/ui/alert'
import { Avatar } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { FieldError, FieldHelper, Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Select } from '../components/ui/select'
import { Skeleton } from '../components/ui/skeleton'
import { Switch } from '../components/ui/switch'
import { Textarea } from '../components/ui/textarea'

export const Route = createFileRoute('/design-system')({
  component: DesignSystemShowcase,
})

function ShowcaseSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-4 border-t border-border pt-8">
      <h2 className="t-section">{title}</h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

function DesignSystemShowcase() {
  const [checkboxState, setCheckboxState] = useState<CheckedState>('indeterminate')
  const [role, setRole] = useState('staff')
  const [active, setActive] = useState(false)
  const [featured, setFeatured] = useState(true)

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto grid max-w-[960px] gap-10">
        <header className="grid gap-1">
          <h1 className="t-page">Design System</h1>
          <p className="t-body muted">Primitives básicos</p>
        </header>

        <ShowcaseSection title="Button">
          <Button size="sm">Small</Button>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="ghost" aria-label="Adicionar">
            <Plus />
          </Button>
          <Button disabled>Disabled</Button>
          <Button loading>Salvando...</Button>
        </ShowcaseSection>

        <ShowcaseSection title="Input">
          <div className="grid w-full max-w-[420px] gap-2">
            <Input defaultValue="Preenchido" />
            <Input size="sm" placeholder="Small" />
            <Input size="lg" placeholder="Large" />
            <Input defaultValue="Somente leitura" readOnly />
            <Input defaultValue="Inválido" aria-invalid="true" />
            <Input placeholder="Desabilitado" disabled />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Label">
          <div className="grid w-full max-w-[420px] gap-3">
            <Label htmlFor="showcase-name">Nome</Label>
            <Label htmlFor="showcase-required" required>
              Nome do parceiro
            </Label>
            <Label htmlFor="showcase-logo" optional>
              Logo
            </Label>
            <FieldHelper>Texto auxiliar do campo.</FieldHelper>
            <FieldError>Informe o nome do parceiro.</FieldError>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Textarea">
          <div className="grid w-full max-w-[420px] gap-3">
            <Textarea placeholder="Descrição" />
            <Textarea size="compact" placeholder="Observação compacta" />
            <Textarea placeholder="Desabilitado" disabled />
            <Textarea defaultValue="Inválido" aria-invalid="true" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Select">
          <div className="grid w-full max-w-[420px] gap-3">
            <Select defaultValue="">
              <option value="">Selecione uma categoria</option>
              <option value="health">Saúde</option>
              <option value="food">Alimentação</option>
            </Select>
            <Select defaultValue="health">
              <option value="health">Saúde</option>
              <option value="food">Alimentação</option>
            </Select>
            <Select size="sm" defaultValue="food" aria-label="Categoria compacta">
              <option value="health">Saúde</option>
              <option value="food">Alimentação</option>
            </Select>
            <Select disabled defaultValue="">
              <option value="">Desabilitado</option>
            </Select>
            <Select aria-invalid="true" defaultValue="">
              <option value="">Selecione uma categoria</option>
            </Select>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Checkbox">
          <div className="grid w-full gap-4">
            <div className="flex min-h-6 items-center gap-2 py-0.5">
              <Checkbox
                checked={checkboxState}
                onCheckedChange={setCheckboxState}
                aria-label="Checkbox interativo"
              />
              <Label>Ativo</Label>
              <FieldHelper>Permite exibir este item no catálogo.</FieldHelper>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Checkbox aria-label="Não marcado" />
              <Checkbox defaultChecked aria-label="Marcado" />
              <Checkbox checked="indeterminate" aria-label="Indeterminado" />
              <Checkbox disabled aria-label="Desabilitado não marcado" />
              <Checkbox disabled defaultChecked aria-label="Desabilitado marcado" />
              <Checkbox aria-invalid="true" aria-label="Inválido" />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Radio">
          <RadioGroup
            value={role}
            onValueChange={setRole}
            aria-label="Função"
            className="grid gap-2"
          >
            <div className="flex min-h-6 items-center gap-2 py-0.5">
              <RadioGroupItem value="admin" id="showcase-admin" />
              <Label htmlFor="showcase-admin">Administrador</Label>
            </div>
            <div className="flex min-h-6 items-center gap-2 py-0.5">
              <RadioGroupItem value="staff" id="showcase-staff" />
              <Label htmlFor="showcase-staff">Colaborador</Label>
            </div>
            <div className="flex min-h-6 items-center gap-2 py-0.5">
              <RadioGroupItem disabled value="disabled" id="showcase-disabled" />
              <Label htmlFor="showcase-disabled">Desabilitado</Label>
            </div>
          </RadioGroup>
        </ShowcaseSection>

        <ShowcaseSection title="Switch">
          <div className="grid w-full max-w-[520px] gap-3">
            <div className="flex items-start gap-3">
              <Switch id="showcase-active" checked={active} onCheckedChange={setActive} aria-label="Ativo" />
              <div className="grid gap-0.5">
                <Label htmlFor="showcase-active">Ativo</Label>
                <p className="t-small muted">Quando ativo, o parceiro pode aparecer no catálogo público.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Switch id="showcase-featured" checked={featured} onCheckedChange={setFeatured} aria-label="Em destaque" />
              <div className="grid gap-0.5">
                <Label htmlFor="showcase-featured">Em destaque</Label>
                <p className="t-small muted">Exibe o parceiro em áreas de destaque do catálogo.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Switch disabled aria-label="Desabilitado desligado" />
              <Switch disabled defaultChecked aria-label="Desabilitado ligado" />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Badge">
          <Badge variant="success">Ativo</Badge>
          <Badge variant="neutral">Inativo</Badge>
          <Badge variant="brand" dot={false}>
            <Star />
            Destaque
          </Badge>
          <Badge variant="outline" dot={false}>
            Quero ser Parceiro
          </Badge>
          <Badge variant="stage" tone="new">Novo</Badge>
          <Badge variant="stage" tone="contacted">Em contato</Badge>
          <Badge variant="stage" tone="qualified">Qualificado</Badge>
          <Badge variant="stage" tone="completed">Concluído</Badge>
          <Badge variant="stage" tone="discarded">Descartado</Badge>
          <Badge variant="outline" size="compact" dot={false}>Compacto</Badge>
          <Badge variant="outline" size="counter" dot={false}>3</Badge>
        </ShowcaseSection>

        <ShowcaseSection title="Alert">
          <div className="grid w-full gap-3">
            <Alert variant="info">
              <AlertTitle>Informação</AlertTitle>
              <AlertDescription>Mensagem informativa para o usuário.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Concluído</AlertTitle>
              <AlertDescription>A operação foi realizada com sucesso.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>Confira os dados antes de continuar.</AlertDescription>
            </Alert>
            <Alert variant="danger">
              <AlertTitle>Não foi possível concluir</AlertTitle>
              <AlertDescription>Tente novamente em alguns instantes.</AlertDescription>
            </Alert>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Avatar">
          <Avatar variant="user">AR</Avatar>
          <Avatar variant="partner">CC</Avatar>
          <Avatar variant="responsible">BS</Avatar>
        </ShowcaseSection>

        <ShowcaseSection title="Skeleton">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-[18px] w-2/5" />
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-[22px] w-16 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </ShowcaseSection>
      </div>
    </main>
  )
}
