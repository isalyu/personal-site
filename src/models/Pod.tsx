import type { LogEntry } from "./LogEntry";

export type Pod = {
  id: string;
  status: "Running" | "Completed" | "Pending" | "Error" | "Unknown";
  ready?: string;
  restarts?: number;
  startedAt?: string;
  logs: LogEntry[];
};
