"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

export function PrayerInputBar({ onSend, className }) {
  const [text, setText] = useState("");
  const hasText = text.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    onSend?.(text.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <div className="flex-1 flex items-center bg-white border border-slate-300 focus-within:border-primary/60 rounded-full px-4 py-2.5 transition-colors">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tulis doa kebaikan Anda..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          maxLength={150}
          autoComplete="off"
          inputMode="text"
        />
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={!hasText}
        aria-label="Kirim doa"
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:shadow-none"
      >
        <SendHorizonal className="w-5 h-5" />
      </button>
    </div>
  );
}
