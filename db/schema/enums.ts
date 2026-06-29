import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "safety_officer",
  "supervisor",
  "worker",
]);

export const accountStatusEnum = pgEnum("account_status", [
  "pending",
  "active",
  "rejected",
]);

export const workerStatusEnum = pgEnum("worker_status", [
  "working",
  "break",
  "offline",
  "emergency",
]);

export const riskLevelEnum = pgEnum("risk_level", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const departmentEnum = pgEnum("department", [
  "operations",
  "maintenance",
  "electrical",
  "mechanical",
  "safety",
  "quality",
  "production",
]);

export const machineStatusEnum = pgEnum("machine_status", [
  "running",
  "idle",
  "maintenance",
  "fault",
  "offline",
]);

export const machineTypeEnum = pgEnum("machine_type", [
  "boiler",
  "compressor",
  "pump",
  "conveyor",
  "generator",
  "motor",
  "tank",
  "reactor",
  "other",
]);

export const machineCriticalityEnum = pgEnum("machine_criticality", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const sensorTypeEnum = pgEnum("sensor_type", [
  "temperature",
  "pressure",
  "gas",
  "humidity",
  "smoke",
  "vibration",
  "flow",
  "voltage",
  "current",
  "other",
]);

export const sensorStatusEnum = pgEnum("sensor_status", [
  "active",
  "inactive",
  "maintenance",
  "fault",
]);

export const sensorUnitEnum = pgEnum("sensor_unit", [
  "celsius",
  "bar",
  "ppm",
  "percent",
  "volt",
  "ampere",
  "mm_per_sec",
  "liter_per_minute",
  "other",
]);

export const maintenanceStatusEnum = pgEnum("maintenance_status", [
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
]);

export const maintenancePriorityEnum = pgEnum("maintenance_priority", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const maintenanceTypeEnum = pgEnum("maintenance_type", [
  "preventive",
  "corrective",
  "predictive",
  "emergency",
]);

export const permitTypeEnum = pgEnum("permit_type", [
  "hot_work",
  "confined_space",
  "electrical",
  "work_at_height",
  "lifting_operation",
  "excavation",
  "chemical_handling",
  "general",
]);

export const permitStatusEnum = pgEnum("permit_status", [
  "pending",
  "approved",
  "rejected",
  "expired",
  "cancelled",
  "completed",
]);

export const permitPriorityEnum = pgEnum("permit_priority", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const alertSeverityEnum = pgEnum("alert_severity", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const alertStatusEnum = pgEnum("alert_status", [
  "active",
  "acknowledged",
  "resolved",
]);

export const alertSourceEnum = pgEnum("alert_source", [
  "sensor",
  "ai",
  "worker",
  "machine",
  "permit",
]);

export const incidentSeverityEnum = pgEnum("incident_severity", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const incidentStatusEnum = pgEnum("incident_status", [
  "open",
  "investigating",
  "resolved",
  "closed",
]);

export const incidentTypeEnum = pgEnum("incident_type", [
  "fire",
  "gas_leak",
  "chemical_spill",
  "electrical",
  "equipment_failure",
  "worker_injury",
  "near_miss",
  "other",
]);

export const predictionTypeEnum = pgEnum("prediction_type", [
  "risk_assessment",
  "predictive_maintenance",
  "permit_validation",
  "incident_prediction",
  "worker_safety",
]);

export const predictionStatusEnum = pgEnum("prediction_status", [
  "pending",
  "completed",
  "failed",
]);

export const documentTypeEnum = pgEnum("document_type", [
  "sop",
  "manual",
  "p_and_id",
  "inspection_report",
  "maintenance_record",
  "permit",
  "incident_report",
  "other",
]);