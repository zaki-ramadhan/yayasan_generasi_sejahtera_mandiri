import { CAMPAIGNS } from "@/data/campaigns";

export async function getCampaigns({ category = "all", search = "", sort = "terbaru" } = {}) {
  let filtered = [...CAMPAIGNS];

  if (category && category !== "all" && category !== "semua") {
    filtered = filtered.filter((c) => c.categoryId === category || c.categoryName.toLowerCase().includes(category.toLowerCase()));
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
    // Default terbaru
    filtered.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  }

  return filtered;
}

export async function getFeaturedCampaigns() {
  return CAMPAIGNS.filter((c) => c.isFeatured);
}

export async function getUrgentCampaigns() {
  return CAMPAIGNS.filter((c) => c.isUrgent);
}

export async function getCampaignBySlug(slug) {
  if (!slug) return null;
  return CAMPAIGNS.find((c) => c.slug === slug) || null;
}
