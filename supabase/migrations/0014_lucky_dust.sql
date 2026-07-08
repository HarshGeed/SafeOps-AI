ALTER TABLE "workers" DROP CONSTRAINT "workers_employee_code_unique";--> statement-breakpoint
ALTER TABLE "workers" DROP COLUMN "employee_code";--> statement-breakpoint
ALTER TABLE "workers" DROP COLUMN "is_archived";