"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah, formatNumber } from "@/lib/formatters";

/**
 * Molecule component: Smooth Area Chart for monthly distribution trend
 * Clean deep navy palette without harsh/colorful accents. Minimum text-sm.
 * @param {object} props
 * @param {Array} props.data
 */
export function DistributionAreaChart({ data = [] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Chart Canvas */}
      <div className="w-full h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="distributionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#475569"
              tickLine={false}
              tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
              dy={6}
            />
            <YAxis
              stroke="#475569"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#475569" }}
              tickFormatter={(v) => `${(v / 1000000).toFixed(0)} jt`}
              width={50}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-md text-sm space-y-1">
                      <p className="font-medium text-slate-900">{item.fullMonth}</p>
                      <div className="flex items-center justify-between gap-4 text-slate-700">
                        <span>Penyaluran:</span>
                        <strong className="text-slate-900">{formatRupiah(item.amount)}</strong>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-700">
                        <span>Penerima:</span>
                        <strong className="text-slate-900 font-medium">
                          {formatNumber(item.beneficiaries)} Jiwa
                        </strong>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#1e3a8a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#distributionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-slate-600 font-normal text-center pt-1">
        Grafik Tren Nominal Penyaluran Program per Bulan
      </p>
    </div>
  );
}
