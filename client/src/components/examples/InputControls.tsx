import { useState } from 'react';
import InputControls from '../InputControls';

export default function InputControlsExample() {
  const [annualPanels, setAnnualPanels] = useState(25000);
  const [projectionYears, setProjectionYears] = useState(20);

  return (
    <InputControls
      annualPanels={annualPanels}
      projectionYears={projectionYears}
      weightUnit="kg"
      onAnnualPanelsChange={setAnnualPanels}
      onProjectionYearsChange={setProjectionYears}
      onWeightUnitChange={() => {}}
    />
  );
}
