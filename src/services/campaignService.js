import prisma from "@/lib/prisma";
import { CAMPAIGNS } from "@/data/campaigns";

function formatCampaignFromDb(c) {
  if (!c) return null;
  return {
    ...c,
    endDate: c.endDate instanceof Date ? c.endDate.toISOString() : c.endDate,
    createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
    updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
    categoryName: c.category?.name || "Program Umum",
    categorySlug: c.category?.slug || "",
    updates: (c.updates || []).map((u) => ({
      ...u,
      date: u.date instanceof Date ? u.date.toISOString().split("T")[0] : u.date,
    })),
    recentDonors: (c.donations || []).map((d) => ({
      id: d.id,
      name: d.isAnonymous ? "Hamba Allah" : d.donorName,
      amount: d.amount,
      date: d.paidAt
        ? d.paidAt instanceof Date
          ? d.paidAt.toISOString()
          : d.paidAt
        : d.createdAt instanceof Date
        ? d.createdAt.toISOString()
        : d.createdAt,
      prayer: d.prayer || "",
      aminCount: 0,
    })),
  };
}

export async function getCampaigns({ category = "all", search = "", sort = "terbaru" } = {}) {
  try {
    const where = {
      status: "ACTIVE",
    };

    if (category && category !== "all" && category !== "semua") {
      where.OR = [
        { categoryId: category },
        { category: { slug: category } },
        { category: { name: { contains: category, mode: "insensitive" } } },
      ];
    }

    if (search && search.trim().length >= 2) {
      where.title = { contains: search.trim(), mode: "insensitive" };
    }

    let orderBy = { endDate: "desc" };
    if (sort === "mendesak") {
      orderBy = [{ isUrgent: "desc" }, { endDate: "asc" }];
    } else if (sort === "terpopuler") {
      orderBy = { donorCount: "desc" };
    } else if (sort === "dana-terbanyak") {
      orderBy = { collectedAmount: "desc" };
    }

    const dbCampaigns = await prisma.campaign.findMany({
      where,
      orderBy,
      include: {
        category: true,
        updates: { orderBy: { date: "desc" } },
        donations: {
          where: { status: "PAID" },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (dbCampaigns && dbCampaigns.length > 0) {
      return dbCampaigns.map(formatCampaignFromDb);
    }
  } catch (error) {
    console.warn("Prisma getCampaigns fallback:", error.message);
  }

  // Fallback to static data
  let filtered = [...CAMPAIGNS];

  if (category && category !== "all" && category !== "semua") {
    filtered = filtered.filter(
      (c) => c.categoryId === category || c.categoryName.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (search && search.trim().length >= 2) {
    const query = search.toLowerCase().trim();
    filtered = filtered.filter((c) => c.title.toLowerCase().includes(query));
  }

  if (sort === "mendesak") {
    filtered.sort((a, b) => (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0));
  } else if (sort === "terpopuler") {
    filtered.sort((a, b) => b.donorCount - a.donorCount);
  } else if (sort === "dana-terbanyak") {
    filtered.sort((a, b) => b.collectedAmount - a.collectedAmount);
  } else {
    filtered.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  }

  return filtered;
}

export async function getFeaturedCampaigns() {
  try {
    const dbFeatured = await prisma.campaign.findMany({
      where: { isFeatured: true, status: "ACTIVE" },
      include: {
        category: true,
        updates: true,
        donations: { where: { status: "PAID" }, take: 5, orderBy: { createdAt: "desc" } },
      },
    });
    if (dbFeatured && dbFeatured.length > 0) {
      return dbFeatured.map(formatCampaignFromDb);
    }
  } catch (error) {
    console.warn("Prisma getFeaturedCampaigns fallback:", error.message);
  }
  return CAMPAIGNS.filter((c) => c.isFeatured);
}

export async function getUrgentCampaigns() {
  try {
    const dbUrgent = await prisma.campaign.findMany({
      where: { isUrgent: true, status: "ACTIVE" },
      include: {
        category: true,
        updates: true,
        donations: { where: { status: "PAID" }, take: 5, orderBy: { createdAt: "desc" } },
      },
    });
    if (dbUrgent && dbUrgent.length > 0) {
      return dbUrgent.map(formatCampaignFromDb);
    }
  } catch (error) {
    console.warn("Prisma getUrgentCampaigns fallback:", error.message);
  }
  return CAMPAIGNS.filter((c) => c.isUrgent);
}

export async function getCampaignBySlug(slug) {
  if (!slug) return null;
  try {
    const dbCampaign = await prisma.campaign.findUnique({
      where: { slug },
      include: {
        category: true,
        updates: { orderBy: { date: "desc" } },
        donations: {
          where: { status: "PAID" },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });
    if (dbCampaign) {
      return formatCampaignFromDb(dbCampaign);
    }
  } catch (error) {
    console.warn("Prisma getCampaignBySlug fallback:", error.message);
  }
  return CAMPAIGNS.find((c) => c.slug === slug) || null;
}
