/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/ml-wizard-steps.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSteps';
export const skill = `# Metadata
- TagName: groupnavigatesteps--ml-wizard-steps

# Objective
A wizard step navigator rendering each step as a card with an index/check indicator, title and optional description. The current step is value (index). Supports linear navigation rules, keyboard control and a loading state.

# Responsibilities
- Parse Step slots (title/description/completed/disabled); highlight the active and completed steps.
- Enforce linear navigation (can only reach the next step when the current is completed) and skip disabled steps.
- Dispatch change with { value, title } on navigation; support arrow/Enter/Space keyboard control.

# Constraints
- In linear mode forward navigation requires the current step to be completed; disabled steps are not navigable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Frosted step cards; active is indigo, completed is emerald. Assumes a rich/dark background (container contract).`;
