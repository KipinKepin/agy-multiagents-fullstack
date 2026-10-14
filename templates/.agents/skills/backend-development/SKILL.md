---
name: backend-development
description: >-
  Use this skill when developing backend services, APIs, database layers, middleware,
  and server-side logic in src/backend/.
---

# Backend Development Skill

This skill guides backend engineers in building production-grade server architectures, REST/RPC endpoints, database persistence layers, and error handlers.

---

## 1. Principles
- **Contract Adherence**: Implement endpoints and payloads that strictly mirror `docs/api-contract.md`.
- **Layered Architecture**: Decouple controllers, services, repositories, and data models.
- **Fail-Safe Robustness**: All asynchronous operations must be wrapped in structured try/catch blocks with global middleware error reporting.
- **Defensive Security**: Sanitize inputs, enforce parameterized SQL queries, and store configuration in environment variables.

---

## 2. Step-by-Step Procedure

1. **Review Architecture**:
   - Inspect `docs/architecture.md` and `docs/api-contract.md`.
2. **Bootstrap Project**:
   - Initialize package manifests and install necessary dependencies using `run_command`.
3. **Establish Layered Structure**:
   - Refer to [references/clean-architecture.md](./references/clean-architecture.md) and [examples/api-structure.md](./examples/api-structure.md).
4. **Implement Models & Database Layer**:
   - Define data schemas, migrations, and repository queries.
5. **Implement Services (Business Logic)**:
   - Encapsulate domain rules, computations, and external integrations.
6. **Implement Routes & Controllers**:
   - Map HTTP requests to service methods and format responses in the standard JSON envelope.
7. **Write Middleware**:
   - Add auth verification, schema validation, rate-limiting, and error-handling middleware.
8. **Verify & Test**:
   - Execute unit tests and syntax checks via `run_command`.
