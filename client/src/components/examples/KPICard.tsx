import KPICard from '../KPICard';
import { Trash2 } from 'lucide-react';

export default function KPICardExample() {
  return (
    <div className="max-w-sm">
      <KPICard
        label="Total Waste Diverted"
        value="8.4M kg"
        description="Over 20-year projection"
        icon={Trash2}
        iconColor="#3b82f6"
      />
    </div>
  );
}
