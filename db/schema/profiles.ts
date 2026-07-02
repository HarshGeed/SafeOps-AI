import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { permits } from "./permits";
import { accountStatusEnum, userRoleEnum } from "./enums";
import { aiPredictions } from "./ai-predictions";
import { alerts } from "./alerts";
import { documents } from "./documents";
import { incidents } from "./incidents";

export const profiles = pgTable("profiles", {
  // Same UUID as Supabase Auth User
  id: uuid("id").primaryKey(),

  employeeId: varchar("employee_id", {
    length: 30,
  }).unique(),

  firstName: varchar("first_name", {
    length: 100,
  }).notNull(),

  lastName: varchar("last_name", {
    length: 100,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  countryCode: varchar("country_code", {
    length: 5,
  }),

  phoneNumber: varchar("phone_number", {
    length: 20,
  }),

  profileImage: varchar("profile_image", {
    length: 500,
  }),

  department: varchar("department", {
    length: 100,
  }),

  designation: varchar("designation", {
    length: 100,
  }),

  role: userRoleEnum("role").default("worker").notNull(),

  status: accountStatusEnum("status").default("pending").notNull(),

  approvedBy: uuid("approved_by"),

  approvedAt: timestamp("approved_at", {
    withTimezone: true,
  }),

  lastLogin: timestamp("last_login", {
    withTimezone: true,
  }),

  createdBy: uuid("created_by"),

  updatedBy: uuid("updated_by"),

  isDeleted: boolean("is_deleted").default(false).notNull(),

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

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  approvedByUser: one(profiles, {
    fields: [profiles.approvedBy],
    references: [profiles.id],
  }),

  requestedPermits: many(permits, {
    relationName: "permit_requested_by",
  }),

  approvedPermits: many(permits, {
    relationName: "permit_approved_by",
  }),

  acknowledgedAlerts: many(alerts),

  reportedIncidents: many(incidents),

  uploadedDocuments: many(documents),

  generatedPredictions: many(aiPredictions),
}));
