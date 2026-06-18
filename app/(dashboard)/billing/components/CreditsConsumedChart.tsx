"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DailyUsage } from "@/actions/billing/getCreditUsageAction";

interface CreditsConsumedChartProps {
  usageData: DailyUsage[];
}

export default function CreditsConsumedChart({
  usageData,
}: CreditsConsumedChartProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Credits consumed
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Daily credit consumed in the current month
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={usageData}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            interval="preserveStartEnd"
          />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            labelStyle={{ fontWeight: "600", marginBottom: "4px" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
            iconType="square"
            formatter={(value) => {
              if (value === "successful")
                return "Successful Phases Credits";
              if (value === "failed") return "Failed Phases Credits";
              return value;
            }}
          />
          <Bar
            dataKey="successful"
            stackId="a"
            fill="#22c55e"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="failed"
            stackId="a"
            fill="#166534"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
