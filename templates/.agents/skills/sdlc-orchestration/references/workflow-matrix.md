# SDLC Multi-Agent Workflow Matrix

This matrix specifies the lifecycle phase dependencies, gating criteria, input files, and output deliverables.

| Phase | Phase Name | Agent | Input Dependecies | Output Artifacts | Quality Gate / Exit Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | Context Ingestion | Orchestrator | `context/memory.md` | Internal State Plan | Past learnings and project conventions reviewed |
| **1** | Requirements Elicitation | Analyst | User prompt, existing docs | `docs/requirements.md` | Functional and Non-Functional specs written with Gherkin criteria |
| **2** | System Architecture | Architect | `docs/requirements.md` | `docs/architecture.md`, `docs/api-contract.md` | Tech stack, ERD, and OpenAPI/REST endpoints fully documented |
| **3A** | UI/UX Design System | Designer | `docs/requirements.md` | `docs/design-spec.md` | Design tokens, color palette, state matrix, and WCAG AA compliance defined |
| **3B** | Backend Engineering | Backend | `docs/architecture.md`, `docs/api-contract.md` | `src/backend/*` | Server code implemented, contracts adhered to, endpoints operational |
| **4** | Frontend Engineering | Frontend | `docs/design-spec.md`, `docs/api-contract.md` | `src/frontend/*` | UI components built, API integrated, loading/error states handled |
| **5** | QA & Automated Testing | QA | `docs/requirements.md`, `docs/api-contract.md`, `src/*` | `docs/qa-report.md` | Automated test suite and linter executed, PASS or FAIL verdict delivered |
| **6** | Fix Loop (Conditional) | Backend / Frontend | `docs/qa-report.md` | Updated `src/*` | Identified bug tickets resolved without regression |
| **7** | Project Wrap-up & Memory | Orchestrator | All outputs | `context/memory.md`, User Summary | Memory log recorded, all deliverables presented |
