CREATE TYPE "public"."sensor_status" AS ENUM('active', 'inactive', 'maintenance', 'fault');--> statement-breakpoint
CREATE TYPE "public"."sensor_type" AS ENUM('temperature', 'pressure', 'gas', 'humidity', 'smoke', 'vibration', 'flow', 'voltage', 'current', 'other');--> statement-breakpoint
CREATE TYPE "public"."sensor_unit" AS ENUM('celsius', 'bar', 'ppm', 'percent', 'volt', 'ampere', 'mm_per_sec', 'liter_per_minute', 'other');--> statement-breakpoint
CREATE TABLE "sensors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"machine_id" uuid NOT NULL,
	"sensor_code" varchar(30) NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" "sensor_type" NOT NULL,
	"unit" "sensor_unit" NOT NULL,
	"status" "sensor_status" DEFAULT 'active' NOT NULL,
	"min_threshold" double precision,
	"max_threshold" double precision,
	"current_value" double precision,
	"is_critical" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sensors_sensor_code_unique" UNIQUE("sensor_code")
);
--> statement-breakpoint
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;