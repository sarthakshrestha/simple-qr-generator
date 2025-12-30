import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, RefreshCcw, Type, Copy, Check, Download, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultipleStateButtonComponent, type ButtonStateKey } from "@/components/multiple-state-button/multiple-state-button-component";
import { AppleSpinner } from "@/components/ui/apple-spinner";

// Easing presets from the guidelines
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export function QRCodeGenerator() {
    const [url, setUrl] = useState("https://google.com");
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [exportState, setExportState] = useState<ButtonStateKey>('idle');

    const generateQRCode = async () => {
        if (!url) return;
        try {
            const response = await QRCode.toDataURL(url, {
                width: 1000,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                },
            });
            setQrCodeUrl(response);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            generateQRCode();
        }, 100);
        return () => clearTimeout(timer);
    }, [url]);

    const handleExport = () => {
        if (!qrCodeUrl || exportState !== 'idle') return;

        setExportState('loading');

        setTimeout(() => {
            const link = document.createElement("a");
            link.href = qrCodeUrl;
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setExportState('success');

            setTimeout(() => {
                setExportState('idle');
            }, 2000);
        }, 1500);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const exportButtonConfig = {
        idle: {
            text: 'Export as PNG',
            icon: <Download className="h-5 w-5" />,
        },
        loading: {
            text: 'Preparing...',
            icon: <AppleSpinner size={16} color="currentColor" />,
        },
        success: {
            text: 'Saved!',
            icon: <CheckCircle2 className="h-5 w-5" />,
        },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-4 sm:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                className="w-full max-w-xl"
            >
                <Card className="relative overflow-hidden border-none bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                    {/* subtle glow */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                    <CardHeader className="space-y-1 pb-0">
                        <div className="flex items-center justify-between">
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2, ease: EASE_SMOOTH }}
                                className="flex items-center gap-3"
                            >
                                <div>
                                    <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                                        Simple QR Generator
                                    </CardTitle>

                                </div>
                            </motion.div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, ease: EASE_SMOOTH }}
                            className="space-y-3"
                        >
                            <Label htmlFor="url" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 ml-1 uppercase tracking-wider">
                                Target Content
                            </Label>
                            <div className="relative group">
                                <Input
                                    id="url"
                                    placeholder="Enter URL or text..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="h-12 bg-zinc-50/50 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all pr-12 text-base rounded-xl"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <AnimatePresence mode="wait">
                                        {url && (
                                            <motion.button
                                                key="clear"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setUrl("")}
                                                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                            >
                                                <RefreshCcw className="w-4 h-4" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, ease: EASE_SMOOTH }}
                            className="relative flex flex-col items-center justify-center p-12 bg-zinc-50/50 dark:bg-zinc-950/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50"
                        >
                            <AnimatePresence mode="wait">
                                {qrCodeUrl ? (
                                    <motion.div
                                        key="qr"
                                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="relative group p-4 bg-white rounded-2xl shadow-2xl dark:shadow-none shadow-zinc-200/50"
                                    >
                                        <img
                                            src={qrCodeUrl}
                                            alt="QR Code"
                                            className="w-full max-w-[200px] h-auto rounded-lg"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        className="w-[200px] h-[200px] rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800"
                                    >
                                        <Type className="w-8 h-8 text-zinc-300 dark:text-zinc-700 animate-pulse" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </CardContent>

                    <CardFooter className="pt-2 pb-8 px-8">
                        <MultipleStateButtonComponent
                            onClick={handleExport}
                            state={exportState}
                            disabled={!url}
                            config={exportButtonConfig}
                        />
                    </CardFooter>
                </Card>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex items-center justify-center gap-6"
                >
                    <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
                        built by <a href="https://sarthakshrestha.com.np" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-300 font-medium hover:text-white transition-colors underline-offset-4 hover:underline">sarthak</a>
                    </p>
                    <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    <nav className="flex items-center gap-4">
                        <a href="#" className="text-[12px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy</a>
                        <a href="#" className="text-[12px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms</a>
                    </nav>
                </motion.div>
            </motion.div>
        </div>
    );
}
