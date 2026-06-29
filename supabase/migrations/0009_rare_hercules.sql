CREATE TYPE "public"."alert_severity" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."alert_source" AS ENUM('sensor', 'ai', 'worker', 'machine', 'permit');--> statement-breakpoint
CREATE TYPE "public"."alert_status" AS ENUM('active', 'acknowledged', 'resolved');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('sop', 'manual', 'p_and_id', 'inspection_report', 'maintenance_record', 'permit', 'incident_report', 'other');--> statement-breakpoint
CREATE TYPE "public"."incident_severity" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."incident_status" AS ENUM('open', 'investigating', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."incident_type" AS ENUM('fire', 'gas_leak', 'chemical_spill', 'electrical', 'equipment_failure', 'worker_injury', 'near_miss', 'other');--> statement-breakpoint
CREATE TYPE "public"."maintenance_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."maintenance_status" AS ENUM('scheduled', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."maintenance_type" AS ENUM('preventive', 'corrective', 'predictive', 'emergency');--> statement-breakpoint
CREATE TYPE "public"."permit_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."permit_status" AS ENUM('pending', 'approved', 'rejected', 'expired', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."permit_type" AS ENUM('hot_work', 'confined_space', 'electrical', 'work_at_height', 'lifting_operation', 'excavation', 'chemical_handling', 'general');--> statement-breakpoint
CREATE TYPE "public"."prediction_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."prediction_type" AS ENUM('risk_assessment', 'predictive_maintenance', 'permit_validation', 'incident_prediction', 'worker_safety');--> statement-breakpoint
CREATE TABLE "ai_predictions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "prediction_type" NOT NULL,
	"status" "prediction_status" DEFAULT 'completed' NOT NULL,
	"zone_id" uuid,
	"machine_id" uuid,
	"generated_by" uuid,
	"risk_score" integer NOT NULL,
	"confidence_score" double precision NOT NULL,
	"prediction" text NOT NULL,
	"recommendation" text NOT NULL,
	"reasoning" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "alerts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"severity" "alert_severity" NOT NULL,
	"status" "alert_status" DEFAULT 'active' NOT NULL,
	"source" "alert_source" NOT NULL,
	"zone_id" uuid NOT NULL,
	"machine_id" uuid,
	"acknowledged_by" uuid,
	"acknowledged_at" timestamp with time zone,
	"resolved_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"type" "document_type" NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_path" varchar(500) NOT NULL,
	"mime_type" varchar(100),
	"file_size" varchar(20),
	"version" varchar(20) DEFAULT '1.0',
	"is_active" boolean DEFAULT true NOT NULL,
	"uploaded_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incidents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"incident_number" varchar(30) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"type" "incident_type" NOT NULL,
	"severity" "incident_severity" NOT NULL,
	"status" "incident_status" DEFAULT 'open' NOT NULL,
	"zone_id" uuid NOT NULL,
	"machine_id" uuid,
	"reported_by" uuid NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"resolved_at" timestamp with time zone,
	"root_cause" text,
	"corrective_action" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "incidents_incident_number_unique" UNIQUE("incident_number")
);
--> statement-breakpoint
CREATE TABLE "maintenance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"machine_id" uuid NOT NULL,
	"assigned_to" uuid,
	"title" varchar(200) NOT NULL,
	"description" text,
	"type" "maintenance_type" DEFAULT 'preventive' NOT NULL,
	"priority" "maintenance_priority" DEFAULT 'medium' NOT NULL,
	"status" "maintenance_status" DEFAULT 'scheduled' NOT NULL,
	"scheduled_at" timestamp with time zone,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"permit_number" varchar(50) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"type" "permit_type" NOT NULL,
	"priority" "permit_priority" DEFAULT 'medium' NOT NULL,
	"status" "permit_status" DEFAULT 'pending' NOT NULL,
	"zone_id" uuid NOT NULL,
	"machine_id" uuid,
	"requested_by" uuid NOT NULL,
	"approved_by" uuid,
	"valid_from" timestamp with time zone NOT NULL,
	"valid_until" timestamp with time zone NOT NULL,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "permits_permit_number_unique" UNIQUE("permit_number")
);
--> statement-breakpoint
ALTER TABLE "ai_predictions" ADD CONSTRAINT "ai_predictions_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_predictions" ADD CONSTRAINT "ai_predictions_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_predictions" ADD CONSTRAINT "ai_predictions_generated_by_profiles_id_fk" FOREIGN KEY ("generated_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_acknowledged_by_profiles_id_fk" FOREIGN KEY ("acknowledged_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_profiles_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_reported_by_profiles_id_fk" FOREIGN KEY ("reported_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_assigned_to_workers_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."workers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permits" ADD CONSTRAINT "permits_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permits" ADD CONSTRAINT "permits_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permits" ADD CONSTRAINT "permits_requested_by_profiles_id_fk" FOREIGN KEY ("requested_by") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permits" ADD CONSTRAINT "permits_approved_by_profiles_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;