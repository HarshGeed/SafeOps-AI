ALTER TABLE "workers" ADD COLUMN "department" "department" NOT NULL;--> statement-breakpoint
ALTER TABLE "workers" ADD COLUMN "designation" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "department";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "designation";