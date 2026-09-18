import prisma from "@/lib/prisma";
import { ARTICLES, ARTICLE_CATEGORIES } from "@/data/articles";

function formatArticleFromDb(a) {
  if (!a) return null;
  return {
    ...a,
    publishedAt: a.publishedAt instanceof Date ? a.publishedAt.toISOString() : a.publishedAt,
    tags: Array.isArray(a.tags) ? a.tags : [],
  };
}

export async function getArticles({ category = "all", search = "", limit } = {}) {
  try {
    const where = {};

    if (category && category !== "all" && category !== "Semua Kategori") {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (search && search.trim().length >= 2) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { excerpt: { contains: search.trim(), mode: "insensitive" } },
        { content: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    const dbArticles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit || undefined,
    });

    if (dbArticles && dbArticles.length > 0) {
      return dbArticles.map(formatArticleFromDb);
    }
  } catch (error) {
    console.warn("Prisma getArticles fallback:", error.message);
  }

  // Fallback to static articles
  let filtered = [...ARTICLES];

  if (category && category !== "all" && category !== "Semua Kategori") {
    filtered = filtered.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim().length >= 2) {
    const query = search.toLowerCase().trim();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.content.toLowerCase().includes(query)
    );
  }

  if (limit && limit > 0) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

export async function getArticleBySlug(slug) {
  if (!slug) return null;
  try {
    const dbArticle = await prisma.article.findUnique({
      where: { slug },
    });
    if (dbArticle) {
      return formatArticleFromDb(dbArticle);
    }
  } catch (error) {
    console.warn("Prisma getArticleBySlug fallback:", error.message);
  }
  return ARTICLES.find((a) => a.slug === slug) || null;
}

export async function getArticleCategories() {
  try {
    const categories = await prisma.article.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    if (categories && categories.length > 0) {
      return [
        { id: "all", name: "Semua Kategori" },
        ...categories.map((c) => ({ id: c.category, name: c.category })),
      ];
    }
  } catch (error) {
    console.warn("Prisma getArticleCategories fallback:", error.message);
  }
  return ARTICLE_CATEGORIES;
}

export async function updateArticleReaction(slug, type = "like") {
  try {
    const field = type === "dislike" ? "dislikeCount" : "likeCount";
    const updated = await prisma.article.update({
      where: { slug },
      data: {
        [field]: { increment: 1 },
      },
    });
    return formatArticleFromDb(updated);
  } catch (error) {
    console.warn("Prisma updateArticleReaction fallback:", error.message);
    return null;
  }
}
