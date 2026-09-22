"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * Molecule component: Radar Chart for Sharia Compliance & Governance
 * Clean monochromatic palette without neon colors or visual gimmicks.
 * @param {object} props
 * @param {Array} props.metrics
 */
export function DistributionSyariahRadarChart({ metrics = [] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={metrics}>
            <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "#334155", fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-md text-sm space-y-1">
                      <p className="font-medium text-slate-900">{data.dimension}</p>
                      <p className="text-slate-800 font-medium">
                        Skor: {data.score} / {data.fullMark}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Kepatuhan Syariah"
              dataKey="score"
              stroke="#1e3a8a"
              fill="#1e3a8a"
              fillOpacity={0.18}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-slate-600 font-normal text-center pt-1">
        Grafik Radar Standar Kepatuhan Syariah Lembaga (Skala 0–100%)
      </p>
    </div>
  );
}
