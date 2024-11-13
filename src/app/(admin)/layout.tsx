import React from 'react';
import Header from '@/components/ui/header';
import DashboardNav from '@/components/navigation/navbar';
import { SessionProvider } from 'next-auth/react';
import FormGenerator from '../form-generator';
import { SidebarNavItem } from '@/types/nav-types';
import DashboardSide from '@/components/navigation/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
type Props = {}

const AdminLayout = ({ children }: {
    children: React.ReactNode
}) => {

    const dashboardConfig: {
        sidebarNav: SidebarNavItem[]
    } = {
        sidebarNav: [
            {
                title: "My Forms",
                href: "/view-forms",
                icon: "library",
            },
            {
                title: "Results",
                href: "/results",
                icon: "list",
            },
            {
                title: "Analytics",
                href: "/analytics",
                icon: "lineChart",
            },
            {
                title: "Charts",
                href: "/charts",
                icon: "pieChart",
            },
            {
                title: "Settings",
                href: "/setting",
                icon: "settings",
            },
        ]
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen flex-col space-y-6">
                <Header />
                <div className="container grid gap-12 md:grid-cols-[200px_1fr] flex-1">
                    <aside className="hidden w-[200px] flex-col md:flex pr-2 border-r justify-between">
                        <DashboardNav items={dashboardConfig.sidebarNav} />
                        <div className='lg:hidden'>
                            <DashboardSide items={dashboardConfig.sidebarNav} />
                        </div>
                    </aside>
                    <main className="flex w-full flex-1 flex-col overflow-hidden">
                        <header className="flex flex-col items-center md:flex-row">
                            <h1 className="text-4xl sm:text-3xl md:text-4xl m-5 p-4 font-semibold">Dashboard</h1>
                            <SessionProvider>
                                <FormGenerator />
                            </SessionProvider>
                            <div className='lg:hidden absolute top-25 right-10'>
                                <SidebarTrigger />
                            </div>
                        </header>
                        <hr className="my-4" />
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout