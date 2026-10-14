---
name: ui-ux-design-system
description: >-
  Use this skill when designing UI/UX specifications, design tokens, component matrices,
  responsive layouts, or accessibility standards in docs/design-spec.md.
---

# UI/UX Design System Skill

This skill guides the design of user interfaces, design systems, visual tokens, and user experience flows for web and mobile applications.

---

## 1. Principles
- **Design Token Consistency**: Use standardized variables for color, typography, spacing, and radius.
- **State Completeness**: Every interactive component must specify all states (default, hover, active, focus, disabled, loading, error).
- **Accessibility by Default**: Target WCAG 2.1 Level AA compliance (4.5:1 contrast ratio, keyboard navigation).
- **Mobile-First Responsiveness**: Design interfaces starting from small viewports upwards.

---

## 2. Step-by-Step Procedure

1. **Ingest Requirements**:
   - Review `docs/requirements.md` for user journeys, personas, and key actions.
2. **Formulate Design Tokens**:
   - Primary, secondary, neutral, and semantic colors (Hex/RGB).
   - Typographic scale, line heights, font families.
   - 8pt spacing system (`4px`, `8px`, `16px`, `24px`, `32px`, `48px`).
   - Radii and elevation/shadows.
3. **Specify Component Library & State Matrices**:
   - Define Buttons, Form Inputs, Modals, Cards, Tables, Navbars.
4. **Define Breakpoints & Responsive Behavior**:
   - Mobile (`< 640px`), Tablet (`640px - 1024px`), Desktop (`> 1024px`).
5. **Verify Accessibility**:
   - Check against [references/wcag-checklist.md](./references/wcag-checklist.md).
6. **Publish Deliverables**:
   - Save the specification to `docs/design-spec.md` using [templates/design-spec-template.md](./templates/design-spec-template.md).
