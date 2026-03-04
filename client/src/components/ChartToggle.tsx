import { Button } from "@/components/ui/button";

export type ChartView = 'cumulative' | 'composition';

interface ChartToggleProps {
  activeView: ChartView;
  onViewChange: (view: ChartView) => void;
}

const views: { id: ChartView; label: string }[] = [
  { id: 'composition', label: 'Material Composition' },
  { id: 'cumulative', label: 'Cumulative Impact' },
];

export default function ChartToggle({ activeView, onViewChange }: ChartToggleProps) {
  return (
    <div className="inline-flex bg-muted rounded-lg p-1 gap-1">
      {views.map((view) => (
        <Button
          key={view.id}
          variant={activeView === view.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(view.id)}
          className={activeView === view.id ? 'bg-[#1e40af] text-white' : ''}
          data-testid={`button-chart-${view.id}`}
        >
          {view.label}
        </Button>
      ))}
    </div>
  );
}
