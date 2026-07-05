"use client";

import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  BarChart3,
  Cpu,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Users,
  Wrench,
} from "lucide-react";

const data = {
  user: {
    name: "Harsh Geed",
    email: "harsh@example.com",
    avatar: "/avatars/default.png",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Admin Users",
      url: "/dashboard/admin/users",
      icon: Users,
      items: [],
    },
    {
      title: "Workers",
      url: "/dashboard/workers",
      icon: Users,
      items: [],
    },
    {
      title: "Machines",
      url: "/dashboard/machines",
      icon: Cpu,
      items: [],
    },
    {
      title: "Permits",
      url: "/dashboard/permits",
      icon: ShieldCheck,
      items: [],
    },
    {
      title: "Incidents",
      url: "/dashboard/incidents",
      icon: TriangleAlert,
      items: [],
    },
    {
      title: "Maintenance",
      url: "/dashboard/maintenance",
      icon: Wrench,
      items: [],
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: FileText,
      items: [],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
      items: [],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [],
    },
  ],
};

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            SO
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="font-semibold">
              SafeOps
            </span>

            <span className="text-xs text-muted-foreground">
              Industrial Safety Platform
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}