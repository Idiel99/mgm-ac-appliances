import type { PropsWithChildren, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

interface ModalProps extends PropsWithChildren {
  title: string
  open: boolean
  onClose: () => void
  description?: ReactNode
}

export const Modal = ({ title, description, open, onClose, children }: ModalProps) => {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-brand-dark">{title}</h3>
            {description && <p className="mt-2 text-slate-600">{description}</p>}
          </div>
          <Button variant="ghost" size="sm" aria-label="Close modal" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body
  )
}
