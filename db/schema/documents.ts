import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { documentTypeEnum } from "./enums";
import { profiles } from "./profiles";

export const documents = pgTable("documents", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description"),

  type: documentTypeEnum("type")
    .notNull(),

  fileName: varchar("file_name", {
    length: 255,
  }).notNull(),

  filePath: varchar("file_path", {
    length: 500,
  }).notNull(),

  mimeType: varchar("mime_type", {
    length: 100,
  }),

  fileSize: varchar("file_size", {
    length: 20,
  }),

  version: varchar("version", {
    length: 20,
  }).default("1.0"),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  uploadedBy: uuid("uploaded_by")
    .references(() => profiles.id, {
      onDelete: "set null",
    })
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

export const documentsRelations = relations(
  documents,
  ({ one }) => ({
    uploader: one(profiles, {
      fields: [documents.uploadedBy],
      references: [profiles.id],
    }),
  })
);