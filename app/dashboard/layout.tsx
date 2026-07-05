import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/dashboard/app-sidebar";

import AppHeader from "@/components/layout/AppHeader";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <SidebarProvider>

            <AppSidebar />

            <main className="flex-1">

                <AppHeader />

                <div className="p-6">

                    {children}

                </div>

            </main>

        </SidebarProvider>

    );

}