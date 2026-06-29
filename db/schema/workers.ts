import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { profiles } from "./profiles";
import { zones } from "./zones";
import { relations } from "drizzle-orm";
import { maintenance } from "./maintenance";

import {
  departmentEnum,
  workerStatusEnum,
} from "./enums";

export const workers = pgTable("workers", {

  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  profileId: uuid("profile_id")
    .references(() => profiles.id, {
      onDelete: "cascade",
    })
    .notNull()
    .unique(),

  zoneId: uuid("zone_id")
    .references(() => zones.id, {
      onDelete: "set null",
    }),

  employeeCode: varchar("employee_code", {
    length: 30,
  })
    .notNull()
    .unique(),

  department: departmentEnum("department")
    .notNull(),

  designation: varchar("designation", {
    length: 100,
  }).notNull(),

  status: workerStatusEnum("status")
    .default("working")
    .notNull(),

  helmetDetected: boolean("helmet_detected")
    .default(true)
    .notNull(),

  lastSeen: timestamp("last_seen", {
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

export const workersRelations = relations(
    workers,
    ({ one, many }) => ({
        profile: one(profiles, {
            fields: [workers.profileId],
            references: [profiles.id],
        }),

        zone: one(zones, {
            fields: [workers.zoneId],
            references: [zones.id],
        }),

        maintenanceTasks: many(maintenance),
    })
);