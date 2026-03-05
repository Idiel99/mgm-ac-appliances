import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export const Accordion = ({ items }: AccordionProps) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = item.id === activeId
        return (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <button
              className="flex w-full items-center justify-between text-left text-lg font-semibold text-brand-dark"
              onClick={() => setActiveId(open ? null : item.id)}
            >
              {item.title}
              <span className={cn('text-xl transition-transform', open && 'rotate-45')}>+</span>
            </button>
            {open && <p className="mt-3 text-slate-600">{item.content}</p>}
          </div>
        )
      })}
    </div>
  )
}
