import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background text-foreground mx-auto max-w-7xl">
                <header className="p-4">
                    <ModeToggle />
                </header>
                <main>
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}