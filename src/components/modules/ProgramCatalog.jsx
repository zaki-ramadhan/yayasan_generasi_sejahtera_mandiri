"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search, ChevronDown, Check } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { CampaignCardSkeleton } from "@/components/shared/CampaignCardSkeleton";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 9;

const SORT_OPTIONS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "mendesak", label: "Termendesak" },
  { value: "terpopuler", label: "Terbanyak Donasi" },
  { value: "dana-terbanyak", label: "Dana Terkumpul Terbanyak" },
];

export function ProgramCatalog({ initialCampaigns = [], categories = CATEGORIES }) {
  const searchParams = useSearchParams();
  const [internalCategory, setInternalCategory] = useState(null);
  const selectedCategory = internalCategory ?? (searchParams.get("kategori") || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  // 400ms debounce for search query
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const isDebouncing = searchQuery !== debouncedSearchQuery;

  // Compute total campaign counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: initialCampaigns.length };
    categories.forEach((cat) => {
      if (cat.id !== "all") {
        counts[cat.id] = initialCampaigns.filter(
          (c) =>
            c.categoryId === cat.id ||
            c.categoryName?.toLowerCase().includes(cat.name?.toLowerCase()) ||
            (cat.slug && (c.categoryId === cat.slug || c.categorySlug === cat.slug))
        ).length;
      }
    });
    return counts;
  }, [initialCampaigns, categories]);

  const filteredCampaigns = useMemo(() => {
    let result = [...initialCampaigns];

    // Filter category
    if (selectedCategory !== "all" && selectedCategory !== "semua") {
      result = result.filter(
        (c) =>
          c.categoryId === selectedCategory ||
          c.categoryName.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (CATEGORIES.find((cat) => cat.id === selectedCategory)?.name &&
            c.categoryName
              .toLowerCase()
              .includes(
                CATEGORIES.find((cat) => cat.id === selectedCategory).name.toLowerCase()
              ))
      );
    }

    // Filter debounced search query (strictly by title, minimum 2 characters)
    if (debouncedSearchQuery.trim().length >= 2) {
      const q = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter((c) => c.title.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === "mendesak") {
      result.sort((a, b) => (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0));
    } else if (sortBy === "terpopuler") {
      result.sort((a, b) => b.donorCount - a.donorCount);
    } else if (sortBy === "dana-terbanyak") {
      result.sort((a, b) => b.collectedAmount - a.collectedAmount);
    } else {
      result.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    }

    return result;
  }, [initialCampaigns, selectedCategory, debouncedSearchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);

  const paginatedCampaigns = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCampaigns.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCampaigns, currentPage]);

  const handleCategoryChange = (catId) => {
    startTransition(() => {
      setInternalCategory(catId);
      setCurrentPage(1);
    });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value.replace(/[<>'"`$;\\{}]/g, "").slice(0, 60);
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
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
      {/* Category Tabs with Campaign Counts */}
      <CategoryTabs
        categories={categories}
        counts={categoryCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Input
            type="text"
            icon={Search}
            placeholder="Cari judul program donasi..."
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            maxLength={60}
            isLoading={isPending || isDebouncing}
            className="h-11 text-sm sm:text-base bg-white"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <span className="text-sm text-slate-700 shrink-0 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-slate-500" />
            Urutkan:
          </span>

          <div className="w-56">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="truncate">
                    {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Pilih urutan"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-slate-200 shadow-md rounded-lg p-1">
                {SORT_OPTIONS.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => handleSortChange(opt.value)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                      sortBy === opt.value
                        ? "bg-slate-100 font-semibold text-primary"
                        : "text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Grid Results or Skeleton Loading */}
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CampaignCardSkeleton key={n} />
          ))}
        </div>
      ) : paginatedCampaigns.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {paginatedCampaigns.map((camp, index) => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                highlightQuery={debouncedSearchQuery}
                priority={index === 0}
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
        <div className="text-center py-16 bg-white rounded-xl border border-slate-300 p-6 space-y-2">
          <p className="text-base font-semibold text-slate-950">Program Tidak Ditemukan</p>
          <p className="text-sm text-slate-700 max-w-sm mx-auto">
            Tidak ada program donasi yang cocok dengan kata kunci atau filter yang Anda pilih.
          </p>
          <button
            type="button"
            onClick={() => {
              handleCategoryChange("all");
              handleClearSearch();
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
