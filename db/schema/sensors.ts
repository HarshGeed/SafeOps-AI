import {
  boolean,
  doublePrecision,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { machines } from "./machines";
import { relations } from "drizzle-orm";
import { sensorReadings } from "./sensor-readings";

import {
  sensorStatusEnum,
  sensorTypeEnum,
  sensorUnitEnum,
} from "./enums";

export const sensors = pgTable("sensors", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  machineId: uuid("machine_id")
    .references(() => machines.id, {
      onDelete: "cascade",
    })
    .notNull(),

  sensorCode: varchar("sensor_code", {
    length: 30,
  })
    .unique()
    .notNull(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  type: sensorTypeEnum("type")
    .notNull(),

  unit: sensorUnitEnum("unit")
    .notNull(),

  status: sensorStatusEnum("status")
    .default("active")
    .notNull(),

  minThreshold: doublePrecision("min_threshold"),

  maxThreshold: doublePrecision("max_threshold"),

  currentValue: doublePrecision("current_value"),

  isCritical: boolean("is_critical")
    .default(false)
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

export const sensorsRelations = relations(
    sensors,
    ({ one, many }) => ({
        machine: one(machines, {
            fields: [sensors.machineId],
            references: [machines.id],
        }),

        readings: many(sensorReadings),
    })
);