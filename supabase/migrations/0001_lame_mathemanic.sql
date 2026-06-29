CREATE TYPE "public"."account_status" AS ENUM('pending', 'active', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."risk_level" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'safety_officer', 'supervisor', 'worker');--> statement-breakpoint
CREATE TYPE "public"."worker_status" AS ENUM('working', 'break', 'offline', 'emergency');--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" varchar(30),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"country_code" varchar(5),
	"phone_number" varchar(20),
	"profile_image" varchar(500),
	"department" varchar(100),
	"designation" varchar(100),
	"role" "user_role" DEFAULT 'worker' NOT NULL,
	"status" "account_status" DEFAULT 'pending' NOT NULL,
	"approved_by" uuid,
	"approved_at" timestamp with time zone,
	"last_login" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_employee_id_unique" UNIQUE("employee_id"),
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
