import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNumber, type WeightUnit } from "@/lib/calculations";

interface InputControlsProps {
  annualPanels: number;
  projectionYears: number;
  weightUnit: WeightUnit;
  onAnnualPanelsChange: (value: number) => void;
  onProjectionYearsChange: (value: number) => void;
  onWeightUnitChange: (value: WeightUnit) => void;
}

const projectionOptions = [5, 10, 20, 30];
const MIN_PANELS = 10_000;
const MAX_PANELS = 100_000;
const STEP_PANELS = 5_000;

export default function InputControls({
  annualPanels,
  projectionYears,
  weightUnit,
  onAnnualPanelsChange,
  onProjectionYearsChange,
  onWeightUnitChange,
}: InputControlsProps) {
  const endYear = 2026 + projectionYears;

  return (
    <div className="bg-muted/50 rounded-lg p-4 flex flex-wrap items-end gap-6">
      <div className="flex flex-col gap-2 min-w-[280px]">
        <Label htmlFor="annual-panels" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Annual Panels Produced
        </Label>
        <div className="flex items-center gap-3">
          <Slider
            id="annual-panels"
            min={MIN_PANELS}
            max={MAX_PANELS}
            step={STEP_PANELS}
            value={[annualPanels]}
            onValueChange={([val]) => onAnnualPanelsChange(val)}
            className="flex-1"
            data-testid="slider-annual-panels"
          />
          <span className="text-sm font-semibold w-16 text-right text-foreground">
            {formatNumber(annualPanels)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="projection-years" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Projection Period
        </Label>
        <Select
          value={projectionYears.toString()}
          onValueChange={(val) => onProjectionYearsChange(parseInt(val, 10))}
        >
          <SelectTrigger className="w-36" id="projection-years" data-testid="select-projection-years">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projectionOptions.map((years) => (
              <SelectItem key={years} value={years.toString()}>
                {years} Years
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="weight-unit" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Weight Unit
        </Label>
        <Select
          value={weightUnit}
          onValueChange={(val) => onWeightUnitChange(val as WeightUnit)}
        >
          <SelectTrigger className="w-28" id="weight-unit" data-testid="select-weight-unit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kg">Kilograms</SelectItem>
            <SelectItem value="lbs">Pounds</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="px-2 py-1 bg-[#3b82f6]/10 rounded text-[#3b82f6] font-medium">75% Bio-Based</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
        <span>Timeline:</span>
        <span className="font-medium text-foreground">2026 - {endYear}</span>
      </div>
    </div>
  );
}
