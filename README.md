# Nyriom x Velaris — Sustainability Dashboard

Interactive dashboard that models the environmental impact of replacing conventional PA66 aerospace interior panels with NyrionPlex bio-composite panels. Built for a fictional partnership between Nyriom Technologies (bio-polymers, Berlin) and Velaris Aerostructures (Tier 1 cabin interiors, Hamburg).

**Live demo:** [nyriom-dashboard.vercel.app](https://nyriom-dashboard.vercel.app)

## What it does

- Simulates waste accumulation and CO2 emissions over 5–30 year projections
- Compares NyrionPlex (3.2 kg, degrades in 4.2 years) vs PA66 (5.8 kg, 600+ year lifespan)
- Batch-tracked degradation model — each year's production is modeled independently
- Adjustable inputs: annual panel volume (10K–100K), projection period, weight units (kg/lbs)

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts · Express

## Context

Part of a portfolio series using Nyriom Technologies as a fictional company. See also: [Nyriom Intel Hub](https://github.com/lollo408/nyriom-intel-hub).

The idea behind this project was to take a real-world B2B scenario — two companies evaluating a material transition — and turn it into something a commercial team could actually use to make the case internally. It touches dashboarding and data visualization, but also the kind of thinking that goes into framing a partnership story with data.
