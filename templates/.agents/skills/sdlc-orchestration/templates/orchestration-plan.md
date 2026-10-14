# Orchestration Execution Plan Template

```markdown
# SDLC Execution Plan: [Feature / Project Name]

## 1. Goal & Scope
- **Objective**: [Brief description of user objective]
- **Key Deliverables**: [List of expected files]

## 2. Subagent Delegation Schedule

### Step 1: Analyst
- [ ] Task: Formulate requirements
- Target Output: `docs/requirements.md`
- Status: [Pending / In Progress / Completed]

### Step 2: Architect
- [ ] Task: Design architecture and contracts
- Target Output: `docs/architecture.md`, `docs/api-contract.md`
- Status: [Pending / In Progress / Completed]

### Step 3: Parallel Execution (Designer & Backend)
- [ ] Designer Task: Create design specification (`docs/design-spec.md`)
- [ ] Backend Task: Build server logic (`src/backend/`)
- Status: [Pending / In Progress / Completed]

### Step 4: Frontend
- [ ] Task: Build UI and integrate API
- Target Output: `src/frontend/`
- Status: [Pending / In Progress / Completed]

### Step 5: QA
- [ ] Task: Audit code and run test suites
- Target Output: `docs/qa-report.md`
- Status: [Pending / In Progress / Completed]
- Verdict: [PASS / FAIL]

### Step 6: Fix Loop (If Verdict == FAIL)
- [ ] Ticket: [BUG-001]
- Assigned Subagent: [backend / frontend]
- Re-test Status: [Pending / Passed]

### Step 7: Delivery & Memory
- [ ] Memory Update: `context/memory.md`
- [ ] Final Presentation to User
```
