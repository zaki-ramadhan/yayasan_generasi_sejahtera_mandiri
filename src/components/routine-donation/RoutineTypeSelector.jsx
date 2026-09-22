"use client";

import { ROUTINE_TYPE_OPTIONS } from "@/data/routineDonation";
import { RadioIndicator } from "@/components/ui/RadioIndicator";
import { cn } from "@/lib/utils";

/**
 * Routine Type selector (Pengingat WA vs Donasi Otomatis)
 * @param {object} item - Program item config
 * @param {Function} onChange - (itemId, field, value) handler
 * @param {boolean} [isFirstIndex] - Attach tour ID if first index
 */
export function RoutineTypeSelector({ item, onChange, isFirstIndex = false }) {
  const currentRoutineType = item.routineType || "REMINDER_ONLY";

  return (
    <div id={isFirstIndex ? "tour-routine-type" : undefined} className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-800 block">
        Model pelaksanaan donasi
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ROUTINE_TYPE_OPTIONS.map((opt) => {
          const isSelected = currentRoutineType === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(item.id, "routineType", opt.value)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between",
                isSelected
                  ? "bg-blue-50/70 border-primary ring-1 ring-primary text-slate-900"
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-sm font-semibold text-slate-900">
                  {opt.title}
                </span>
                <RadioIndicator isSelected={isSelected} size="sm" />
              </div>
              <p className="mt-1 text-sm text-slate-600 font-normal leading-relaxed">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
