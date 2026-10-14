# Project Memory & Knowledge Base

## 1. Project Overview & Multi-Agent Architecture
- **Project**: CineTix - Modern Cinema Ticketing & F&B Booking Web Application
- **Framework**: Antigravity Multi-Agent SDLC Framework
- **Primary Orchestrator**: `orchestrator`
- **Specialized Subagents**:
  - `analyst`: Requirements elicitation and PRD specifications (`docs/requirements.md`)
  - `architect`: System architecture, DB schemas, and API contracts (`docs/architecture.md`, `docs/api-contract.md`)
  - `designer`: UI/UX design system, design tokens, and component specifications (`docs/design-spec.md`)
  - `backend`: Server-side business logic and API implementation (`src/backend/`)
  - `frontend`: Client UI implementation and API integration (`src/frontend/`)
  - `qa`: Quality assurance, automated verification, and audit reports (`docs/qa-report.md`)

## 2. Directory Structure Conventions
- `.agents/agents/`: Definitions of subagents and system prompts (`agent.md`).
- `.agents/skills/`: Procedural runbooks and skills for specialized workflows.
- `docs/`: Living documentation and contracts between agents:
  - `docs/requirements.md` (SRS & user stories)
  - `docs/architecture.md` (Topology, CSV schemas, system modules)
  - `docs/api-contract.md` (REST API contracts)
  - `docs/design-spec.md` (Dark Luxury Cinema UI/UX design tokens)
  - `docs/qa-report.md` (Quality audit & test verification report: PASS, 14/14 tests)
- `src/backend/`: Node.js Express server parsing CSV datasets without any database.
- `src/frontend/`: React 18, Redux Toolkit, Tailwind CSS SPA client.
- `context/`: Persistent memory and project history (`context/memory.md`).

## 3. Communication & Handoff Rules
- Subagents communicate strictly through disk artifacts located in `docs/` and `src/` to prevent context token overflow.
- All tasks dispatched to subagents specify `Workspace: "inherit"` to share the repository.
- Quality gate enforcement: Releases require an explicit `PASS` verdict in `docs/qa-report.md`. Completed with PASS on 2026-10-08 after resolving Bug Fix Loop.

## 4. Key Architectural Decisions & Solutions
1. **Zero Database Architecture**:
   - Strictly enforced zero SQL/NoSQL databases. All master data (movies, cinemas, showtimes, snacks, promo vouchers) is stored in raw CSV files (`src/backend/data/*.csv`).
   - Implemented a custom RFC 4180-compliant CSV parser service (`src/backend/services/csvParser.js`) with quotation-aware parsing, type conversions, and in-memory caching.
2. **Dynamic Movie Routing & Elimination of Hardcoded Data**:
   - Resolved the issue where clicking any movie opened Spider-Man by dynamically binding route parameters (`/movie/:id`) and dispatching the user's selected movie payload.
3. **Area-Based Geographic Filtering & Cinema Chains**:
   - Implemented multi-tier area filtering across 6 regions (Jakarta, Bandung, Surabaya, Medan, Yogyakarta, Bali).
   - Filtered cinema catalog by chain (`XXI`, `CGV`, `Cinepolis`) and mapped specific movie availability per cinema and region (reflecting real-world cinema scheduling constraints).
   - Supported studio types: `XXI The Premiere`, `XXI IMAX`, `XXI Regular`, `CGV Velvet Class`, `CGV 4DX`, `CGV 2D`, `Cinepolis VIP`, `Cinepolis Macro XE`, `Cinepolis Regular`.
4. **Resilient Client-Side API Integration**:
   - Built an asynchronous service layer (`src/frontend/src/services/api.js`) consuming `http://localhost:3000/api/v1` with seamless fallback to internal mock data for offline/standalone execution.
5. **Comprehensive Ticket Context Retention**:
   - Preserved full cinema metadata (`name`, `chain`, `location`), studio format (`studio_type`), movie details, schedule, and selected seats throughout the checkout pipeline into the digital E-Ticket pass.
