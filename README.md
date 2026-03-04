# Nyriom x Velaris — Sustainability Dashboard

Interactive dashboard that models the environmental impact of replacing conventional PA66 aerospace interior panels with NyrionPlex bio-composite panels. Built for a fictional partnership between Nyriom Technologies (bio-polymers, Berlin) and Velaris Aerostructures (Tier 1 cabin interiors, Hamburg).

**Live demo:** [ssb-sustainability-dashboard.vercel.app](https://ssb-sustainability-dashboard.vercel.app)

## What it does

- Simulates waste accumulation and CO2 emissions over 5–30 year projections
- Compares NyrionPlex (3.2 kg, degrades in 4.2 years) vs PA66 (5.8 kg, 600+ year lifespan)
- Batch-tracked degradation model — each year's production is modeled independently
- Adjustable inputs: annual panel volume (10K–100K), projection period, weight units (kg/lbs)

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts · Express

## Run locally

```bash
npm install
PORT=3000 npm run dev
```

Opens at `http://localhost:3000`.

## Context

Part of a portfolio series using Nyriom Technologies as a fictional company. The other project is the [Nyriom Intel Hub](https://github.com/lollo408/nyriom-intel-hub).

This dashboard specifically demonstrates: dashboarding, data visualization, simulation modeling, strategic thinking, and attention to detail.
