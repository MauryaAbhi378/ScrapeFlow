"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DailyExecutionStats } from "@/actions/home/getWorkflowExecutionStatsAction";

interface WorkflowExecutionStatusChartProps {
  data: DailyExecutionStats[];
}

export default function WorkflowExecutionStatusChart({
  data,
}: WorkflowExecutionStatusChartProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-xl">📈</span>
          Workflow execution status
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Daily number of successful and failed workflow executions
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            interval="preserveStartEnd"
          />
          <YAxis hide />
          <Tooltip
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
              paddingTop: "10px",
            }}
            iconType="circle"
            formatter={(value) => {
              if (value === "success") return "Success";
              if (value === "failed") return "Failed";
              return value;
            }}
          />
          <Area
            type="monotone"
            dataKey="success"
            stackId="1"
            stroke="#22c55e"
            fill="url(#colorSuccess)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="failed"
            stackId="1"
            stroke="#ef4444"
            fill="url(#colorFailed)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
