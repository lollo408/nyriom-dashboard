import VisualizationSection from '../VisualizationSection';
import { runSimulation } from '@/lib/calculations';

export default function VisualizationSectionExample() {
  const results = runSimulation({
    annualUnits: 25000,
    startYear: 2026,
    years: 20,
  });

  return (
    <VisualizationSection yearlyData={results.yearlyData} weightUnit="kg" />
  );
}
