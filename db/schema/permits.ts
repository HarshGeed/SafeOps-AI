import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { machines } from "./machines";
import { zones } from "./zones";
import { profiles } from "./profiles";

import {
  permitPriorityEnum,
  permitStatusEnum,
  permitTypeEnum,
} from "./enums";

export const permits = pgTable("permits", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  permitNumber: varchar("permit_number", {
    length: 50,
  })
    .unique()
    .notNull(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description"),

  type: permitTypeEnum("type")
    .notNull(),

  priority: permitPriorityEnum("priority")
    .default("medium")
    .notNull(),

  status: permitStatusEnum("status")
    .default("pending")
    .notNull(),

  zoneId: uuid("zone_id")
    .references(() => zones.id, {
      onDelete: "cascade",
    })
    .notNull(),

  machineId: uuid("machine_id")
    .references(() => machines.id, {
      onDelete: "set null",
    }),

  requestedBy: uuid("requested_by")
    .references(() => profiles.id, {
      onDelete: "cascade",
    })
    .notNull(),

  approvedBy: uuid("approved_by")
    .references(() => profiles.id, {
      onDelete: "set null",
    }),

  validFrom: timestamp("valid_from", {
    withTimezone: true,
  }).notNull(),

  validUntil: timestamp("valid_until", {
    withTimezone: true,
  }).notNull(),

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

export const permitsRelations = relations(
  permits,
  ({ one }) => ({
    zone: one(zones, {
      fields: [permits.zoneId],
      references: [zones.id],
    }),

    machine: one(machines, {
      fields: [permits.machineId],
      references: [machines.id],
    }),

    requester: one(profiles, {
      fields: [permits.requestedBy],
      references: [profiles.id],
      relationName: "permit_requested_by",
    }),

    approver: one(profiles, {
      fields: [permits.approvedBy],
      references: [profiles.id],
      relationName: "permit_approved_by",
    }),
  })
);