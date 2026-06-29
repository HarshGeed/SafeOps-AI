CREATE TABLE "sensor_readings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sensor_id" uuid NOT NULL,
	"value" double precision NOT NULL,
	"recorded_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_sensor_id_sensors_id_fk" FOREIGN KEY ("sensor_id") REFERENCES "public"."sensors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sensor_idx" ON "sensor_readings" USING btree ("sensor_id");--> statement-breakpoint
CREATE INDEX "recorded_at_idx" ON "sensor_readings" USING btree ("recorded_at");--> statement-breakpoint
CREATE INDEX "sensor_recorded_idx" ON "sensor_readings" USING btree ("sensor_id","recorded_at");