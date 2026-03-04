import { useState, useMemo, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import KPICardsGrid from "@/components/KPICardsGrid";
import CO2KPICardsGrid from "@/components/CO2KPICardsGrid";
import InputControls from "@/components/InputControls";
import VisualizationSection from "@/components/VisualizationSection";
import ContextDrawer from "@/components/ContextDrawer";
import DashboardFooter from "@/components/DashboardFooter";
import { runSimulation, type WeightUnit } from "@/lib/calculations";
import { Recycle } from "lucide-react";

const START_YEAR = 2026;

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [annualPanels, setAnnualPanels] = useState(25_000);
  const [projectionYears, setProjectionYears] = useState(20);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  const simulationResults = useMemo(() => {
    return runSimulation({
      annualUnits: annualPanels,
      startYear: START_YEAR,
      years: projectionYears,
    });
  }, [annualPanels, projectionYears]);

  const handleOpenContext = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader onOpenContext={handleOpenContext} />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              Sustainability Impact Dashboard
            </h1>
            <p className="text-muted-foreground">
              Visualizing the environmental impact of switching to NyrionPlex bio-composite panels
            </p>
          </div>

          <InputControls
            annualPanels={annualPanels}
            projectionYears={projectionYears}
            weightUnit={weightUnit}
            onAnnualPanelsChange={setAnnualPanels}
            onProjectionYearsChange={setProjectionYears}
            onWeightUnitChange={setWeightUnit}
          />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Recycle className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-lg font-semibold text-foreground">End-of-Life Analysis</h2>
            </div>
            <KPICardsGrid
              finalCumulativeMassSold={simulationResults.finalCumulativeMassSold}
              finalPA66CumulativeMassSold={simulationResults.finalPA66CumulativeMassSold}
              finalCumulativeDecomp={simulationResults.finalCumulativeDecomp}
              finalRemainingMass={simulationResults.finalRemainingMass}
              finalPA66Decomp={simulationResults.finalPA66Decomp}
              finalPA66Remaining={simulationResults.finalPA66Remaining}
              weightUnit={weightUnit}
            />
          </div>

          <CO2KPICardsGrid
            finalBioCO2e={simulationResults.finalBioCO2e}
            finalPA66CO2e={simulationResults.finalPA66CO2e}
          />

          <VisualizationSection yearlyData={simulationResults.yearlyData} weightUnit={weightUnit} />
        </div>
      </main>

      <DashboardFooter />

      <ContextDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
