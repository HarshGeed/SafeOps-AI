import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const test = pgTable("test", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});