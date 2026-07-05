import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  TriangleAlert,
  Wrench,
  Cpu,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workers",
    href: "/dashboard/workers",
    icon: Users,
  },
  {
    title: "Permits",
    href: "/dashboard/permits",
    icon: ShieldCheck,
  },
  {
    title: "Incidents",
    href: "/dashboard/incidents",
    icon: TriangleAlert,
  },
  {
    title: "Machines",
    href: "/dashboard/machines",
    icon: Cpu,
  },
  {
    title: "Maintenance",
    href: "/dashboard/maintenance",
    icon: Wrench,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];