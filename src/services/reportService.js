import { AUDIT_REPORTS, TRANSPARENCY_METRICS } from "@/data/reports";

export async function getAuditReports() {
  return AUDIT_REPORTS;
}

export async function getTransparencyMetrics() {
  return TRANSPARENCY_METRICS;
}
