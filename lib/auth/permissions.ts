// import { UserRole } from "@/db";

export const permissions = {
  admin: [
    "dashboard",
    "admin",
    "workers",
    "machines",
    "sensors",
    "permits",
    "incidents",
    "maintenance",
    "analytics",
    "documents",
    "settings",
  ],

  supervisor: [
    "dashboard",
    "workers",
    "machines",
    "permits",
    "incidents",
    "maintenance",
    "documents",
    "settings",
  ],

  safety_officer: [
    "dashboard",
    "workers",
    "incidents",
    "alerts",
    "analytics",
    "documents",
    "settings",
  ],

  worker: [
    "dashboard",
    "my-permits",
    "my-incidents",
    "documents",
    "settings",
  ],
} as const;

export type Permission =
  (typeof permissions)[keyof typeof permissions][number];