import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export class DashboardService {
  static async getStats() {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const [
      workers,
      machines,
      incidents,
      permits,
      maintenance,
      alerts,
    ] = await Promise.all([
      supabase
        .from("workers")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("machines")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("incidents")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("permits")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("maintenance")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("alerts")
        .select("*", {
          count: "exact",
          head: true,
        }),
    ]);

    return {
      workers: workers.count ?? 0,
      machines: machines.count ?? 0,
      incidents: incidents.count ?? 0,
      permits: permits.count ?? 0,
      maintenance: maintenance.count ?? 0,
      alerts: alerts.count ?? 0,
    };
  }
}