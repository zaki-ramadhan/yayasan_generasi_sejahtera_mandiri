import Link from "next/link";
import { ArticleCard } from "@/components/shared/ArticleCard";

/**
 * Content-Based Recommendation Algorithm
 * Scores related articles based on category match (+2.0) and tag overlap (+1.5 per tag)
 */
export function getRelatedArticles(currentArticle, allArticles = [], limit = 2) {
  if (!currentArticle || !allArticles.length) return [];

  const currentTags = Array.isArray(currentArticle.tags) ? currentArticle.tags : [];
  const candidates = allArticles.filter((art) => art.id !== currentArticle.id);

  const scored = candidates.map((art) => {
    let score = 0;
    // Category match bonus
    if (art.category && currentArticle.category && art.category === currentArticle.category) {
      score += 2.0;
    }

    // Tag overlap bonus
    if (Array.isArray(art.tags) && currentTags.length > 0) {
      const commonTags = art.tags.filter((t) =>
        currentTags.some((ct) => ct.toLowerCase() === t.toLowerCase())
      );
      score += commonTags.length * 1.5;
    }

    return { article: art, score };
  });

  // Sort by highest score first, then newest published date
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.article.publishedAt) - new Date(a.article.publishedAt);
  });

  return scored.slice(0, limit).map((s) => s.article);
}

export function RelatedArticles({ currentArticle, allArticles = [] }) {
  const related = getRelatedArticles(currentArticle, allArticles, 2);

  if (!related || related.length === 0) return null;

  return (
    <section className="space-y-4 pt-6 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-slate-950">
          Artikel Terkait
        </h3>
        <Link
          href="/artikel"
          className="text-xs sm:text-sm font-medium text-primary hover:underline"
        >
          Lihat Semua Artikel
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {related.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </section>
  );
}
