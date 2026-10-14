# Gherkin Acceptance Criteria Reference

Gherkin is a Domain Specific Language (DSL) for writing testable acceptance criteria.

## Syntax Pattern
```gherkin
Feature: [Feature Name]
  As a [Role]
  I want to [Action]
  So that [Benefit]

  Scenario: [Success Case / Happy Path]
    Given [Initial system state or precondition]
    And [Additional context or authenticated state]
    When [User performs an action or submits input]
    Then [Expected outcome or system state change]
    And [Response status or UI feedback]

  Scenario: [Failure Case / Validation Error]
    Given [Precondition]
    When [User submits invalid or missing fields]
    Then [System responds with 400 Bad Request]
    And [System displays field-level error message]
```

## Best Practices
1. **One Assertion per Scenario**: Keep scenarios focused on a single behavior.
2. **Deterministic Inputs**: Avoid ambiguous terms like "valid data"; specify "a registered email format".
3. **Reusable Steps**: Use `And` to chain steps without repeating `Given` or `When`.
