import ComparisonKPICard from "./ComparisonKPICard";
import DeltaKPICard from "./DeltaKPICard";
import { Cloud, TrendingDown } from "lucide-react";

interface CO2KPICardsGridProps {
  finalBioCO2e: number;
  finalPA66CO2e: number;
}

export default function CO2KPICardsGrid({
  finalBioCO2e,
  finalPA66CO2e,
}: CO2KPICardsGridProps) {
  const co2Delta = finalPA66CO2e - finalBioCO2e;
  const percentReduction = finalPA66CO2e > 0
    ? ((finalPA66CO2e - finalBioCO2e) / finalPA66CO2e) * 100
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Cloud className="w-5 h-5 text-[#1e40af]" />
        <h2 className="text-lg font-semibold text-foreground">Carbon Footprint Analysis</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComparisonKPICard
          label="Total CO2 Emissions"
          bioValue={finalBioCO2e}
          conventionalValue={finalPA66CO2e}
          unitLabel="kg CO2e"
          icon={Cloud}
          highlightBioAsLower
          subtitle="Lower emissions = better for the environment"
        />
        <DeltaKPICard
          label="CO2 Emissions Avoided"
          deltaValue={co2Delta}
          percentReduction={percentReduction}
          unitLabel="kg CO2e"
          icon={TrendingDown}
        />
      </div>
    </div>
  );
}
