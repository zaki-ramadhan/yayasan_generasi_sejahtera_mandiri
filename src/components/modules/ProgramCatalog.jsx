"use client";

import { CATEGORIES } from "@/data/categories";
import { PROGRAM_SORT_OPTIONS } from "@/data/sortOptions";
import { useCatalogState } from "@/hooks/useCatalogState";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { CampaignCardSkeleton } from "@/components/shared/CampaignCardSkeleton";
import { CatalogSearchBar } from "@/components/shared/CatalogSearchBar";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 9;

function filterCampaign(campaign, { category, searchQuery, categories }) {
  if (category !== "all" && category !== "semua") {
    const catName = categories.find((c) => c.id === category)?.name ?? "";
    const matchCategory =
      campaign.categoryId === category ||
      campaign.categoryName?.toLowerCase().includes(category.toLowerCase()) ||
      (catName && campaign.categoryName?.toLowerCase().includes(catName.toLowerCase()));
    if (!matchCategory) return false;
  }

  if (searchQuery.trim().length >= 2) {
    const q = searchQuery.toLowerCase().trim();
    if (!campaign.title.toLowerCase().includes(q)) return false;
  }

  return true;
}

function sortCampaigns(items, sortBy) {
  const sorted = [...items];
  if (sortBy === "mendesak") {
    sorted.sort((a, b) => (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0));
  } else if (sortBy === "terpopuler") {
    sorted.sort((a, b) => b.donorCount - a.donorCount);
  } else if (sortBy === "dana-terbanyak") {
    sorted.sort((a, b) => b.collectedAmount - a.collectedAmount);
  } else {
    sorted.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  }
  return sorted;
}

export function ProgramCatalog({ initialCampaigns = [], categories = CATEGORIES }) {
  const {
    selectedCategory,
    searchQuery,
    debouncedSearchQuery,
    sortBy,
    currentPage,
    isPending,
    isDebouncing,
    categoryCounts,
    paginatedItems,
    totalPages,
    handlers,
  } = useCatalogState({
    items: initialCampaigns,
    filterFn: filterCampaign,
    sortFn: sortCampaigns,
    itemsPerPage: ITEMS_PER_PAGE,
    categories,
    syncUrlCategory: true,
  });

  return (
    <div className="space-y-6">
      <CategoryTabs
        categories={categories}
        counts={categoryCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={handlers.onCategoryChange}
      />

      <CatalogSearchBar
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOptions={PROGRAM_SORT_OPTIONS}
        onSearch={handlers.onSearchChange}
        onClear={handlers.onClearSearch}
        onSort={handlers.onSortChange}
        isLoading={isPending || isDebouncing}
        searchPlaceholder="Cari judul program donasi..."
      />

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CampaignCardSkeleton key={n} />
          ))}
        </div>
      ) : paginatedItems.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
            {paginatedItems.map((camp, index) => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                highlightQuery={debouncedSearchQuery}
                priority={index === 0}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlers.onPageChange}
            className="mt-3"
          />
        </div>
      ) : (
        <EmptyState
          title="Program Tidak Ditemukan"
          description="Tidak ada program donasi yang cocok dengan kata kunci atau filter yang Anda pilih."
          variant="card"
          action={
            <button
              type="button"
              onClick={handlers.onReset}
              className="text-sm font-semibold text-primary hover:underline pt-1 cursor-pointer"
            >
              Reset Semua Filter
            </button>
          }
        />
      )}
    </div>
  );
}
