import ComparisonKPICard from "./ComparisonKPICard";
import DeltaKPICard from "./DeltaKPICard";
import { Package, Recycle, Leaf, TrendingDown } from "lucide-react";
import { convertWeight, getUnitLabel, type WeightUnit } from "@/lib/calculations";

interface KPICardsGridProps {
  finalCumulativeMassSold: number;
  finalPA66CumulativeMassSold: number;
  finalCumulativeDecomp: number;
  finalRemainingMass: number;
  finalPA66Decomp: number;
  finalPA66Remaining: number;
  weightUnit: WeightUnit;
}

export default function KPICardsGrid({
  finalCumulativeMassSold,
  finalPA66CumulativeMassSold,
  finalCumulativeDecomp,
  finalRemainingMass,
  finalPA66Decomp,
  finalPA66Remaining,
  weightUnit,
}: KPICardsGridProps) {
  const unitLabel = getUnitLabel(weightUnit);

  const displayBioMassSold = Math.round(convertWeight(finalCumulativeMassSold, weightUnit));
  const displayPA66MassSold = Math.round(convertWeight(finalPA66CumulativeMassSold, weightUnit));
  const displayBioDecomp = Math.round(convertWeight(finalCumulativeDecomp, weightUnit));
  const displayPA66Decomp = Math.round(convertWeight(finalPA66Decomp, weightUnit));
  const displayBioRemaining = Math.round(convertWeight(finalRemainingMass, weightUnit));
  const displayPA66Remaining = Math.round(convertWeight(finalPA66Remaining, weightUnit));
  const displayDelta = Math.round(convertWeight(finalPA66Remaining - finalRemainingMass, weightUnit));

  const percentReduction = finalPA66Remaining > 0
    ? ((finalPA66Remaining - finalRemainingMass) / finalPA66Remaining) * 100
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ComparisonKPICard
        label="Cumulative Mass Produced"
        bioValue={displayBioMassSold}
        conventionalValue={displayPA66MassSold}
        unitLabel={unitLabel}
        icon={Package}
        subtitle="Total mass produced over projection period"
      />
      <ComparisonKPICard
        label="Cumulative Decomposition"
        bioValue={displayBioDecomp}
        conventionalValue={displayPA66Decomp}
        unitLabel={unitLabel}
        icon={Recycle}
        subtitle="Higher decomposition = less environmental impact"
      />
      <ComparisonKPICard
        label="Remaining in Environment"
        bioValue={displayBioRemaining}
        conventionalValue={displayPA66Remaining}
        unitLabel={unitLabel}
        icon={Leaf}
        highlightBioAsLower
        subtitle="Lower remaining = better for the environment"
      />
      <DeltaKPICard
        label="Environmental Advantage"
        deltaValue={displayDelta}
        percentReduction={percentReduction}
        unitLabel={unitLabel}
        icon={TrendingDown}
      />
    </div>
  );
}
