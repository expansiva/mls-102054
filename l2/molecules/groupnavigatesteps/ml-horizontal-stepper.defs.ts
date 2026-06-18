/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSteps';
export const skill = `# Metadata
- TagName: groupnavigatesteps--ml-horizontal-stepper

# Objective
A horizontal step indicator showing progress through an ordered sequence. Each Step has a title, optional description, optional icon, and completed/disabled flags. The current step is value (index). Supports linear navigation, keyboard control and a loading state.

# Responsibilities
- Parse Step slots; mark steps before value (or flagged completed) as completed and value as active.
- Allow click/keyboard navigation respecting linear mode (only up to value+1) and disabled steps.
- Dispatch change with { value, title } on navigation; render connectors between steps.

# Constraints
- In linear mode the user cannot skip ahead beyond the next step; disabled steps are not navigable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Glass circular indicators; active is indigo, completed is emerald. Assumes a rich/dark background (container contract).`;
