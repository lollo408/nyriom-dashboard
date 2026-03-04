import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { formatNumber } from "@/lib/calculations";

interface ComparisonKPICardProps {
  label: string;
  bioValue: number;
  conventionalValue: number;
  unitLabel: string;
  icon: LucideIcon;
  subtitle?: string;
  highlightBioAsLower?: boolean;
}

export default function ComparisonKPICard({
  label,
  bioValue,
  conventionalValue,
  unitLabel,
  icon: Icon,
  subtitle,
  highlightBioAsLower = false,
}: ComparisonKPICardProps) {
  const maxValue = Math.max(bioValue, conventionalValue);
  const bioPercent = maxValue > 0 ? (bioValue / maxValue) * 100 : 0;
  const conventionalPercent = maxValue > 0 ? (conventionalValue / maxValue) * 100 : 0;

  const bioColor = "#3b82f6";
  const conventionalColor = "#6B7280";

  return (
    <Card className="p-5" data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${bioColor}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: bioColor }} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium" style={{ color: bioColor }}>NyrionPlex</span>
            <span className="font-bold" style={{ color: bioColor }}>
              {formatNumber(bioValue)} {unitLabel}
            </span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${bioPercent}%`,
                backgroundColor: bioColor,
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">PA66 (Conventional)</span>
            <span className="font-semibold text-muted-foreground">
              {formatNumber(conventionalValue)} {unitLabel}
            </span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${conventionalPercent}%`,
                backgroundColor: conventionalColor,
              }}
            />
          </div>
        </div>
      </div>

      {subtitle && (
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
          {subtitle}
        </p>
      )}
    </Card>
  );
}
