export default function DashboardFooter() {
  return (
    <footer className="bg-muted/50 py-8 mt-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 text-center">
        <p className="text-sm text-muted-foreground">
          This dashboard provides projected environmental impact estimates based on the NyrionPlex
          biodegradation model. Actual results may vary based on disposal conditions and
          environmental factors. Data is for illustrative purposes only.
        </p>
        <p className="text-xs text-muted-foreground mt-4">Nyriom Technologies x Velaris Aerostructures | Sustainability Impact Analysis</p>
      </div>
    </footer>
  );
}
