---
name: frontend-development
description: >-
  Use this skill when implementing client-side user interfaces, state management,
  component systems, routing, and API integration in src/frontend/.
---

# Frontend Development Skill

This skill guides frontend engineers in implementing accessible, responsive, and maintainable user interfaces that strictly follow UI design specifications and API contracts.

---

## 1. Principles
- **Specification Adherence**: Match color tokens, fonts, spacing, and component states from `docs/design-spec.md`.
- **Contract-Compliant API Integration**: Use exact endpoints, request formats, and response typings from `docs/api-contract.md`.
- **Resilient UI States**: Never leave the interface in an undefined state; always provide loading spinners/skeletons, error banners, and empty data states.
- **Component Isolation**: Build modular, single-responsibility components with predictable props.

---

## 2. Step-by-Step Procedure

1. **Ingest Specs**:
   - Read `docs/design-spec.md` and `docs/api-contract.md`.
2. **Project Setup**:
   - Set up the frontend workspace and install styling/routing libraries via `run_command`.
3. **Configure Design Tokens**:
   - Set up CSS variables or Tailwind configuration reflecting the defined tokens.
4. **Build Core Atomic Components**:
   - Buttons, Inputs, Cards, Badges, Modals following [examples/component-patterns.md](./examples/component-patterns.md).
5. **Implement API Client Layer**:
   - Create centralized API services with request/response interceptors for auth headers and error formatting.
6. **Manage State & Navigation**:
   - Configure routing and state handling according to [references/state-management.md](./references/state-management.md).
7. **Assemble Feature Views**:
   - Compose pages and connect them to real backend endpoints.
8. **Verify Responsiveness & Accessibility**:
   - Check layout behavior across mobile, tablet, and desktop viewports.
