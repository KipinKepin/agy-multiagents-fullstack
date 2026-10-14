---
name: project-memory
description: >-
  Use this skill when reading, synthesizing, updating, or maintaining persistent project memory,
  architectural decisions, and learned lessons in context/memory.md.
---

# Project Memory Management Skill

This skill guides agents in preserving persistent context across iterations, ensuring that project conventions, tech stack decisions, and resolved edge cases are never lost.

---

## 1. Principles
- **Living Document**: `context/memory.md` must be read at the start of any new session or feature development and updated at the completion of work.
- **Conciseness & High Signal**: Store only meaningful architectural decisions, recurring traps, and core configurations.
- **Evolutionary Tracking**: Record changes chronologically with clear version/iteration timestamps.

---

## 2. Step-by-Step Procedure

1. **Read Memory**:
   - At Phase 0 of any task, inspect `context/memory.md`.
2. **Apply Existing Rules**:
   - Respect established package versions, code patterns, and previously resolved bug workarounds.
3. **Capture New Decisions**:
   - When a major technical decision is made, note the rationale.
4. **Record Lessons Learned**:
   - If a bug or edge case was discovered and fixed, record the root cause and solution to prevent regressions.
5. **Update File**:
   - Append or update entries in `context/memory.md` using [templates/memory-template.md](./templates/memory-template.md).
