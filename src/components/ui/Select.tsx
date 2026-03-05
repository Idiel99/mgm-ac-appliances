import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  children: ReactNode
}

export const Select = ({ className, error, children, ...props }: SelectProps) => (
  <div className="space-y-1">
    <select
      className={cn(
        'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-brand-dark shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10',
        error && 'border-danger',
        className
      )}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-sm text-danger">{error}</p>}
  </div>
)
