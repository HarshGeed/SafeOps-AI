CREATE TYPE "public"."machine_criticality" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "criticality" "machine_criticality" DEFAULT 'medium' NOT NULL;--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "last_health_check" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "machines" DROP COLUMN "last_service";--> statement-breakpoint
ALTER TABLE "machines" DROP COLUMN "next_service";