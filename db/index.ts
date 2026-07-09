import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { aiPredictions } from "./schema/ai-predictions";
import { aiPredictionsRelations } from "./schema/ai-predictions";
import { alerts } from "./schema/alerts";
import { alertsRelations } from "./schema/alerts";
import { documents } from "./schema/documents";
import { documentsRelations } from "./schema/documents";
import { departmentEnum, workerStatusEnum, accountStatusEnum, userRoleEnum } from "./schema/enums";
import { incidents } from "./schema/incidents";
import { incidentsRelations } from "./schema/incidents";
import { machines } from "./schema/machines";
import { machinesRelations } from "./schema/machines";
import { maintenance } from "./schema/maintenance";
import { maintenanceRelations } from "./schema/maintenance";
import { permits } from "./schema/permits";
import { permitsRelations } from "./schema/permits";
import { profiles } from "./schema/profiles";
import { profilesRelations } from "./schema/profiles";
import { sensorReadings } from "./schema/sensor-readings";
import { sensorReadingsRelations } from "./schema/sensor-readings";
import { sensors } from "./schema/sensors";
import { sensorsRelations } from "./schema/sensors";
import { test } from "./schema/test";
import { workers } from "./schema/workers";
import { workersRelations } from "./schema/workers";
import { zones } from "./schema/zones";
import { zonesRelations } from "./schema/zones";

const client = postgres(process.env.DATABASE_URL!);

const schema = {
	aiPredictions,
	aiPredictionsRelations,
	alerts,
	alertsRelations,
	documents,
	documentsRelations,
	departmentEnum,
	workerStatusEnum,
	accountStatusEnum,
	userRoleEnum,
	incidents,
	incidentsRelations,
	machines,
	machinesRelations,
	maintenance,
	maintenanceRelations,
	permits,
	permitsRelations,
	profiles,
	profilesRelations,
	sensorReadings,
	sensorReadingsRelations,
	sensors,
	sensorsRelations,
	test,
	workers,
	workersRelations,
	zones,
	zonesRelations,
};

export const db = drizzle(client, { schema });

export * from "./schema/enums";
export * from "./schema/profiles";
export * from "./schema/zones"
export * from "./schema/workers";
export * from "./schema/machines";
export * from "./schema/sensors";
export * from "./schema/maintenance"
export * from "./schema/permits"
export * from "./schema/alerts";
export * from "./schema/incidents";
export * from "./schema/documents";
export * from "./schema/ai-predictions";