"use client";

import { MapPin, Briefcase, Calendar, GraduationCap } from "lucide-react";
import { CareerMetaItem } from "./CareerMetaItem";
import { CareerNewBadge } from "./CareerNewBadge";
import { CareerApplyButton } from "./CareerApplyButton";
import { isPostedToday } from "@/data/careers";

/**
 * Molecule component: Header section inside the job detail panel
 * Compact spacing, font-weight max medium for labels/buttons, font-semibold for title only.
 * Shows clean 'Baru' badge chip without dots if posted today.
 * @param {object} props
 * @param {object} props.job
 */
export function CareerDetailHeader({ job }) {
  const isNew = isPostedToday(job.publishedDate);

  return (
    <div className="space-y-3.5 pb-4 border-b border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3.5">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-950 leading-tight">
              {job.title}
            </h1>
            {isNew && <CareerNewBadge />}
          </div>
          <p className="text-sm font-medium text-slate-600">
            {job.department}
          </p>
        </div>

        {/* Action Controls: Direct Google Form Link */}
        <div className="shrink-0">
          <CareerApplyButton url={job.applyUrl} label="Lamar Posisi Ini" />
        </div>
      </div>

      {/* Detail Metadata: Zero dot characters, spaced cleanly */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-0.5">
        <CareerMetaItem icon={MapPin} text={job.location} />
        <CareerMetaItem icon={Briefcase} text={job.type} />
        <CareerMetaItem icon={GraduationCap} text={job.experience} />
        <CareerMetaItem
          icon={Calendar}
          text={`Batas lamaran: ${job.deadline}`}
        />
      </div>
    </div>
  );
}
