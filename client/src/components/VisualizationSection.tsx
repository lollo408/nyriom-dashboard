import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import ChartToggle, { type ChartView } from "./ChartToggle";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { YearData } from "@/lib/calculations";
import { formatNumber, convertWeight, getUnitLabel, type WeightUnit } from "@/lib/calculations";

interface VisualizationSectionProps {
  yearlyData: YearData[];
  weightUnit: WeightUnit;
}

export default function VisualizationSection({ yearlyData, weightUnit }: VisualizationSectionProps) {
  const [activeView, setActiveView] = useState<ChartView>("composition");
  const unitLabel = getUnitLabel(weightUnit);

  const chartData = useMemo(() => {
    return yearlyData.map((d) => ({
      year: d.year,
      "PA66 (Remaining)": Math.round(convertWeight(d.pa66Remaining, weightUnit)),
      "NyrionPlex (Remaining)": Math.round(convertWeight(d.remainingMass, weightUnit)),
    }));
  }, [yearlyData, weightUnit]);

  const barChartData = useMemo(() => {
    const d = yearlyData[yearlyData.length - 1];
    if (!d) return [];

    return [
      {
        material: "NyrionPlex (3.2 kg)",
        "Remaining": Math.round(convertWeight(d.binderMass, weightUnit)),
        "Still Degrading": Math.round(convertWeight(d.remainingBio, weightUnit)),
        "Degraded": Math.round(convertWeight(d.degradedMass, weightUnit)),
        total: Math.round(convertWeight(d.cumulativeMassSold, weightUnit)),
      },
      {
        material: "PA66 (5.8 kg)",
        "Remaining": Math.round(convertWeight(d.pa66Remaining, weightUnit)),
        "Degraded": Math.round(convertWeight(d.pa66Decomp, weightUnit)),
        total: Math.round(convertWeight(d.pa66CumulativeMassSold, weightUnit)),
      },
    ];
  }, [yearlyData, weightUnit]);

  const formatYAxis = (value: number) => formatNumber(value);

  const finalYear = yearlyData[yearlyData.length - 1]?.year;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">Year {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} {unitLabel}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + (entry.value || 0), 0);
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} {unitLabel}
            </p>
          ))}
          <p className="text-sm font-medium text-foreground mt-1 pt-1 border-t border-border">
            Total: {total.toLocaleString()} {unitLabel}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-foreground">
            Environmental Impact Analysis
          </h2>
          {activeView === "composition" && (
            <span className="text-sm text-muted-foreground">
              (Year {finalYear} projection)
            </span>
          )}
        </div>
        <ChartToggle activeView={activeView} onViewChange={setActiveView} />
      </div>

      {activeView === "cumulative" ? (
        <div className="h-[400px] lg:h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="year"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="PA66 (Remaining)"
                stroke="#DC2626"
                fill="#DC2626"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="NyrionPlex (Remaining)"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatYAxis}
              />
              <YAxis
                type="category"
                dataKey="material"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={110}
              />
              <Tooltip content={<BarTooltip />} />
              <Legend />
              <Bar dataKey="Remaining" stackId="a" fill="#DC2626" />
              <Bar dataKey="Still Degrading" stackId="a" fill="#D97706" />
              <Bar dataKey="Degraded" stackId="a" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground border-t border-border pt-4">
        {activeView === "cumulative" && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#DC2626]" />
              <span>PA66 accumulation (minimal degradation)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#3b82f6]" />
              <span>NyrionPlex remaining in environment</span>
            </div>
          </>
        )}
        {activeView === "composition" && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#DC2626]" />
              <span>Remaining in environment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#D97706]" />
              <span>Still degrading</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#3b82f6]" />
              <span>Fully degraded</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
