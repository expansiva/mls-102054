/// <mls fileReference="_102054_/l2/molecules/groupenternumber/ml-number-stepper.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterNumber';
export const skill = `# Metadata
- TagName: groupenternumber--ml-number-stepper

# Objective
A numeric input with increment/decrement buttons. Supports min/max bounds, step, decimal precision, locale-aware formatting, prefix/suffix, validation, disabled/readonly/loading and a read-only view mode.

# Responsibilities
- Display a formatted numeric value with optional prefix/suffix; allow typing and parsing back to a number using locale separators.
- Increment/decrement by step, clamped to min/max; round to the configured decimals.
- Dispatch input on typing and change on blur/step; dispatch focus/blur events.
- Show validation error (including required when empty); show helper otherwise.
- Render a plain read-only view when not editing; show loading state.

# Constraints
- Value must respect min/max and decimals.
- No interaction while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Field and buttons are translucent glass. Assumes a rich/dark background behind the component (container contract).`;
