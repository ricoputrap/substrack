// referrence: docs/data-model.dbml

import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  text,
  json,
  boolean,
  decimal,
  primaryKey,
  bigint
} from "drizzle-orm/pg-core";
import { EnumAuthMethod, EnumBillingCycle, EnumCurrency, EnumLanguage } from "../constants";

// enums
export const enumAuthMethod = pgEnum('enum_auth_method', [
  EnumAuthMethod.CREDENTIALS,
  EnumAuthMethod.GOOGLE
]);
export const enumLanguage = pgEnum('enum_language', [
  EnumLanguage.EN,
  EnumLanguage.ID
]);
export const enumCurrency = pgEnum("enum_currency", [
  EnumCurrency.USD,
  EnumCurrency.IDR
]);
export const enumBillingCycle = pgEnum("enum_billing_cycle", [
  EnumBillingCycle.MONTHLY,
  EnumBillingCycle.YEARLY
])

export const USER = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).unique(),
  password_hash: varchar({ length: 255 }),
  full_name: varchar({ length: 255 }),
  display_name: varchar({ length: 100 }),
  language: enumLanguage().default(EnumLanguage.EN),
  currency: enumCurrency().default(EnumCurrency.USD),
  birth_year: integer(),
  profile_picture: text(),

  // unix timestamp in milliseconds
  created_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updated_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()).$onUpdate(() => Date.now()),
});

/**
 * Users have multiple ways for signing in to the system.
 * Ex: Email Password, Google, Twitter, Github, etc.
*/
export const USER_AUTH_METHOD = pgTable("user_auth_method", {
  user_id: integer().notNull().references(() => USER.id),
  auth_method: enumAuthMethod().notNull(),
  auth_identifier: varchar({ length: 255 }).notNull(),

  // unix timestamp in milliseconds
  created_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updated_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()).$onUpdate(() => Date.now()),
}, (table) => [
  // auth_method + auth_identifier should be unique to make sure
  // an account can be used by only one user
  primaryKey({ columns: [table.auth_method, table.auth_identifier] }),
]);

/**
A read-only data.
A new record will be created everytime the user logins to the system.
*/
export const USER_LOGIN_HISTORY = pgTable("user_login_history", {
  user_id: integer().notNull().references(() => USER.id),
  login_time: integer().notNull(),
  ip_address: varchar({ length: 45 }),

  device_info: json(),
  // unix timestamp in milliseconds
  created_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => [
  // composite primary key
  primaryKey({ columns: [table.user_id, table.login_time] }),
]);

/**
Read-heavy table.
Data can be cached.
Each user has their own categories.
*/
export const SUBSCRIPTION_CATEGORY = pgTable("subscription_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => USER.id),
  name: varchar({ length: 255 }).notNull(),

  // unix timestamp in milliseconds
  created_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updated_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()).$onUpdate(() => Date.now()),
});

/**
Stores the metadata of the subscription schedule.
A CRON job will run everyday for creating a new `SUBSCRIPTION` record
and updating the `next_due_date`.

Events:
1. A new record will be created when the user adds a new subscription.
2. The `next_due_date` will be updated when `now()` > `next_due_date`.
*/
export const SUBSCRIPTION_SCHEDULE = pgTable("subscription_schedule", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  billing_cycle: enumBillingCycle().notNull(),
  is_active: boolean().notNull().default(true),

  // unix timestamps in milliseconds
  start_date: integer().notNull().$defaultFn(() => Date.now()),
  end_date: integer(),
  next_due_date: integer(),
  created_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updated_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()).$onUpdate(() => Date.now()),
});

/**
Events:
1. A new record will be created in these 2 situations:
  a. When the user adds a new subscription.
  b. When `now()` > `SUBSCRIPTION_SCHEDULE.next_due_date`
     (will triggered by CRON).
2. The `is_paid` will be updated when the user checks/unchecks
   the subscription status.

Things to consider:
Add some derived attributes (`due_day_in_month`, `due_month_in_year`,
and `due_year`) for easier data filtering in the dashboard later.
*/
export const SUBSCRIPTION = pgTable("subscription", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => USER.id),
  category_id: integer().notNull().references(() => SUBSCRIPTION_CATEGORY.id),
  schedule_id: integer().notNull().references(() => SUBSCRIPTION_SCHEDULE.id),
  name: varchar({ length: 255 }).notNull(),
  amount: decimal().notNull(),
  is_paid: boolean().notNull().default(false),

  // unix timestamps in milliseconds
  due_date: integer().notNull(),
  created_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updated_at: bigint({ mode: "number" }).notNull().$defaultFn(() => Date.now()).$onUpdate(() => Date.now()),
});

export type TUserAuthMethodSelect = typeof USER_AUTH_METHOD.$inferSelect;