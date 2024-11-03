import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { SideNav } from "@/components/common/SideNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SocketProvider } from "@/contexts/socket";

interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SocketProvider>
                <SidebarProvider>
                    <div className="flex min-h-screen bg-background">
                        <SideNav />
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </SocketProvider>
        </ThemeProvider>
    );
}