import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface DashboardHeaderProps {
  onOpenContext: () => void;
}

export default function DashboardHeader({ onOpenContext }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-24 bg-background border-b-2 border-[#1e40af]/20 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#1e40af] tracking-tight">NYRIOM</span>
          <span className="text-muted-foreground text-lg">x</span>
          <span className="text-lg font-medium text-muted-foreground tracking-tight">VELARIS</span>
        </div>
        <span className="text-muted-foreground hidden md:inline">| Impact Dashboard</span>
      </div>
      <Button
        variant="outline"
        onClick={onOpenContext}
        className="gap-2"
        data-testid="button-project-context"
      >
        <Info className="w-4 h-4" />
        <span className="hidden sm:inline">Project Context</span>
      </Button>
    </header>
  );
}
