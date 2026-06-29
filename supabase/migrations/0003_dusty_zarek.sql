CREATE TYPE "public"."department" AS ENUM('operations', 'maintenance', 'electrical', 'mechanical', 'safety', 'quality', 'production');--> statement-breakpoint
CREATE TABLE "workers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"zone_id" uuid,
	"employee_code" varchar(30) NOT NULL,
	"department" "department" NOT NULL,
	"designation" varchar(100) NOT NULL,
	"status" "worker_status" DEFAULT 'working' NOT NULL,
	"helmet_detected" boolean DEFAULT true NOT NULL,
	"last_seen" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workers_profile_id_unique" UNIQUE("profile_id"),
	CONSTRAINT "workers_employee_code_unique" UNIQUE("employee_code")
);
--> statement-breakpoint
ALTER TABLE "workers" ADD CONSTRAINT "workers_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workers" ADD CONSTRAINT "workers_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE set null ON UPDATE no action;