import { QRCodeGenerator } from "@/components/qr-generator";

export function App() {
    return (
        <div className="dark relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50 selection:bg-white/10">
            {/* Premium background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-900/50 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-zinc-900/50 rounded-full blur-[120px]" />

            <main className="relative z-10 flex flex-col items-center pb-20">
                <QRCodeGenerator />
            </main>
        </div>
    );
}

export default App;