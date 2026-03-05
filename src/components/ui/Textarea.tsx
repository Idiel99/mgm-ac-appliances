import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = ({ className, error, ...props }: TextareaProps) => (
  <div className="space-y-1">
    <textarea
      className={cn(
        'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-brand-dark shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10',
        error && 'border-danger',
        className
      )}
      {...props}
    />
    {error && <p className="text-sm text-danger">{error}</p>}
  </div>
)
