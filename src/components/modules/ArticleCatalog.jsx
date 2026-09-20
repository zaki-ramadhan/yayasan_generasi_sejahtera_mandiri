"use client";

import { useState, useMemo, useTransition } from "react";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { ARTICLE_CATEGORIES } from "@/data/articles";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 8;

const SORT_OPTIONS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "terpopuler", label: "Terbanyak Disukai" },
  { value: "a-z", label: "Judul (A-Z)" },
];

export function ArticleCatalog({ initialArticles = [], categories = ARTICLE_CATEGORIES }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useDebounce(searchQuery, 350);
  const isDebouncing = searchQuery !== debouncedSearch;

  // Calculate dynamic article counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: initialArticles.length };
    categories.forEach((cat) => {
      if (cat.id !== "all") {
        counts[cat.id] = initialArticles.filter((a) => a.category === cat.id || a.category === cat.name).length;
      }
    });
    return counts;
  }, [initialArticles, categories]);

  const filteredArticles = useMemo(() => {
    let result = [...initialArticles];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((art) => art.category === selectedCategory);
    }

    // Search filter (strictly by title, minimum 2 characters)
    if (debouncedSearch.trim().length >= 2) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter((art) => art.title.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === "terpopuler") {
      result.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    } else if (sortBy === "a-z") {
      result.sort((a, b) => a.title.localeCompare(b.title, "id"));
    } else {
      result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    return result;
  }, [initialArticles, selectedCategory, debouncedSearch, sortBy]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleCategoryChange = (catId) => {
    startTransition(() => {
      setSelectedCategory(catId);
      setCurrentPage(1);
    });
  };

  const handleSearchChange = (val) => {
    const sanitized = (val || "").replace(/[<>'"`$;\\{}]/g, "").slice(0, 60);
    setSearchQuery(sanitized);
    setCurrentPage(1);
  };

  const handleSortChange = (val) => {
    startTransition(() => {
      setSortBy(val);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs with Dynamic Article Counts */}
      <CategoryTabs
        categories={categories}
        counts={categoryCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Search Input with Debounce & Loading state + Sorting Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <div className="w-full sm:max-w-md">
          <Input
            type="text"
            icon={Search}
            placeholder="Cari judul artikel..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onClear={() => handleSearchChange("")}
            maxLength={60}
            isLoading={isPending || isDebouncing}
            className="h-11 text-sm sm:text-base bg-white"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-sm text-slate-700 flex items-center gap-1.5 shrink-0 font-medium">
            <Filter className="w-4 h-4 text-slate-500" />
            Urutkan:
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-11 px-3.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center gap-2 min-w-[190px] justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              >
                <span className="truncate">
                  {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Terbaru"}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 p-1">
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => handleSortChange(opt.value)}
                  className="cursor-pointer text-sm font-medium flex items-center justify-between py-2.5 rounded-md"
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check className="w-4 h-4 text-primary shrink-0" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Horizontal Mini Cards Grid (Side-by-Side Media Stack Card) */}
      {paginatedArticles.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3">
            {paginatedArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                highlightQuery={debouncedSearch}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-300 rounded-xl bg-slate-50 space-y-2">
          <p className="text-slate-900 font-semibold text-base">
            Tidak ada artikel ditemukan
          </p>
          <p className="text-sm text-slate-600">
            Coba kata kunci lain atau pilih kategori lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className="text-sm font-semibold text-primary hover:underline pt-2 cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}
