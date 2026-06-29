import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { zones } from "./zones";
import { relations } from "drizzle-orm";
import { sensors } from "./sensors";
import { maintenance } from "./maintenance";
import { permits } from "./permits";
import { incidents } from "./incidents";
import { alerts } from "./alerts";
import { aiPredictions } from "./ai-predictions";

import {
  machineCriticalityEnum,
  machineStatusEnum,
  machineTypeEnum,
} from "./enums";

export const machines = pgTable("machines", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  zoneId: uuid("zone_id")
    .references(() => zones.id, {
      onDelete: "cascade",
    })
    .notNull(),

  machineCode: varchar("machine_code", {
    length: 30,
  })
    .unique()
    .notNull(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  description: text("description"),

  type: machineTypeEnum("type")
    .default("other")
    .notNull(),

  manufacturer: varchar("manufacturer", {
    length: 100,
  }),

  model: varchar("model", {
    length: 100,
  }),

  serialNumber: varchar("serial_number", {
    length: 100,
  }).unique(),

  status: machineStatusEnum("status")
    .default("running")
    .notNull(),

  criticality: machineCriticalityEnum("criticality")
    .default("medium")
    .notNull(),

  healthScore: integer("health_score")
    .default(100)
    .notNull(),

  installationDate: timestamp("installation_date", {
    withTimezone: true,
  }),

  lastHealthCheck: timestamp("last_health_check", {
    withTimezone: true,
  }),

  lastService: timestamp("last_service", {
    withTimezone: true,
  }),

  nextService: timestamp("next_service", {
    withTimezone: true,
  }),

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

export const machinesRelations = relations(
    machines,
    ({ one, many }) => ({
        zone: one(zones, {
            fields: [machines.zoneId],
            references: [zones.id],
        }),

        sensors: many(sensors),
        maintenance: many(maintenance),
        permits: many(permits),
        alerts: many(alerts),
        incidents: many(incidents),
        predictions: many(aiPredictions),
    })
);