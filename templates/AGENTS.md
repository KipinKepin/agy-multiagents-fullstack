# Multi-Agent Engineering Rules & Workspace Architecture

This repository uses the Antigravity Multi-Agent Software Development Lifecycle (SDLC) framework. All agents operating within this workspace must adhere to the following principles.

---

## 1. Agent Roster & Responsibilities

| Agent Name | Role | Primary Responsibility | Key Output Files |
| :--- | :--- | :--- | :--- |
| **`orchestrator`** | Master Orchestrator | Decomposes tasks, delegates via `invoke_subagent`, manages SDLC loop | `context/memory.md` |
| **`analyst`** | Requirements Analyst | Elicits requirements, writes functional/non-functional specs & user stories | `docs/requirements.md` |
| **`architect`** | System Architect | Designs system topology, data models/ERD, and API contracts | `docs/architecture.md`, `docs/api-contract.md` |
| **`designer`** | UI/UX Designer | Formulates design tokens, component state matrices, responsive wireframes | `docs/design-spec.md` |
| **`backend`** | Backend Developer | Implements server application, business logic, and API endpoints | `src/backend/*` |
| **`frontend`** | Frontend Developer | Implements client application, UI components, and API integration | `src/frontend/*` |
| **`qa`** | QA Engineer | Runs test runners, verifies contracts, and compiles audit reports | `docs/qa-report.md` |

---

## 2. Global Execution Rules

1. **File-Based Context Handoff**:
   - Subagents must not receive giant context dumps in prompts.
   - All inter-agent data sharing occurs via filesystem artifacts in `docs/` and `src/`.
2. **Strict Contract Adherence**:
   - Backend and Frontend developers must strictly follow `docs/api-contract.md` and `docs/design-spec.md`.
3. **Quality Assurance Gate**:
   - No project or feature is considered complete until `docs/qa-report.md` records an overall verdict of **PASS**.
   - If QA reports **FAIL**, the Orchestrator routes the defect to `backend` or `frontend` for remediation.
4. **Project Memory Preservation**:
   - Review `context/memory.md` before starting work.
   - Record significant architectural decisions and bug resolutions into `context/memory.md` upon completion.
