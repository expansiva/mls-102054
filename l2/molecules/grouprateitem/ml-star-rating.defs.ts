/// <mls fileReference="_102054_/l2/molecules/grouprateitem/ml-star-rating.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupRateItem';
export const skill = `# Metadata
- TagName: grouprateitem--ml-star-rating

# Objective
A star (or custom Item) rating control. The user picks a value from min..max by step, or from explicit Item slots. Supports hover preview, keyboard navigation, validation, disabled/readonly and a read-only view.

# Responsibilities
- Build rating options from Item slots or from min/max/step; highlight items up to the active value.
- Handle click/hover/keyboard selection as a radiogroup and dispatch change/focus/blur with { value }.
- Render label, helper or error, a hidden input for forms, and a read-only summary.

# Constraints
- No selection while disabled or readonly; required with no value marks the group invalid.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent container; active stars glow gold. Assumes a rich/dark background (container contract).`;
