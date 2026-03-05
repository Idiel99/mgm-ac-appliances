import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...args: ClassValue[]) => twMerge(clsx(args))
