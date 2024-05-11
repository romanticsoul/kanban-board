'use client'
import { ButtonHTMLAttributes, forwardRef, useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'
import { LoaderCircleIcon } from 'lucide-react'

const buttonVariants = cva(
  'flex items-center justify-center gap-2 rounded font-medium',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground [&:not([disabled]):hover]:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent text-primary',
      },
      size: {
        sm: 'px-4 py-2',
        md: 'px-6 py-3',
        lg: 'px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'sm',
    },
  }
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, disabled, ...props }, ref) => {
    const { pending } = useFormStatus()
    const cname = useMemo(
      () => cn(buttonVariants({ variant, size }), className),
      [variant, size, className]
    )
    return (
      <button
        ref={ref}
        className={cname}
        disabled={pending || disabled}
        {...props}
      >
        <div
          className={cn('flex items-center justify-center gap-2', {
            invisible: pending,
          })}
        >
          {children}
        </div>
        {pending && <LoaderCircleIcon className="absolute animate-spin" />}
      </button>
    )
  }
)

Button.displayName = 'Button'
