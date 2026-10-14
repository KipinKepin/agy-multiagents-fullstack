# QA Audit Report Template

```markdown
# Quality Assurance Audit Report

## 1. Executive Summary & Verdict
- **Overall Verdict**: [PASS / FAIL]
- **Audit Date**: [YYYY-MM-DD]
- **Test Metrics**:
  - Total Tests Executed: [0]
  - Passed: [0]
  - Failed: [0]
  - Pass Rate: [100%]

## 2. Test Execution Matrix
| Test ID | Test Scenario | Component | Target Requirement | Status |
| :--- | :--- | :--- | :--- | :--- |
| `TC-001` | [Scenario Title] | Backend / Frontend | [FR-001] | PASS / FAIL |

## 3. Bug Tracker (Required if Verdict is FAIL)
### BUG-001: [Bug Title]
- **Severity**: P0 (Blocker) / P1 (Critical) / P2 (Major) / P3 (Minor)
- **Component**: `backend` / `frontend`
- **File / Line**: `src/...`
- **Steps to Reproduce**:
  1. Step 1
  2. Step 2
- **Expected Behavior**: [What should happen]
- **Actual Behavior**: [What actually happened]
- **Remediation**: [Suggested fix for developer]

## 4. Static Analysis & Linter Results
- Linter: [0 errors, 0 warnings]
- Security check: [Passed]

## 5. Next Steps
- [Instructions for Orchestrator and developer agents]
```
