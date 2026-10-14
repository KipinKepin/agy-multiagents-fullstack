---
name: sdlc-orchestration
description: >-
  Use this skill when managing or orchestrating a complete software development lifecycle (SDLC)
  workflow with multiple specialized subagents (analyst, architect, designer, backend, frontend, qa).
---

# SDLC Multi-Agent Orchestration Skill

This skill provides step-by-step procedures for the Orchestrator to coordinate multi-agent software engineering workflows, execute parallel tasks, manage file-based context handoffs, and oversee QA verification loops.

---

## 1. Prerequisites & Preparation
1. Always inspect the persistent project memory before taking action:
   - Read `context/memory.md`.
   - Take note of previous architectural decisions, established patterns, and resolved issues.
2. Ensure the workspace directories exist: `docs/`, `src/backend/`, `src/frontend/`, `tests/`, and `context/`.

---

## 2. Orchestration Phases

Refer to the detailed transition rules in [references/workflow-matrix.md](./references/workflow-matrix.md).

### Phase 1: Requirements Analysis
- **Target Agent**: `analyst`
- **Input**: User prompt / high-level feature request.
- **Output Artifact**: `docs/requirements.md`
- **Handoff Instruction**:
  > "Analyze the user requirements, extract functional & non-functional requirements, write user stories with Gherkin acceptance criteria, and output to `docs/requirements.md`."

### Phase 2: System Architecture & API Contract
- **Target Agent**: `architect`
- **Input Artifact**: `docs/requirements.md`
- **Output Artifacts**: `docs/architecture.md`, `docs/api-contract.md`
- **Handoff Instruction**:
  > "Read `docs/requirements.md`. Design the system topology, component model, database schema, and formal API contract. Write specifications to `docs/architecture.md` and `docs/api-contract.md`."

### Phase 3: Parallel UI Design & Backend Implementation
- **Target Agents**: `designer` AND `backend` (dispatched in a single parallel batch).
- **Designer Input**: `docs/requirements.md`
- **Designer Output**: `docs/design-spec.md`
- **Backend Input**: `docs/architecture.md`, `docs/api-contract.md`
- **Backend Output**: Source files in `src/backend/`
- **Handoff Instruction**:
  - Dispatch both subagents simultaneously with `Workspace: "inherit"`.

### Phase 4: Frontend Implementation
- **Target Agent**: `frontend`
- **Input Artifacts**: `docs/design-spec.md`, `docs/api-contract.md`
- **Output**: Source files in `src/frontend/`
- **Handoff Instruction**:
  > "Read `docs/design-spec.md` for design tokens/component specs and `docs/api-contract.md` for API integration. Implement the client UI in `src/frontend/`."

### Phase 5: Quality Assurance & Audit
- **Target Agent**: `qa`
- **Input Artifacts**: `docs/requirements.md`, `docs/api-contract.md`, code in `src/`
- **Output Artifact**: `docs/qa-report.md`
- **Handoff Instruction**:
  > "Audit the codebase against requirements and API contract. Run test suites and linters. Generate `docs/qa-report.md` with an explicit PASS or FAIL verdict."

---

## 3. QA Fix Loop Protocol

When `docs/qa-report.md` has an overall verdict of **FAIL**:
1. Review the defect entries (`BUG-xxx`) and identify the responsible component (`backend` or `frontend`).
2. Dispatch the responsible subagent with targeted instructions citing the specific bug ID and reproduction steps.
3. Once the subagent confirms the fix, re-invoke `qa` to execute a regression test.
4. Continue the loop until `qa` issues a **PASS** verdict.
5. Never deliver an unverified or failing project to the user.

---

## 4. Finalization & Memory Update
1. Update `context/memory.md` with:
   - Summary of implemented features.
   - Key architectural patterns and package dependencies added.
   - Lessons learned and resolved bugs.
2. Present a clear, user-facing delivery summary linking to the created documentation and source code files.
