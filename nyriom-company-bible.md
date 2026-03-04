# Nyriom Technologies — Company Bible

**Purpose:** Single source of truth for the fictional company used across Lorenzo's portfolio projects. All projects referencing Nyriom should stay consistent with this document.

---

## Identity

| Field | Value |
|-------|-------|
| Legal name | Nyriom Technologies GmbH |
| Short name | Nyriom |
| HQ | Berlin, Germany |
| Founded | 2022 |
| Industry | Advanced materials / Bio-based polymers |
| Website (fictional) | nyriom.tech |
| Email domain | @nyriom.tech |

## One-Liner

Nyriom Technologies develops high-performance bio-based polymer composites that replace petroleum-derived engineering plastics, using AI-driven molecular simulation and contract manufacturing partners across Europe.

## Company Description (Full)

Nyriom Technologies is a Berlin-based advanced materials startup specializing in high-performance bio-based polymer composites. The company uses AI-driven molecular simulation and computational material science to design custom polymer formulations, then partners with contract manufacturers (CMOs) across Europe to produce at scale.

**Core product:** Drop-in replacements for petroleum-derived engineering plastics (PA, PBT, PEEK alternatives) using plant-based feedstocks. Targeting applications where weight, thermal resistance, and sustainability certifications matter.

## Team

- **18 people total**
  - 10 R&D (materials science + ML engineers)
  - 4 commercial / business development (1 per vertical)
  - 2 operations
  - 2 founders
- The commercial team is lean — 4 people covering 4 industries simultaneously. This is the core motivation for building internal tools.

## Funding

| Round | Year | Amount | Lead Investor(s) |
|-------|------|--------|-------------------|
| Seed | 2022 | EUR 2.5M | Atlantic Labs + Cherry Ventures |
| Series A | 2024 | EUR 12M | Lakestar |
| Series B | Preparing | TBD | Goal: scale manufacturing + US aerospace expansion |

## Target Verticals (4)

### 1. Aerospace
- **Color:** Blue (#3b82f6)
- **Focus:** Lightweight interior panels, structural brackets, secondary structures
- **Key targets:** Airbus, Tier 1 suppliers
- **Status:** Pursuing supplier qualifications

### 2. Automotive
- **Color:** Cyan (#06b6d4)
- **Focus:** EV battery enclosures, under-hood components, interior trim
- **Key targets:** German OEMs (2 pilot programs active)
- **Status:** Working pilots

### 3. Robotics
- **Color:** Orange (#f97316)
- **Focus:** Actuator housings, sensor enclosures, lightweight structural frames
- **Key targets:** Warehouse and surgical robotics companies
- **Status:** Early engagement

### 4. AI/Electronics
- **Color:** Teal (#14b8a6)
- **Focus:** Thermal management substrates, EMI shielding compounds, flexible circuit board substrates
- **Key targets:** Edge computing hardware manufacturers
- **Status:** R&D partnerships

## Opportunity Indicators

What Nyriom's commercial team watches for:
- New material qualification programs or RFPs
- Sustainability mandates or REACH/TSCA regulatory changes
- OEM lightweighting initiatives or EV platform announcements
- Robotics companies scaling from prototype to volume
- Electronics thermal management challenges
- Contract manufacturing or supply chain reshoring announcements
- Bio-based or circular economy material mentions
- Decision-makers: procurement, engineering leads, CTOs

## Brand Guidelines

### Colors
| Element | Hex | Usage |
|---------|-----|-------|
| Primary | #1e40af | Buttons, CTAs, accent |
| Primary light | #3b82f6 | Hover states, aerospace vertical |
| Dark background | #0a0a0a | App background |
| Card background | #111111 | Cards, sections |
| Border | #222222 | Borders, dividers |

### Vertical Colors
| Vertical | Hex | RGB for CSS |
|----------|-----|-------------|
| Aerospace | #3b82f6 | rgba(59, 130, 246) |
| Automotive | #06b6d4 | rgba(6, 182, 212) |
| Robotics | #f97316 | rgba(249, 115, 22) |
| AI/Electronics | #14b8a6 | rgba(20, 184, 166) |

### Typography
- Sans-serif: Inter
- Monospace: JetBrains Mono
- Dark theme (white text on near-black background)

### Logo
- Simple "N" monogram on deep blue (#1e40af) circle
- Dark background variant (for PWA icons, favicons)

### Tone
- Technical but accessible
- Data-driven, concise
- No fluff — the team is small and moves fast
- Berlin startup energy, not corporate

## Projects Using Nyriom Identity

| Project | Repo | What It Is |
|---------|------|------------|
| Nyriom Intel Hub | `lollo408/nyriom-intel-hub` | AI market intelligence platform (Flask + Supabase) |

*(Add new projects here as they're created)*

## Auth Patterns (for portfolio demos)

- **Demo login:** Shared password (env var `DEMO_PASSWORD`, default: `demo2026`)
- **Guest access:** No credentials, limited session
- **Admin:** Separate password (env var `ADMIN_SECRET`, default: `admin2026`)
- No OAuth — portfolio projects don't need real identity providers

## Supabase Table Schema (shared across projects)

| Table | Columns (key ones) |
|-------|--------------------|
| `app_config` | key (text PK), value (jsonb) |
| `events` | id, name, industry, start_date, end_date, location, country, website, description |
| `event_summaries` | id, event_id (FK), summary_text, status, generated_at |
| `intelligence_reports` | id, vertical, top_3_json, report_html, pdf_url, created_at |
| `user_preferences` | user_id, preferred_industry, updated_at |
