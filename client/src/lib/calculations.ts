export interface SimulationParams {
  annualUnits: number;
  startYear: number;
  years: number;
  bioPercent?: number;
}

export interface YearData {
  year: number;
  unitsSold: number;
  massSold: number;
  decompThisYear: number;
  cumulativeMassSold: number;
  cumulativeDecomp: number;
  remainingMass: number;
  degradationPercent: number;
  // PA66 conventional comparison (with 0.1%/year decomposition)
  pa66Decomp: number;
  pa66Remaining: number;
  pa66CumulativeMassSold: number;
  // Material composition breakdown
  binderMass: number;
  remainingBio: number;
  degradedMass: number;
  // CO2 equivalent emissions (kg CO2e)
  bioCO2e: number;
  pa66CO2e: number;
}

export interface SimulationResults {
  yearlyData: YearData[];
  finalCumulativeMassSold: number;
  finalCumulativeDecomp: number;
  finalRemainingMass: number;
  finalDegradationPercent: number;
  // PA66 conventional comparison
  finalPA66CumulativeMassSold: number;
  finalPA66Decomp: number;
  finalPA66Remaining: number;
  // CO2 equivalent emissions (kg CO2e)
  finalBioCO2e: number;
  finalPA66CO2e: number;
}

// Weight per NyrionPlex bio-composite interior panel in kg
const NYRIONPLEX_WEIGHT_KG = 3.2;
// Weight per conventional PA66 interior panel in kg
const PA66_WEIGHT_KG = 5.8;
// Fixed NyrionPlex bio-based portion (75% NyrionPlex + 25% structural binder)
const DEFAULT_BIO_PCT = 0.75;
// Decay period in years for NyrionPlex material (industrial composting)
const DECAY_YEARS = 4.2;
// PA66 decomposition rate (0.1% per year of cumulative mass)
const PA66_DECOMP_RATE = 0.001;

// CO2 equivalent emissions per panel (kg CO2e)
const PA66_CO2E_PER_UNIT = 22.6;
const NYRIONPLEX_CO2E_PER_UNIT = 8.4;

export function runSimulation(params: SimulationParams): SimulationResults {
  const { annualUnits, startYear, years, bioPercent = DEFAULT_BIO_PCT * 100 } = params;
  const totalYears = years;

  // Convert percentage to decimal (e.g., 75 -> 0.75)
  const bioPct = bioPercent / 100;
  const binderPct = 1 - bioPct;

  // NyrionPlex bio-composite panel: 3.2 kg each
  const bioMassSoldPerYear = annualUnits * NYRIONPLEX_WEIGHT_KG;
  const bioMassPerYear = bioMassSoldPerYear * bioPct;
  const binderMassPerYear = bioMassSoldPerYear * binderPct;
  // Annual degradation rate for NyrionPlex (degrades over 4.2 years)
  const annualBioDegradation = bioMassPerYear / DECAY_YEARS;

  // PA66 panels: 5.8 kg each (same number of panels, different weight)
  const pa66MassSoldPerYear = annualUnits * PA66_WEIGHT_KG;

  const yearlyData: YearData[] = [];

  let cumulativeMassSold = 0;
  let cumulativeDecomp = 0;
  let cumulativeBinder = 0;

  // PA66 tracking (with minimal 0.1%/year decomposition)
  let pa66CumulativeMassSold = 0;
  let pa66CumulativeDecomp = 0;

  // Track NyrionPlex batches for degradation calculation
  const bioBatches: { original: number; remaining: number }[] = [];

  for (let i = 0; i < totalYears; i++) {
    const currentYear = startYear + i;

    // Add this year's NyrionPlex mass
    cumulativeMassSold += bioMassSoldPerYear;
    cumulativeBinder += binderMassPerYear;

    // Add this year's PA66 mass (5.8 kg per panel vs 3.2 kg for NyrionPlex)
    pa66CumulativeMassSold += pa66MassSoldPerYear;

    // PA66 decomposes at 0.1% of cumulative mass per year
    const pa66DecompThisYear = pa66CumulativeMassSold * PA66_DECOMP_RATE;
    pa66CumulativeDecomp += pa66DecompThisYear;
    const pa66Remaining = pa66CumulativeMassSold - pa66CumulativeDecomp;

    // Add new NyrionPlex batch for this year
    bioBatches.push({ original: bioMassPerYear, remaining: bioMassPerYear });

    // Calculate decomposition for this year from all active batches
    let decompThisYear = 0;

    for (let j = 0; j < bioBatches.length; j++) {
      const batch = bioBatches[j];
      if (batch.remaining <= 0) continue;

      const yearsElapsedBefore = i - j;
      const yearsElapsedAfter = i - j + 1;

      if (yearsElapsedBefore < DECAY_YEARS) {
        let degradeAmount: number;

        if (yearsElapsedAfter <= DECAY_YEARS) {
          degradeAmount = Math.min(batch.remaining, annualBioDegradation);
        } else {
          const fractionOfYear = DECAY_YEARS - yearsElapsedBefore;
          degradeAmount = Math.min(batch.remaining, annualBioDegradation * fractionOfYear);
        }

        batch.remaining -= degradeAmount;
        decompThisYear += degradeAmount;

        if (batch.remaining < 0.001) {
          batch.remaining = 0;
        }
      }
    }

    cumulativeDecomp += decompThisYear;

    // Calculate remaining NyrionPlex (undegraded)
    const remainingBio = bioBatches.reduce((sum, batch) => sum + batch.remaining, 0);

    const remainingMass = cumulativeMassSold - cumulativeDecomp;
    const degradationPercent = cumulativeMassSold > 0
      ? (cumulativeDecomp / cumulativeMassSold) * 100
      : 0;

    const cumulativeUnitsSold = annualUnits * (i + 1);
    const bioCO2e = cumulativeUnitsSold * NYRIONPLEX_CO2E_PER_UNIT;
    const pa66CO2e = cumulativeUnitsSold * PA66_CO2E_PER_UNIT;

    yearlyData.push({
      year: currentYear,
      unitsSold: annualUnits,
      massSold: Math.round(bioMassSoldPerYear),
      decompThisYear: Math.round(decompThisYear),
      cumulativeMassSold: Math.round(cumulativeMassSold),
      cumulativeDecomp: Math.round(cumulativeDecomp),
      remainingMass: Math.round(remainingMass),
      degradationPercent: Math.round(degradationPercent * 10) / 10,
      pa66Decomp: Math.round(pa66CumulativeDecomp),
      pa66Remaining: Math.round(pa66Remaining),
      pa66CumulativeMassSold: Math.round(pa66CumulativeMassSold),
      binderMass: Math.round(cumulativeBinder),
      remainingBio: Math.round(remainingBio),
      degradedMass: Math.round(cumulativeDecomp),
      bioCO2e: Math.round(bioCO2e),
      pa66CO2e: Math.round(pa66CO2e),
    });
  }

  const finalYearData = yearlyData[totalYears - 1];

  return {
    yearlyData,
    finalCumulativeMassSold: finalYearData.cumulativeMassSold,
    finalCumulativeDecomp: finalYearData.cumulativeDecomp,
    finalRemainingMass: finalYearData.remainingMass,
    finalDegradationPercent: finalYearData.degradationPercent,
    finalPA66CumulativeMassSold: finalYearData.pa66CumulativeMassSold,
    finalPA66Decomp: finalYearData.pa66Decomp,
    finalPA66Remaining: finalYearData.pa66Remaining,
    finalBioCO2e: finalYearData.bioCO2e,
    finalPA66CO2e: finalYearData.pa66CO2e,
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}

export function formatFullNumber(num: number): string {
  return num.toLocaleString();
}

export type WeightUnit = "kg" | "lbs";

export const KG_TO_LBS = 2.20462;

export function convertWeight(valueKg: number, unit: WeightUnit): number {
  return unit === "lbs" ? valueKg * KG_TO_LBS : valueKg;
}

export function getUnitLabel(unit: WeightUnit): string {
  return unit === "lbs" ? "lbs" : "kg";
}
