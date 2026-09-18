import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Highlights matching search substring in text safely.
 * Uses a soft pastel amber highlighter style (bg-amber-200/90 text-amber-950).
 */
export function HighlightText({
  text = "",
  highlight = "",
  className = "",
  highlightClassName = "",
}) {
  if (!text || typeof text !== "string") return null;
  if (!highlight || typeof highlight !== "string" || !highlight.trim()) {
    return <span className={className}>{text}</span>;
  }

  const cleanQuery = highlight.trim();
  if (cleanQuery.length < 2) {
    return <span className={className}>{text}</span>;
  }
  const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;
        const isMatch = part.toLowerCase() === cleanQuery.toLowerCase();
        return isMatch ? (
          <mark
            key={index}
            className={cn(
              "bg-amber-200 text-inherit p-0 m-0",
              highlightClassName
            )}
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        );
      })}
    </span>
  );
}
