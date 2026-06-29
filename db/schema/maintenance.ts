import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { machines } from "./machines";
import { workers } from "./workers";

import {
  maintenancePriorityEnum,
  maintenanceStatusEnum,
  maintenanceTypeEnum,
} from "./enums";

export const maintenance = pgTable("maintenance", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  machineId: uuid("machine_id")
    .references(() => machines.id, {
      onDelete: "cascade",
    })
    .notNull(),

  assignedTo: uuid("assigned_to")
    .references(() => workers.id, {
      onDelete: "set null",
    }),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description"),

  type: maintenanceTypeEnum("type")
    .default("preventive")
    .notNull(),

  priority: maintenancePriorityEnum("priority")
    .default("medium")
    .notNull(),

  status: maintenanceStatusEnum("status")
    .default("scheduled")
    .notNull(),

  scheduledAt: timestamp("scheduled_at", {
    withTimezone: true,
  }),

  startedAt: timestamp("started_at", {
    withTimezone: true,
  }),

  completedAt: timestamp("completed_at", {
    withTimezone: true,
  }),

  remarks: text("remarks"),

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

export const maintenanceRelations = relations(
  maintenance,
  ({ one }) => ({
    machine: one(machines, {
      fields: [maintenance.machineId],
      references: [machines.id],
    }),

    worker: one(workers, {
      fields: [maintenance.assignedTo],
      references: [workers.id],
    }),
  })
);