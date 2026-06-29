ALTER TABLE "machines" ADD COLUMN "last_service" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "next_service" timestamp with time zone;