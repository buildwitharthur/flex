import {
    Info,
    MoreHorizontal,
    Plus,
    Star,
    Trash2,
    TriangleAlert,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { createFileRoute } from '@tanstack/react-router'

import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Avatar } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../components/ui/breadcrumb'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/card'
import { Chip } from '../components/ui/chip'
import {
    Dialog,
    DialogBody,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogClose,
    DialogIcon,
    DialogTrigger,
} from '../components/ui/dialog'
import {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerSection,
    DrawerTitle,
    DrawerTrigger,
} from '../components/ui/drawer'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { FieldError, FieldHelper, Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import {
    Pagination,
    PaginationButton,
    PaginationContent,
    PaginationInfo,
} from '../components/ui/pagination'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../components/ui/popover'
import { Checkbox } from '../components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import {
    SegmentedControl,
    SegmentedControlItem,
} from '../components/ui/segmented-control'
import { Select } from '../components/ui/select'
import { Skeleton } from '../components/ui/skeleton'
import { Switch } from '../components/ui/switch'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableScroll,
} from '../components/ui/table'
import { Textarea } from '../components/ui/textarea'
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '../components/ui/toast'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../components/ui/tooltip'

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
    const [checkboxState, setCheckboxState] =
        useState<CheckedState>('indeterminate')
    const [role, setRole] = useState('staff')
    const [active, setActive] = useState(false)
    const [featured, setFeatured] = useState(true)
    const [menuRole, setMenuRole] = useState('staff')
    const [segment, setSegment] = useState('table')
    const [page, setPage] = useState(1)
    const [toast, setToast] = useState<'success' | 'danger' | 'info' | null>(
        null,
    )
    const [showChip, setShowChip] = useState(true)

    return (
        <ToastProvider duration={4500}>
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
                        <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Adicionar"
                        >
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
                            <Input
                                defaultValue="Inválido"
                                aria-invalid="true"
                            />
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
                            <Textarea
                                size="compact"
                                placeholder="Observação compacta"
                            />
                            <Textarea placeholder="Desabilitado" disabled />
                            <Textarea
                                defaultValue="Inválido"
                                aria-invalid="true"
                            />
                        </div>
                    </ShowcaseSection>

                    <ShowcaseSection title="Select">
                        <div className="grid w-full max-w-[420px] gap-3">
                            <Select defaultValue="">
                                <option value="">
                                    Selecione uma categoria
                                </option>
                                <option value="health">Saúde</option>
                                <option value="food">Alimentação</option>
                            </Select>
                            <Select defaultValue="health">
                                <option value="health">Saúde</option>
                                <option value="food">Alimentação</option>
                            </Select>
                            <Select
                                size="sm"
                                defaultValue="food"
                                aria-label="Categoria compacta"
                            >
                                <option value="health">Saúde</option>
                                <option value="food">Alimentação</option>
                            </Select>
                            <Select disabled defaultValue="">
                                <option value="">Desabilitado</option>
                            </Select>
                            <Select aria-invalid="true" defaultValue="">
                                <option value="">
                                    Selecione uma categoria
                                </option>
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
                                <FieldHelper>
                                    Permite exibir este item no catálogo.
                                </FieldHelper>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Checkbox aria-label="Não marcado" />
                                <Checkbox defaultChecked aria-label="Marcado" />
                                <Checkbox
                                    checked="indeterminate"
                                    aria-label="Indeterminado"
                                />
                                <Checkbox
                                    disabled
                                    aria-label="Desabilitado não marcado"
                                />
                                <Checkbox
                                    disabled
                                    defaultChecked
                                    aria-label="Desabilitado marcado"
                                />
                                <Checkbox
                                    aria-invalid="true"
                                    aria-label="Inválido"
                                />
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
                                <RadioGroupItem
                                    value="admin"
                                    id="showcase-admin"
                                />
                                <Label htmlFor="showcase-admin">
                                    Administrador
                                </Label>
                            </div>
                            <div className="flex min-h-6 items-center gap-2 py-0.5">
                                <RadioGroupItem
                                    value="staff"
                                    id="showcase-staff"
                                />
                                <Label htmlFor="showcase-staff">
                                    Colaborador
                                </Label>
                            </div>
                            <div className="flex min-h-6 items-center gap-2 py-0.5">
                                <RadioGroupItem
                                    disabled
                                    value="disabled"
                                    id="showcase-disabled"
                                />
                                <Label htmlFor="showcase-disabled">
                                    Desabilitado
                                </Label>
                            </div>
                        </RadioGroup>
                    </ShowcaseSection>

                    <ShowcaseSection title="Switch">
                        <div className="grid w-full max-w-[520px] gap-3">
                            <div className="flex items-start gap-3">
                                <Switch
                                    id="showcase-active"
                                    checked={active}
                                    onCheckedChange={setActive}
                                    aria-label="Ativo"
                                />
                                <div className="grid gap-0.5">
                                    <Label htmlFor="showcase-active">
                                        Ativo
                                    </Label>
                                    <p className="t-small muted">
                                        Quando ativo, o parceiro pode aparecer
                                        no catálogo público.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Switch
                                    id="showcase-featured"
                                    checked={featured}
                                    onCheckedChange={setFeatured}
                                    aria-label="Em destaque"
                                />
                                <div className="grid gap-0.5">
                                    <Label htmlFor="showcase-featured">
                                        Em destaque
                                    </Label>
                                    <p className="t-small muted">
                                        Exibe o parceiro em áreas de destaque do
                                        catálogo.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Switch
                                    disabled
                                    aria-label="Desabilitado desligado"
                                />
                                <Switch
                                    disabled
                                    defaultChecked
                                    aria-label="Desabilitado ligado"
                                />
                            </div>
                        </div>
                    </ShowcaseSection>

                    <ShowcaseSection title="Dialog">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Dialog normal</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Editar configuração
                                    </DialogTitle>
                                    <DialogDescription>
                                        Atualize as informações desta
                                        configuração.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogBody>
                                    <Input defaultValue="Valor atual" />
                                </DialogBody>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button>Salvar</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Dialog small</Button>
                            </DialogTrigger>
                            <DialogContent size="sm">
                                <DialogHeader>
                                    <DialogTitle>Mensagem curta</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <p className="t-body muted">
                                        Conteúdo de demonstração.
                                    </p>
                                </DialogBody>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    Confirmação destructive
                                </Button>
                            </DialogTrigger>
                            <DialogContent size="confirmation">
                                <DialogBody>
                                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                                        <DialogIcon tone="danger">
                                            <TriangleAlert className="size-5" />
                                        </DialogIcon>
                                        <div>
                                            <DialogTitle>
                                                Excluir item?
                                            </DialogTitle>
                                            <DialogDescription>
                                                Esta ação não poderá ser
                                                desfeita.
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogBody>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button variant="destructive">
                                        Excluir
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary">
                                    Confirmação informativa
                                </Button>
                            </DialogTrigger>
                            <DialogContent size="confirmation">
                                <DialogBody>
                                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                                        <DialogIcon>
                                            <Info className="size-5" />
                                        </DialogIcon>
                                        <div>
                                            <DialogTitle>
                                                Alteração salva
                                            </DialogTitle>
                                            <DialogDescription>
                                                A configuração foi atualizada.
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogBody>
                            </DialogContent>
                        </Dialog>
                    </ShowcaseSection>

                    <ShowcaseSection title="Drawer">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button>Abrir drawer</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Detalhes</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <DrawerSection>
                                        <h3 className="t-section">
                                            Informações
                                        </h3>
                                        <p className="t-body muted">
                                            Conteúdo da primeira seção do
                                            drawer.
                                        </p>
                                    </DrawerSection>
                                    <DrawerSection>
                                        <h3 className="t-section">
                                            Observações
                                        </h3>
                                        <Textarea placeholder="Escreva uma observação" />
                                    </DrawerSection>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant="ghost">Fechar</Button>
                                    </DrawerClose>
                                    <Button>Salvar</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </ShowcaseSection>

                    <ShowcaseSection title="Dropdown Menu">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Abrir menu</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Star />
                                    Favoritar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        Mais opções
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            Duplicar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Arquivar
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuRadioGroup
                                    value={menuRole}
                                    onValueChange={setMenuRole}
                                >
                                    <DropdownMenuRadioItem value="admin">
                                        Administrador
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="staff">
                                        Colaborador
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                                <DropdownMenuItem destructive>
                                    <Trash2 />
                                    Excluir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ShowcaseSection>

                    <ShowcaseSection title="Popover">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Abrir popover</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <h3 className="t-card">Filtros</h3>
                                <div className="grid gap-3">
                                    <Label htmlFor="popover-name">Nome</Label>
                                    <Input
                                        id="popover-name"
                                        placeholder="Buscar"
                                    />
                                    <Label htmlFor="popover-status">
                                        Status
                                    </Label>
                                    <Select id="popover-status">
                                        <option>Todos</option>
                                        <option>Ativo</option>
                                    </Select>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="ghost" size="sm">
                                        Limpar
                                    </Button>
                                    <Button size="sm">Aplicar filtros</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </ShowcaseSection>

                    <ShowcaseSection title="Tooltip">
                        <TooltipProvider>
                            <div className="flex items-center gap-3">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            aria-label="Informações"
                                        >
                                            <Info />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        Informações
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline">
                                            Abaixo
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        Tooltip abaixo
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                    </ShowcaseSection>

                    <ShowcaseSection title="Toast">
                        <Button onClick={() => setToast('success')}>
                            Mostrar sucesso
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setToast('danger')}
                        >
                            Mostrar erro
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setToast('info')}
                        >
                            Mostrar informação
                        </Button>
                    </ShowcaseSection>

                    <ShowcaseSection title="Table">
                        <TableContainer className="w-full">
                            <TableScroll>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Contato</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Etapa</TableHead>
                                            <TableHead>Criado em</TableHead>
                                            <TableHead className="text-right">
                                                Ações
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow aria-selected="true">
                                            <TableCell className="font-semibold">
                                                Marcos Oliveira
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    dot={false}
                                                >
                                                    Manual
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="stage"
                                                    tone="new"
                                                >
                                                    Novo
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="muted tnum">
                                                02 out. 2026
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            aria-label="Ações"
                                                        >
                                                            <MoreHorizontal />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            destructive
                                                        >
                                                            Excluir
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Carla Mendes
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    dot={false}
                                                >
                                                    Indicação
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="stage"
                                                    tone="qualified"
                                                >
                                                    Qualificado
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="muted tnum">
                                                29 set. 2026
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    aria-label="Ações"
                                                >
                                                    <MoreHorizontal />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableScroll>
                            <Pagination>
                                <PaginationInfo>1–20 de 48</PaginationInfo>
                                <PaginationContent>
                                    <PaginationButton
                                        disabled
                                        onClick={() =>
                                            setPage(Math.max(1, page - 1))
                                        }
                                    >
                                        Anterior
                                    </PaginationButton>
                                    <PaginationButton
                                        active
                                        aria-current="page"
                                    >
                                        {page}
                                    </PaginationButton>
                                    <PaginationButton
                                        onClick={() => setPage(2)}
                                    >
                                        2
                                    </PaginationButton>
                                    <PaginationButton
                                        onClick={() => setPage(3)}
                                    >
                                        3
                                    </PaginationButton>
                                    <PaginationButton
                                        onClick={() =>
                                            setPage(Math.min(3, page + 1))
                                        }
                                    >
                                        Próxima
                                    </PaginationButton>
                                </PaginationContent>
                            </Pagination>
                        </TableContainer>
                    </ShowcaseSection>

                    <ShowcaseSection title="Breadcrumb">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">
                                        Início
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">
                                        Parceiros
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Categorias</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </ShowcaseSection>

                    <ShowcaseSection title="Card">
                        <Card className="w-full max-w-[420px]">
                            <CardHeader>
                                <CardTitle>Informações básicas</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <p className="t-body">
                                    Conteúdo reutilizável do card.
                                </p>
                            </CardBody>
                            <CardFooter>Atualizado agora</CardFooter>
                        </Card>
                    </ShowcaseSection>

                    <ShowcaseSection title="Chip">
                        {showChip ? (
                            <Chip
                                label="Etapa"
                                value="Novo"
                                onRemove={() => setShowChip(false)}
                            />
                        ) : (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowChip(true)}
                            >
                                Restaurar chip
                            </Button>
                        )}
                        <Chip
                            label="Tipo"
                            value="Quero ser Parceiro"
                            onRemove={() => undefined}
                        />
                    </ShowcaseSection>

                    <ShowcaseSection title="Segmented Control">
                        <SegmentedControl>
                            <SegmentedControlItem
                                aria-pressed={segment === 'table'}
                                onClick={() => setSegment('table')}
                            >
                                Tabela
                            </SegmentedControlItem>
                            <SegmentedControlItem
                                aria-pressed={segment === 'grid'}
                                onClick={() => setSegment('grid')}
                            >
                                Grade
                            </SegmentedControlItem>
                        </SegmentedControl>
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
                        <Badge variant="stage" tone="new">
                            Novo
                        </Badge>
                        <Badge variant="stage" tone="contacted">
                            Em contato
                        </Badge>
                        <Badge variant="stage" tone="qualified">
                            Qualificado
                        </Badge>
                        <Badge variant="stage" tone="completed">
                            Concluído
                        </Badge>
                        <Badge variant="stage" tone="discarded">
                            Descartado
                        </Badge>
                        <Badge variant="outline" size="compact" dot={false}>
                            Compacto
                        </Badge>
                        <Badge variant="outline" size="counter" dot={false}>
                            3
                        </Badge>
                    </ShowcaseSection>

                    <ShowcaseSection title="Alert">
                        <div className="grid w-full gap-3">
                            <Alert variant="info">
                                <AlertTitle>Informação</AlertTitle>
                                <AlertDescription>
                                    Mensagem informativa para o usuário.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="success">
                                <AlertTitle>Concluído</AlertTitle>
                                <AlertDescription>
                                    A operação foi realizada com sucesso.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="warning">
                                <AlertTitle>Atenção</AlertTitle>
                                <AlertDescription>
                                    Confira os dados antes de continuar.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="danger">
                                <AlertTitle>
                                    Não foi possível concluir
                                </AlertTitle>
                                <AlertDescription>
                                    Tente novamente em alguns instantes.
                                </AlertDescription>
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
                    {toast ? (
                        <Toast
                            variant={toast}
                            open
                            onOpenChange={(open) => {
                                if (!open) setToast(null)
                            }}
                        >
                            <div className="min-w-0">
                                <ToastTitle>
                                    {toast === 'success'
                                        ? 'Sucesso'
                                        : toast === 'danger'
                                          ? 'Erro'
                                          : 'Informação'}
                                </ToastTitle>
                                <ToastDescription>
                                    Mensagem de demonstração do toast.
                                </ToastDescription>
                            </div>
                            <ToastClose />
                        </Toast>
                    ) : null}
                    <ToastViewport />
                </div>
            </main>
        </ToastProvider>
    )
}
