# Nyriom x Velaris — Sustainability Dashboard

Interactive dashboard that models the environmental impact of replacing conventional PA66 aerospace interior panels with NyrionPlex bio-composite panels. Built for a fictional partnership between Nyriom Technologies (bio-polymers, Berlin) and Velaris Aerostructures (Tier 1 cabin interiors, Hamburg).

**Live demo:** [Coming soon]

## What it does

- Simulates waste accumulation and CO2 emissions over 5–30 year projections
- Compares NyrionPlex (3.2 kg, degrades in 4.2 years) vs PA66 (5.8 kg, 600+ year lifespan)
- Batch-tracked degradation model — each year's production is modeled independently
- Adjustable inputs: annual panel volume (10K–100K), projection period, weight units

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts · Express

## Run locally

```bash
npm install
PORT=3000 npm run dev
```

Opens at `http://localhost:3000`

## Context

Part of a portfolio series using [Nyriom Technologies](https://github.com/lollo408/nyriom-intel-hub) as a fictional company. Each project demonstrates a different capability — this one focuses on dashboarding, data visualization, and simulation modeling.
