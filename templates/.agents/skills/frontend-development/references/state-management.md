# State Management Best Practices

## State Hierarchy
1. **Local State**: Component-specific UI states (e.g., `isOpen`, `isHovered`, active tab).
2. **Form State**: Ephemeral input values, validation errors, and dirty state.
3. **Server State (Cache)**: Remote API data, query cache, loading indicators, pagination cursors.
4. **Global Application State**: User authentication status, theme preferences, global notifications.

## Best Practices
- Keep state as close to where it is used as possible.
- Avoid duplicating server state in global client stores.
- Use structured loading states (`idle`, `loading`, `success`, `error`) to prevent UI flash or race conditions.
