import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client);
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