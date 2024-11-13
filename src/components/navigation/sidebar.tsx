"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from '@/types/nav-types';

import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DashboardSideProps {
    items: SidebarNavItem[];
}

const DashboardSide = ({ items }: DashboardSideProps) => {
    const path = usePathname();
    if (!items?.length) return null;
    return (
        <Sidebar collapsible="offcanvas" >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>AI Form Builder</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item, index) => {
                                const Icon = Icons[item?.icon || "list"];
                                const isActive = path === item.href;
                                return item.href && (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link key={index} href={item.disabled ? "/" : item.href}>
                                                <span className={cn("group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                    isActive ? "bg-accent" : "transparent",
                                                    item.disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
                                                )}>
                                                    <Icon className="w-6 h-6 mr-2" />
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }
                            )
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default DashboardSide