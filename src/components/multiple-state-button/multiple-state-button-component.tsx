'use client'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AppleSpinner } from '../ui/apple-spinner'
import { Button } from '../ui/button'

export type ButtonStateKey = 'idle' | 'loading' | 'success'

interface ButtonStateConfig {
    text: string
    icon: React.ReactNode
}

export interface MultipleStateButtonProps {
    onClick?: () => void
    state?: ButtonStateKey
    disabled?: boolean
    className?: string
    config?: Record<ButtonStateKey, ButtonStateConfig>
}

const defaultAnimationVariants: Variants = {
    initial: { opacity: 0, y: -25 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 25 },
}

const buttonStyleVariants = cva(
    'relative w-full overflow-hidden rounded-xl h-14 transition-all disabled:opacity-100',
    {
        variants: {
            variant: {
                idle: 'bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-xl dark:shadow-none',
                loading: 'bg-zinc-900 text-white/70 dark:bg-zinc-100 dark:text-zinc-950/70',
                success: 'bg-green-500/10 text-green-500 border border-green-500/20',
            },
        },
        defaultVariants: {
            variant: 'idle',
        },
    }
)

export function MultipleStateButtonComponent({
    onClick,
    state: externalState,
    disabled,
    className,
    config: customConfig
}: MultipleStateButtonProps) {
    const [internalState, setInternalState] = useState<ButtonStateKey>('idle')
    const buttonState = externalState || internalState

    const defaultConfig: Record<ButtonStateKey, ButtonStateConfig> = {
        idle: {
            text: 'Secure',
            icon: <ShieldAlert className="h-4 w-4" />,
        },
        loading: {
            text: 'Securing',
            icon: <AppleSpinner size={16} color="currentColor" />,
        },
        success: {
            text: 'Secured',
            icon: <CheckCircle2 className="h-4 w-4" />,
        },
    }

    const config = customConfig || defaultConfig

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            setInternalState('loading')
            setTimeout(() => setInternalState('success'), 2000)
            setTimeout(() => setInternalState('idle'), 4000)
        }
    }

    return (
        <Button
            className={cn(buttonStyleVariants({ variant: buttonState }), className)}
            disabled={disabled || buttonState !== 'idle'}
            onClick={handleClick}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={buttonState}
                    className="flex items-center justify-center gap-2 w-full"
                    variants={defaultAnimationVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                >
                    {config[buttonState].icon}
                    <span className="font-medium">{config[buttonState].text}</span>
                </motion.span>
            </AnimatePresence>
        </Button>
    )
}

export default MultipleStateButtonComponent
