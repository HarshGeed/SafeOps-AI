import { requireAuth } from "@/lib/auth/require-auth";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";

import { DashboardService } from "@/services/dashboard/dashboard.service";

export default async function DashboardPage() {
  const profile = await requireAuth();

  const stats = await DashboardService.getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {profile.firstName} 👋
        </h1>

        <p className="text-muted-foreground">
          Heres whats happening today.
        </p>
      </div>

      <DashboardCards stats={stats} />
    </div>
  );
}