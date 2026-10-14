# API Contract Document Template

```markdown
# API Contract Specification

## Base URL
`/api/v1`

## Standard Request Headers
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

---

## Endpoint Definitions

### 1. [Resource Name]

#### `GET /api/v1/resource`
- **Description**: Retrieve paginated list of resources
- **Auth Required**: No
- **Query Parameters**:
  - `page` (integer, default: 1)
  - `limit` (integer, default: 20)
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid",
        "name": "example"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 100 }
  }
  ```

#### `POST /api/v1/resource`
- **Description**: Create new resource
- **Auth Required**: Yes (User / Admin)
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "data": { "id": "uuid", "name": "string" }
  }
  ```
- **Response `400 Bad Request`**:
  ```json
  {
    "success": false,
    "error": { "code": "VALIDATION_FAILED", "message": "Name is required" }
  }
  ```
```
