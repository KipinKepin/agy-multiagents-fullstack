# REST API Standards Reference

## HTTP Methods
- `GET`: Retrieve a resource or collection (idempotent, safe).
- `POST`: Create a new resource (non-idempotent).
- `PUT`: Replace an existing resource completely (idempotent).
- `PATCH`: Partially update an existing resource.
- `DELETE`: Remove a resource (idempotent).

## Status Codes
- `200 OK`: Successful retrieval or synchronous update.
- `201 Created`: Resource successfully created.
- `204 No Content`: Successful operation returning no body (e.g. deletion).
- `400 Bad Request`: Validation failure or malformed payload.
- `401 Unauthorized`: Authentication missing or invalid.
- `403 Forbidden`: Authenticated user lacks permission.
- `404 Not Found`: Resource does not exist.
- `409 Conflict`: Conflict with current state (e.g., unique key violation).
- `500 Internal Server Error`: Unhandled server-side failure.

## Standard Envelope Shapes
### Success
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Item with ID 123 was not found",
    "details": []
  }
}
```
