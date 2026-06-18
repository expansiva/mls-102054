/// <mls fileReference="_102054_/l2/molecules/groupenternumber/ml-range-slider.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterNumber';
export const skill = `# Metadata
- TagName: groupenternumber--ml-range-slider

# Objective
A dual-handle range slider for selecting a numeric interval (low/high). Supports min/max, step, decimals, locale formatting, prefix/suffix, validation, disabled/readonly/loading and a read-only view mode.

# Responsibilities
- Render two range inputs (low and high) bound to value and value-high; clamp the pair so low <= high.
- Display the formatted current low/high values with optional prefix/suffix and a separator.
- Dispatch input while dragging and change on commit/blur with { value: { min, max } }; dispatch focus/blur.
- Show validation error or helper; show loading state; render a read-only summary when not editing.

# Constraints
- low must not exceed high; values are clamped to min/max and rounded to decimals.
- No value changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Track and thumbs are translucent glass. Assumes a rich/dark background behind the component (container contract).`;
