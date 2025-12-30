import MultipleStateButtonComponent from './multiple-state-button-component'
import { ShieldAlert, CheckCircle2 } from 'lucide-react'
import { AppleSpinner } from '../ui/apple-spinner'

export const MultipleStateButtonSection = () => {
    const demoConfig = {
        idle: {
            text: 'Secure Wallet',
            icon: <ShieldAlert className="h-4 w-4" />,
        },
        loading: {
            text: 'Securing...',
            icon: <AppleSpinner size={16} color="currentColor" />,
        },
        success: {
            text: 'Wallet Secured',
            icon: <CheckCircle2 className="h-4 w-4" />,
        },
    }

    return (
        <section className="mt-32 flex flex-col gap-8 w-full max-w-xl px-4">
            <header className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Stateful Components</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Interactive buttons with spring-based transitions.</p>
            </header>
            <div className="flex w-full items-center justify-center p-20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
                {/* mesh gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />

                <div className="w-full max-w-[240px] relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                    <MultipleStateButtonComponent config={demoConfig} />
                </div>
            </div>
        </section>
    )
}

export default MultipleStateButtonSection
