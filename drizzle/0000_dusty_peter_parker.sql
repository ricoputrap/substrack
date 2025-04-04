CREATE TYPE "public"."auth_method" AS ENUM('credentials', 'google');--> statement-breakpoint
CREATE TYPE "public"."billing_cycle" AS ENUM('monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."currency" AS ENUM('USD', 'IDR');--> statement-breakpoint
CREATE TYPE "public"."language" AS ENUM('en', 'id');--> statement-breakpoint
CREATE TABLE "SUBSCRIPTION" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "SUBSCRIPTION_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"schedule_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"amount" numeric NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"due_date" integer NOT NULL,
	"created_at" integer NOT NULL,
	"updated_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SUBSCRIPTION_CATEGORY" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "SUBSCRIPTION_CATEGORY_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" integer NOT NULL,
	"updated_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SUBSCRIPTION_SCHEDULE" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "SUBSCRIPTION_SCHEDULE_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"billing_cycle" "billing_cycle" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"start_date" integer NOT NULL,
	"end_date" integer,
	"next_due_date" integer,
	"created_at" integer NOT NULL,
	"updated_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "USER" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "USER_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255),
	"password_hash" varchar(255),
	"full_name" varchar(255),
	"display_name" varchar(100),
	"language" "language" DEFAULT 'en',
	"currency" "currency" DEFAULT 'USD',
	"birth_year" integer,
	"profile_picture" text,
	"created_at" integer NOT NULL,
	"updated_at" integer NOT NULL,
	CONSTRAINT "USER_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "USER_AUTH_METHOD" (
	"user_id" integer NOT NULL,
	"auth_method" "auth_method" NOT NULL,
	"auth_identifier" varchar(255) NOT NULL,
	"created_at" integer NOT NULL,
	"updated_at" integer NOT NULL,
	CONSTRAINT "USER_AUTH_METHOD_auth_method_auth_identifier_pk" PRIMARY KEY("auth_method","auth_identifier")
);
--> statement-breakpoint
CREATE TABLE "USER_LOGIN_HISTORY" (
	"user_id" integer NOT NULL,
	"login_time" integer NOT NULL,
	"ip_address" varchar(45),
	"device_info" json,
	"created_at" integer NOT NULL,
	CONSTRAINT "USER_LOGIN_HISTORY_user_id_login_time_pk" PRIMARY KEY("user_id","login_time")
);
--> statement-breakpoint
ALTER TABLE "SUBSCRIPTION" ADD CONSTRAINT "SUBSCRIPTION_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SUBSCRIPTION" ADD CONSTRAINT "SUBSCRIPTION_category_id_SUBSCRIPTION_CATEGORY_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."SUBSCRIPTION_CATEGORY"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SUBSCRIPTION" ADD CONSTRAINT "SUBSCRIPTION_schedule_id_SUBSCRIPTION_SCHEDULE_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."SUBSCRIPTION_SCHEDULE"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SUBSCRIPTION_CATEGORY" ADD CONSTRAINT "SUBSCRIPTION_CATEGORY_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "USER_AUTH_METHOD" ADD CONSTRAINT "USER_AUTH_METHOD_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "USER_LOGIN_HISTORY" ADD CONSTRAINT "USER_LOGIN_HISTORY_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;