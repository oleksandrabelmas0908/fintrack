import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
}).extend({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().or(z.date()),
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
