import { pgTable, integer, text, varchar, serial } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';
import categories from "./category.js";
import manufacturers from "./manufacturer.js";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  name: varchar("name", 255).notNull(),
  condition: varchar("condition", 50),
  horsepower: varchar("horsepower", 50),
  hoursMeter: varchar("hours_meter", 50),
  stockNumber: varchar("stock_number", 100),
  year: varchar("year", 50),
  // location: varchar("location", 255),
  // state: varchar("state", 100),
  serialNumber: varchar("serial_number", 255),
  model: varchar("model", 255),
  description: text("description"),
  images: text("images").array().notNull().default(sql`ARRAY[]::text[]`),
  category_id: integer("category_id").references(() => categories.id, { onDelete: "cascade"}),
  manufacturer_id: integer("manufacturer_id").references(() => manufacturers.id, {onDelete: "cascade"}),
});

