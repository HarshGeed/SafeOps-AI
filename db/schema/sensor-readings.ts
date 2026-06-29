import {
  doublePrecision,
  index,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { sensors } from "./sensors";
import { relations } from "drizzle-orm";

export const sensorReadings = pgTable(
  "sensor_readings",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    sensorId: uuid("sensor_id")
      .references(() => sensors.id, {
        onDelete: "cascade",
      })
      .notNull(),

    value: doublePrecision("value").notNull(),

    recordedAt: timestamp("recorded_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("sensor_idx").on(table.sensorId),

    index("recorded_at_idx").on(table.recordedAt),

    index("sensor_recorded_idx").on(
      table.sensorId,
      table.recordedAt
    ),
  ]
);

export const sensorReadingsRelations = relations(
    sensorReadings,
    ({ one }) => ({
        sensor: one(sensors, {
            fields: [sensorReadings.sensorId],
            references: [sensors.id],
        }),
    })
);