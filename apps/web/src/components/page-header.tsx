import type { ReactNode } from 'react'

type PageHeaderProps = {
    title: string
    description?: string
    children?: ReactNode
}

export function PageHeader({
    title,
    description,
    children,
}: PageHeaderProps) {
    return (
        <header className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="grid min-w-0 gap-1.5">
                <h1 className="t-page">{title}</h1>
                {description ? (
                    <p className="t-body muted">{description}</p>
                ) : null}
            </div>

            {children !== undefined && children !== null ? (
                <div className="flex shrink-0 items-center gap-2">
                    {children}
                </div>
            ) : null}
        </header>
    )
}
