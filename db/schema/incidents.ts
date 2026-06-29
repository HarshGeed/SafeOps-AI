import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import {
  incidentSeverityEnum,
  incidentStatusEnum,
  incidentTypeEnum,
} from "./enums";

import { machines } from "./machines";
import { profiles } from "./profiles";
import { zones } from "./zones";

export const incidents = pgTable("incidents", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  incidentNumber: varchar("incident_number", {
    length: 30,
  })
    .unique()
    .notNull(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description"),

  type: incidentTypeEnum("type")
    .notNull(),

  severity: incidentSeverityEnum("severity")
    .notNull(),

  status: incidentStatusEnum("status")
    .default("open")
    .notNull(),

  zoneId: uuid("zone_id")
    .references(() => zones.id, {
      onDelete: "cascade",
    })
    .notNull(),

  machineId: uuid("machine_id").references(() => machines.id, {
    onDelete: "set null",
  }),

  reportedBy: uuid("reported_by")
    .references(() => profiles.id, {
      onDelete: "set null",
    })
    .notNull(),

  occurredAt: timestamp("occurred_at", {
    withTimezone: true,
  }).notNull(),

  resolvedAt: timestamp("resolved_at", {
    withTimezone: true,
  }),

  rootCause: text("root_cause"),

  correctiveAction: text("corrective_action"),

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

export const incidentsRelations = relations(
  incidents,
  ({ one }) => ({
    zone: one(zones, {
      fields: [incidents.zoneId],
      references: [zones.id],
    }),

    machine: one(machines, {
      fields: [incidents.machineId],
      references: [machines.id],
    }),

    reporter: one(profiles, {
      fields: [incidents.reportedBy],
      references: [profiles.id],
    }),
  })
);