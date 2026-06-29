import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import {
  alertSeverityEnum,
  alertSourceEnum,
  alertStatusEnum,
} from "./enums";

import { machines } from "./machines";
import { profiles } from "./profiles";
import { zones } from "./zones";

export const alerts = pgTable("alerts", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description"),

  severity: alertSeverityEnum("severity")
    .notNull(),

  status: alertStatusEnum("status")
    .default("active")
    .notNull(),

  source: alertSourceEnum("source")
    .notNull(),

  zoneId: uuid("zone_id")
    .references(() => zones.id, {
      onDelete: "cascade",
    })
    .notNull(),

  machineId: uuid("machine_id").references(() => machines.id, {
    onDelete: "set null",
  }),

  acknowledgedBy: uuid("acknowledged_by").references(
    () => profiles.id,
    {
      onDelete: "set null",
    }
  ),

  acknowledgedAt: timestamp("acknowledged_at", {
    withTimezone: true,
  }),

  resolvedAt: timestamp("resolved_at", {
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

export const alertsRelations = relations(
  alerts,
  ({ one }) => ({
    zone: one(zones, {
      fields: [alerts.zoneId],
      references: [zones.id],
    }),

    machine: one(machines, {
      fields: [alerts.machineId],
      references: [machines.id],
    }),

    acknowledgedUser: one(profiles, {
      fields: [alerts.acknowledgedBy],
      references: [profiles.id],
    }),
  })
);