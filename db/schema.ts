import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const contactMessages = pgTable("contact_messages", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  subject: text(),
  message: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  status: text().default("new").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  courseTitle: text().notNull(),
  coursePrice: text().notNull(),
  courseDuration: text(),
  message: text(),
  createdAt: timestamp().defaultNow().notNull(),
  status: text().default("new").notNull(),
});

export const orders = pgTable("orders", {
  id: text().primaryKey(),
  customerName: text().notNull(),
  customerEmail: text().notNull(),
  customerPhone: text().notNull(),
  city: text().notNull(),
  deliveryType: text().notNull(),
  deliveryAddress: text().notNull(),
  courier: text(),
  paymentMethod: text().notNull(),
  items: text().notNull(),
  subtotal: text().notNull(),
  shippingCost: text().notNull(),
  total: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  status: text().default("new").notNull(),
});

export const reviews = pgTable("reviews", {
  id: text().primaryKey(),
  authorName: text().notNull(),
  rating: integer().notNull(),
  comment: text().notNull(),
  courseTitle: text().notNull(),
  authorImage: text(),
  createdAt: timestamp().defaultNow().notNull(),
  status: text().default("pending").notNull(),
});
