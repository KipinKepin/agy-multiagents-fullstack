# Clean Layered Backend Architecture

## Layer Responsibilities

```text
HTTP Request
     │
     ▼
┌─────────────┐
│ Controllers │  <-- Parses HTTP request, query params, headers, and returns HTTP responses
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Services   │  <-- Contains core domain logic, computations, and business rules
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Repositories │  <-- Interacts with database, ORM, files, or external caches
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Database   │  <-- Persistent storage
└─────────────┘
```

## Rules of Dependency
1. Controllers depend on Services.
2. Services depend on Repositories.
3. Repositories depend on database models/drivers.
4. Business domain models should never depend on transport layers (e.g. Express/FastAPI request objects).
