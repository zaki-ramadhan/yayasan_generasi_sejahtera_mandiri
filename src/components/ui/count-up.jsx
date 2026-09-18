"use client";

import { useEffect, useRef, useState } from "react";
import { formatRupiah, formatNumber } from "@/lib/formatters";

export function CountUp({
  to,
  from = 0,
  duration = 2.8,
  delay = 0,
  format = "raw", // "rupiah" | "number" | "raw"
  prefix = "",
  suffix = "",
  className = "",
  separator = ".",
  decimals = 0,
}) {
  const [value, setValue] = useState(from);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now() + delay * 1000;
          const endTime = startTime + duration * 1000;

          const animate = (currentTime) => {
            if (currentTime < startTime) {
              requestAnimationFrame(animate);
              return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Smooth ease-out quad/cubic curve for graceful counting
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = from + (to - from) * easedProgress;

            setValue(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(to);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [to, from, duration, delay]);

  const formatDisplay = (val) => {
    const rounded = Math.round(val);

    if (format === "rupiah") {
      return `${formatRupiah(rounded)}${suffix}`;
    }

    if (format === "number") {
      return `${prefix}${formatNumber(rounded)}${suffix}`;
    }

    const fixed = val.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return decPart !== undefined && decimals > 0
      ? `${prefix}${formattedInt},${decPart}${suffix}`
      : `${prefix}${formattedInt}${suffix}`;
  };

  return (
    <span ref={elementRef} className={`inline-block ${className}`}>
      {formatDisplay(value)}
    </span>
  );
}
