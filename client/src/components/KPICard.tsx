import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function KPICard({ label, value, description, icon: Icon, iconColor = "#1e40af" }: KPICardProps) {
  return (
    <Card className="p-6" data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            {label}
          </p>
          <p className="text-4xl font-bold text-foreground mb-1 truncate">
            {value}
          </p>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>
    </Card>
  );
}
