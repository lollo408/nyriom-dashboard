import KPICardsGrid from '../KPICardsGrid';

export default function KPICardsGridExample() {
  return (
    <KPICardsGrid
      finalCumulativeMassSold={1600000}
      finalPA66CumulativeMassSold={2900000}
      finalCumulativeDecomp={1200000}
      finalRemainingMass={400000}
      finalPA66Decomp={29000}
      finalPA66Remaining={2871000}
      weightUnit="kg"
    />
  );
}
