"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Attaches a scroll listener to a container ref.
 * Calls onLoadMore when the user scrolls within `threshold`px of the bottom.
 *
 * @param {Function} onLoadMore - called when near bottom; must be stable (useCallback)
 * @param {number}   threshold  - px from bottom before trigger (default 60)
 */
export function useScrollLoadMore({ onLoadMore, threshold = 60 }) {
  const scrollRef = useRef(null);

  const handler = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
      onLoadMore();
    }
  }, [onLoadMore, threshold]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [handler]);

  return scrollRef;
}
