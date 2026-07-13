import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const [
        workerCount,
        machineCount,
        alertCount,
        permitCount,
        incidentCount,
        maintenanceCount,
    ] = await Promise.all([

        supabase
            .from("workers")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("machines")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("alerts")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("permits")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("incidents")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("maintenance")
            .select("*", { count: "exact", head: true }),

    ]);

    return {

        workers: workerCount.count || 0,

        machines: machineCount.count || 0,

        alerts: alertCount.count || 0,

        permits: permitCount.count || 0,

        incidents: incidentCount.count || 0,

        maintenance: maintenanceCount.count || 0,

    };

}