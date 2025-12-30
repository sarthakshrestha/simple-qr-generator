import { QRCodeGenerator } from "@/components/qr-generator";

export function App() {
    return (
        <div className="dark relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50 selection:bg-white/10 flex items-center justify-center">
            <main className="relative z-10 w-full flex flex-col items-center">
                <QRCodeGenerator />
            </main>
        </div>
    );
}

export default App;