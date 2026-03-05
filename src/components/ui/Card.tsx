import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends PropsWithChildren {
  className?: string
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
}

export const Card = ({ className, children, title, description, footer }: CardProps) => (
  <div className={cn('rounded-2xl bg-white p-6 shadow-card', className)}>
    {title && <div className="text-xl font-semibold text-brand-dark">{title}</div>}
    {description && <p className="mt-2 text-slate-600">{description}</p>}
    <div className={cn((title || description) && 'mt-4')}>{children}</div>
    {footer && <div className="mt-4 border-t border-slate-100 pt-4">{footer}</div>}
  </div>
)
