---
name: qa-testing-automation
description: >-
  Use this skill when auditing source code, running automated test suites, verifying
  specifications, and producing structured QA audit reports in docs/qa-report.md with PASS/FAIL verdicts.
---

# QA Testing & Automation Skill

This skill provides procedures for Quality Assurance Engineers to plan and execute comprehensive test plans, perform static code analysis, and document quality audits.

---

## 1. Quality Gates & Principles
- **Zero Blocker Policy**: Any P0 (Blocker) or P1 (Critical) defect immediately yields an overall verdict of **FAIL**.
- **Specification Parity**: The implementation must be verified directly against `docs/requirements.md` and `docs/api-contract.md`.
- **Reproducibility**: Every defect must have clear, reproducible steps and error traces.

---

## 2. Step-by-Step Procedure

1. **Review Specification Artifacts**:
   - Read `docs/requirements.md` for acceptance criteria and `docs/api-contract.md` for endpoint contracts.
2. **Static Code Inspection**:
   - Review code in `src/backend/` and `src/frontend/` for syntax errors, missing validation, and unhandled promises.
3. **Run Automated Test Suites**:
   - Execute test runners, type-checkers, and linters using `run_command`.
4. **Conduct Functional & Edge Case Testing**:
   - Verify boundary values, empty inputs, unauthorized requests, and network failure resilience.
5. **Compile Audit Report**:
   - Use [templates/qa-report-template.md](./templates/qa-report-template.md) to generate `docs/qa-report.md`.
6. **Issue Verdict**:
   - If all tests pass and zero critical bugs exist, set verdict to **PASS**.
   - If any critical issue or specification violation exists, set verdict to **FAIL** with actionable defect tickets for `backend` or `frontend`.
