import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-dark focus-visible:outline-brand-primary',
  secondary: 'border border-brand-primary text-brand-primary hover:bg-brand-light focus-visible:outline-brand-primary',
  ghost: 'text-brand-dark hover:bg-brand-light focus-visible:outline-brand-dark',
  accent: 'bg-accent text-white hover:bg-orange-500 focus-visible:outline-accent'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-5 py-3',
  lg: 'text-lg px-6 py-3.5'
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
