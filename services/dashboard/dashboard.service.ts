import { count } from "drizzle-orm";

import { db } from "@/db";

import {
    workers,
    machines,
    alerts,
    permits,
    incidents,
    maintenance,
} from "@/db";

export async function getDashboardStats() {

    const [
        workerCount,
        machineCount,
        alertCount,
        permitCount,
        incidentCount,
        maintenanceCount,
    ] = await Promise.all([

        db.select({
            count: count(),
        }).from(workers),

        db.select({
            count: count(),
        }).from(machines),

        db.select({
            count: count(),
        }).from(alerts),

        db.select({
            count: count(),
        }).from(permits),

        db.select({
            count: count(),
        }).from(incidents),

        db.select({
            count: count(),
        }).from(maintenance),

    ]);

    return {

        workers: workerCount[0].count,

        machines: machineCount[0].count,

        alerts: alertCount[0].count,

        permits: permitCount[0].count,

        incidents: incidentCount[0].count,

        maintenance: maintenanceCount[0].count,

    };

}