import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { riskLevelEnum } from "./enums";
import { workers } from "./workers";
import { machines } from "./machines";
import { permits } from "./permits";
import { alerts } from "./alerts";
import { incidents } from "./incidents";
import { aiPredictions } from "./ai-predictions";

export const zones = pgTable("zones", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: text("name")
    .notNull()
    .unique(),

  description: text("description"),

  floor: integer("floor")
    .default(1)
    .notNull(),

  riskLevel: riskLevelEnum("risk_level")
    .default("low")
    .notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const zonesRelations = relations(
  zones,
  ({ many }) => ({
    workers: many(workers),

    machines: many(machines),

    permits: many(permits),

    alerts: many(alerts),

    incidents: many(incidents),

    predictions: many(aiPredictions),
  })
);