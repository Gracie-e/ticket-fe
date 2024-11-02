// src/components/common/SideNav.tsx
import React from 'react';
import {User2, LayoutDashboard, Ticket, Settings, LogOut} from 'lucide-react';
import { ModeToggle } from "@/components/mode-toggle";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

interface NavItem {
    title: string;
    icon: React.ElementType;
    href: string;
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        title: "Tickets",
        icon: Ticket,
        href: "/tickets",
    },
    {
        title: "Profile",
        icon: User2,
        href: "/profile",
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/settings",
    },
    {
        title: "Logout",
        icon: LogOut,
        href: "/login",
    },
];

export function SideNav() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b px-4 py-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Tickets</h2>
                    <ModeToggle />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.href} className="flex items-center gap-2">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <div className="text-sm text-muted-foreground">
                    © 2024 Your App. All rights reserved.
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
