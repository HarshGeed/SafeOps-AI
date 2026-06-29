CREATE TYPE "public"."machine_status" AS ENUM('running', 'idle', 'maintenance', 'fault', 'offline');--> statement-breakpoint
CREATE TYPE "public"."machine_type" AS ENUM('boiler', 'compressor', 'pump', 'conveyor', 'generator', 'motor', 'tank', 'reactor', 'other');--> statement-breakpoint
CREATE TABLE "machines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zone_id" uuid NOT NULL,
	"machine_code" varchar(30) NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"type" "machine_type" DEFAULT 'other' NOT NULL,
	"manufacturer" varchar(100),
	"model" varchar(100),
	"serial_number" varchar(100),
	"status" "machine_status" DEFAULT 'running' NOT NULL,
	"health_score" integer DEFAULT 100 NOT NULL,
	"installation_date" timestamp with time zone,
	"last_service" timestamp with time zone,
	"next_service" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "machines_machine_code_unique" UNIQUE("machine_code"),
	CONSTRAINT "machines_serial_number_unique" UNIQUE("serial_number")
);
--> statement-breakpoint
ALTER TABLE "machines" ADD CONSTRAINT "machines_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE cascade ON UPDATE no action;