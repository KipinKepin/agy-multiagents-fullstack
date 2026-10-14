---
name: requirements-engineering
description: >-
  Use this skill when analyzing user requests, drafting software requirement specifications (SRS),
  user stories, acceptance criteria, or edge cases in docs/requirements.md.
---

# Requirements Engineering Skill

This skill guides the process of converting vague or unstructured requests into clear, complete, testable software requirements specifications.

---

## 1. Principles of Effective Requirements
- **Completeness**: Specify all inputs, processing rules, outputs, and edge cases.
- **Unambiguity**: Use concrete language rather than vague terms like "fast" or "user-friendly".
- **Verifiability**: Each requirement must be measurable and testable by automated tests or QA.
- **Traceability**: Tag every requirement with a unique identifier (`FR-001`, `NFR-001`, `US-001`).

---

## 2. Step-by-Step Procedure

1. **Clarify Objectives**:
   - Determine the core problem the user wants to solve.
   - Establish what is in-scope vs out-of-scope.
2. **Define User Personas**:
   - Detail user roles (e.g., Guest, Authenticated User, Admin) and their permissions.
3. **Formulate Functional Requirements (FR)**:
   - Break down system actions with explicit inputs, validation logic, and responses.
4. **Formulate Non-Functional Requirements (NFR)**:
   - Define performance, security, availability, and usability targets.
5. **Draft User Stories & Gherkin Scenarios**:
   - Write user stories with standard Gherkin syntax (`Given-When-Then`). Refer to [references/gherkin-syntax.md](./references/gherkin-syntax.md).
6. **Identify Edge Cases**:
   - Address network timeouts, malformed payloads, rate limits, concurrent access, and empty states.
7. **Write the Output**:
   - Use the template in [templates/requirements-template.md](./templates/requirements-template.md) and save to `docs/requirements.md`.
