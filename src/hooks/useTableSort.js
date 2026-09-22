"use client";

import { useState, useMemo, useCallback } from "react";

/**
 * Hook reusable untuk logic sorting data tabel berbasis kolom header.
 * Mendukung sorting string, angka, tanggal, dan nested accessor / custom comparator.
 *
 * @param {Array} items - Array data mentah yang akan di-sort
 * @param {Object} [options]
 * @param {string} [options.initialSortBy=""] - Key kolom default
 * @param {string} [options.initialSortOrder="desc"] - "asc" atau "desc"
 * @param {Object} [options.customComparators={}] - Fungsi sorting kustom: { [key]: (a, b, order) => number }
 * @param {Object} [options.accessors={}] - Fungsi accessor nilai: { [key]: (item) => any }
 */
export function useTableSort(items = [], options = {}) {
  const {
    initialSortBy = "",
    initialSortOrder = "desc",
    customComparators = {},
    accessors = {},
  } = options;

  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const handleSort = useCallback((key, forcedOrder) => {
    if (!key) return;
    setSortBy((prevKey) => {
      if (prevKey === key) {
        setSortOrder((prevOrder) => {
          if (forcedOrder) return forcedOrder;
          return prevOrder === "asc" ? "desc" : "asc";
        });
        return key;
      }
      setSortOrder(forcedOrder || "desc");
      return key;
    });
  }, []);

  const resetSort = useCallback(() => {
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
  }, [initialSortBy, initialSortOrder]);

  const sortedItems = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return [];
    if (!sortBy) return items;

    const comparator = customComparators[sortBy];
    const accessor = accessors[sortBy] || ((item) => item?.[sortBy]);

    return [...items].sort((a, b) => {
      if (typeof comparator === "function") {
        return comparator(a, b, sortOrder);
      }

      const valA = accessor(a);
      const valB = accessor(b);

      if (valA == null && valB == null) return 0;
      if (valA == null) return sortOrder === "asc" ? 1 : -1;
      if (valB == null) return sortOrder === "asc" ? -1 : 1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      if (valA instanceof Date && valB instanceof Date) {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      const isDateA =
        typeof valA === "string" &&
        !isNaN(Date.parse(valA)) &&
        /^\d{4}-\d{2}/.test(valA);
      const isDateB =
        typeof valB === "string" &&
        !isNaN(Date.parse(valB)) &&
        /^\d{4}-\d{2}/.test(valB);

      if (isDateA && isDateB) {
        const timeA = new Date(valA).getTime();
        const timeB = new Date(valB).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      const comparison = strA.localeCompare(strB, "id", { numeric: true });
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [items, sortBy, sortOrder, customComparators, accessors]);

  return {
    items: sortedItems,
    sortedItems,
    sortBy,
    sortOrder,
    handleSort,
    setSortBy,
    setSortOrder,
    resetSort,
  };
}
