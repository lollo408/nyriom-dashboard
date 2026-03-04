import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { formatNumber } from "@/lib/calculations";
import { TrendingDown } from "lucide-react";

interface DeltaKPICardProps {
  label: string;
  deltaValue: number;
  percentReduction: number;
  unitLabel: string;
  icon?: LucideIcon;
}

export default function DeltaKPICard({
  label,
  deltaValue,
  percentReduction,
  unitLabel,
  icon: Icon = TrendingDown,
}: DeltaKPICardProps) {
  const accentColor = "#3b82f6";

  return (
    <Card className="p-5" data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
        </div>
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold" style={{ color: accentColor }}>
          {formatNumber(deltaValue)} {unitLabel}
        </p>
        <p className="text-sm text-muted-foreground">
          less waste vs PA66 (Conventional)
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div 
            className="flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <TrendingDown className="w-4 h-4" />
            <span>{percentReduction.toFixed(0)}% reduction</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
