/// <mls fileReference="_102054_/l2/molecules/groupselectmany/ml-popover-multi-select.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectMany';
export const skill = `# Metadata
- TagName: groupselectmany--ml-popover-multi-select

# Objective
A multi-select control that opens a popover listbox. The value is a comma-separated string of selected values. Supports optional search, grouped options, min/max selection limits, validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Parse Item/Group slots, optionally filter by search, and toggle selection on click/keyboard.
- Show selected items as chips in the trigger (with a +N overflow indicator).
- Enforce max-selection (disabling unselected items when full) and compute min/required validation.
- Dispatch change/focus/blur with { value } and support arrow/Enter/Space/Escape keyboard navigation.

# Constraints
- No changes while disabled, readonly or loading; disabled items cannot be toggled.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent trigger with frosted chips; popover panel uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
