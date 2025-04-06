CREATE TYPE "public"."enum_auth_method" AS ENUM('credentials', 'google');--> statement-breakpoint
CREATE TYPE "public"."enum_billing_cycle" AS ENUM('monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."enum_currency" AS ENUM('USD', 'IDR');--> statement-breakpoint
CREATE TYPE "public"."enum_language" AS ENUM('en', 'id');--> statement-breakpoint
CREATE TABLE "subscription" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subscription_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"schedule_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"amount" numeric NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"due_date" integer NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subscription_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_schedule" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subscription_schedule_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"billing_cycle" "enum_billing_cycle" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"start_date" integer NOT NULL,
	"end_date" integer,
	"next_due_date" integer,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255),
	"password_hash" varchar(255),
	"full_name" varchar(255),
	"display_name" varchar(100),
	"language" "enum_language" DEFAULT 'en',
	"currency" "enum_currency" DEFAULT 'USD',
	"birth_year" integer,
	"profile_picture" text,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_auth_method" (
	"user_id" integer NOT NULL,
	"auth_method" "enum_auth_method" NOT NULL,
	"auth_identifier" varchar(255) NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL,
	CONSTRAINT "user_auth_method_auth_method_auth_identifier_pk" PRIMARY KEY("auth_method","auth_identifier")
);
--> statement-breakpoint
CREATE TABLE "user_login_history" (
	"user_id" integer NOT NULL,
	"login_time" integer NOT NULL,
	"ip_address" varchar(45),
	"device_info" json,
	"created_at" bigint NOT NULL,
	CONSTRAINT "user_login_history_user_id_login_time_pk" PRIMARY KEY("user_id","login_time")
);
--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_category_id_subscription_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."subscription_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_schedule_id_subscription_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."subscription_schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_category" ADD CONSTRAINT "subscription_category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_auth_method" ADD CONSTRAINT "user_auth_method_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_login_history" ADD CONSTRAINT "user_login_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;