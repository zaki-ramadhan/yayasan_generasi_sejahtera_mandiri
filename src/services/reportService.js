import prisma from "@/lib/prisma";
import { AUDIT_REPORTS, TRANSPARENCY_METRICS } from "@/data/reports";

export async function getAuditReports() {
  try {
    const dbReports = await prisma.auditReport.findMany({
      orderBy: { year: "desc" },
    });
    if (dbReports && dbReports.length > 0) {
      return dbReports;
    }
  } catch (error) {
    console.warn("Prisma getAuditReports fallback:", error.message);
  }
  return AUDIT_REPORTS;
}

export async function getTransparencyMetrics() {
  try {
    const [campaignCount, donationsAgg] = await Promise.all([
      prisma.campaign.count({ where: { status: "ACTIVE" } }),
      prisma.donation.aggregate({
        _sum: { amount: true },
        _count: { id: true },
        where: { status: "PAID" },
      }),
    ]);

    const dynamicTotal = donationsAgg._sum.amount || 0;
    const baseTotal = TRANSPARENCY_METRICS.totalDonationsAllTime;

    return {
      ...TRANSPARENCY_METRICS,
      totalDonationsAllTime: Math.max(baseTotal, dynamicTotal),
      activeCampaignsCount: campaignCount || TRANSPARENCY_METRICS.activeCampaignsCount,
    };
  } catch (error) {
    console.warn("Prisma getTransparencyMetrics fallback:", error.message);
  }
  return TRANSPARENCY_METRICS;
}
