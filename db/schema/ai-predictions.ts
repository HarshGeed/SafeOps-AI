import { relations } from "drizzle-orm";

import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import {
  predictionStatusEnum,
  predictionTypeEnum,
} from "./enums";

import { machines } from "./machines";
import { profiles } from "./profiles";
import { zones } from "./zones";

export const aiPredictions = pgTable("ai_predictions", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  type: predictionTypeEnum("type")
    .notNull(),

  status: predictionStatusEnum("status")
    .default("completed")
    .notNull(),

  zoneId: uuid("zone_id").references(() => zones.id, {
    onDelete: "set null",
  }),

  machineId: uuid("machine_id").references(() => machines.id, {
    onDelete: "set null",
  }),

  generatedBy: uuid("generated_by").references(() => profiles.id, {
    onDelete: "set null",
  }),

  riskScore: integer("risk_score")
    .notNull(),

  confidenceScore: doublePrecision("confidence_score")
    .notNull(),

  prediction: text("prediction")
    .notNull(),

  recommendation: text("recommendation")
    .notNull(),

  reasoning: text("reasoning"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const aiPredictionsRelations = relations(
  aiPredictions,
  ({ one }) => ({
    zone: one(zones, {
      fields: [aiPredictions.zoneId],
      references: [zones.id],
    }),

    machine: one(machines, {
      fields: [aiPredictions.machineId],
      references: [machines.id],
    }),

    generatedUser: one(profiles, {
      fields: [aiPredictions.generatedBy],
      references: [profiles.id],
    }),
  })
);