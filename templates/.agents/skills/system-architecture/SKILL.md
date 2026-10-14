---
name: system-architecture
description: >-
  Use this skill when designing technical architecture, selecting technology stacks,
  modeling database schemas/ERDs, and creating API contracts in docs/architecture.md and docs/api-contract.md.
---

# System Architecture & Design Skill

This skill provides guidelines and templates for software architects to design modular, scalable system architectures, data models, and API contracts.

---

## 1. Core Architectural Principles
- **Separation of Concerns**: Decouple business logic, data persistence, and transport/presentation layers.
- **Contract-First Design**: Finalize API contracts before writing frontend or backend implementation.
- **Fail-Safe Defaults**: Incorporate defensive security, schema validation, and structured error boundaries.
- **Data Integrity**: Enforce schema constraints, foreign key relationships, and ACID/transactional safety.

---

## 2. Step-by-Step Procedure

1. **Analyze Requirements**:
   - Ingest `docs/requirements.md` and map functional requirements to architectural modules.
2. **Select & Justify Tech Stack**:
   - Choose runtime, backend framework, database, and client libraries.
   - Document explicit technical trade-offs.
3. **Draft High-Level Architecture**:
   - Produce C4 Container/Component diagrams using Mermaid syntax.
4. **Model Database Schema & ERD**:
   - Define entity relations, primary keys, foreign keys, indexes, and constraints.
5. **Formulate Formal API Contract**:
   - Specify endpoints, HTTP methods, headers, request bodies, query params, responses, and error shapes according to [references/rest-api-standards.md](./references/rest-api-standards.md).
6. **Publish Deliverables**:
   - Save architecture specifications to `docs/architecture.md` using [templates/architecture-template.md](./templates/architecture-template.md).
   - Save API contract specifications to `docs/api-contract.md` using [templates/api-contract-template.md](./templates/api-contract-template.md).
