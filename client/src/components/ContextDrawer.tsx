import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlertTriangle, Leaf, Calculator, FileText, Handshake } from "lucide-react";

interface ContextDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContextDrawer({ open, onOpenChange }: ContextDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto" data-testid="drawer-context">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Project Context</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#1e40af]/10 flex items-center justify-center">
                <Handshake className="w-5 h-5 text-[#1e40af]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">The Partnership</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <span className="font-semibold text-[#1e40af]">Nyriom Technologies</span> (Berlin) develops
              high-performance bio-based polymer composites using AI-driven molecular simulation.
              <span className="font-semibold text-foreground"> Velaris Aerostructures</span> (Hamburg) is a
              Tier 1 aerospace supplier producing cabin interior structures for commercial aircraft OEMs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under increasing EU aviation sustainability mandates, Velaris engaged Nyriom to replace
              petroleum-derived PA66 components across their interior panel product line. This dashboard
              tracks the projected environmental impact of that material transition at scale.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">Partnership Scope:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#1e40af] font-bold">•</span>
                  <span>Sidewall panels, ceiling panels, and partition structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e40af] font-bold">•</span>
                  <span>Qualification testing for cabin interior fire/smoke/toxicity standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e40af] font-bold">•</span>
                  <span>Contract manufacturing via Nyriom's European CMO network</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">The Problem</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Conventional PA66 (polyamide) interior cabin panels weigh
              <span className="font-semibold text-foreground"> 5.8 kg</span> each and take over
              <span className="font-semibold text-foreground"> 600+ years</span> to degrade in the environment.
              With thousands of panels produced annually, petroleum-derived materials accumulate
              as persistent waste in landfills.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">The Solution</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The <span className="font-semibold text-foreground">NyrionPlex bio-composite panel</span> is a
              drop-in replacement for PA66 interior panels, weighing just
              <span className="font-semibold text-foreground"> 3.2 kg</span> and degrading in approximately
              <span className="font-semibold text-foreground"> 4.2 years</span> under
              industrial composting conditions.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">Material Composition:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                  <span><span className="font-medium">75%</span> NyrionPlex (bio-based / biodegradable)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6B7280]" />
                  <span><span className="font-medium">25%</span> Structural binder</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">Total: <span className="font-medium text-[#3b82f6]">75% bio-based</span></p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#1e40af]/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#1e40af]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Assumptions</h3>
            </div>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#1e40af] font-bold">•</span>
                <span><span className="font-medium text-foreground">10K - 100K</span> interior panels per year</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e40af] font-bold">•</span>
                <span><span className="font-medium text-foreground">3.2 kg</span> per NyrionPlex panel vs <span className="font-medium text-foreground">5.8 kg</span> per PA66 panel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e40af] font-bold">•</span>
                <span><span className="font-medium text-foreground">2026</span> projected start year</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e40af] font-bold">•</span>
                <span><span className="font-medium text-foreground">20 year</span> default projection period</span>
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Methodology</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              The simulation compares two scenarios: Conventional PA66 (5.8 kg per panel, minimal 0.1%/year degradation)
              and NyrionPlex bio-composite (3.2 kg per panel, degrading linearly over 4.2 years under industrial composting).
              Each year's batch is tracked separately to accurately model the biodegradation timeline. The NyrionPlex material
              composition is 75% bio-based polymer and 25% structural binder, resulting in 75% bio-based content.
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
