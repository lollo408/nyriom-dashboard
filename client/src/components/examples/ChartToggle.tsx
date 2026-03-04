import { useState } from 'react';
import ChartToggle, { type ChartView } from '../ChartToggle';

export default function ChartToggleExample() {
  const [view, setView] = useState<ChartView>('cumulative');

  return (
    <div className="p-4">
      <ChartToggle activeView={view} onViewChange={setView} />
    </div>
  );
}
