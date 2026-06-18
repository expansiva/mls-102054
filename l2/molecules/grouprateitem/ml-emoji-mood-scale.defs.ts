/// <mls fileReference="_102054_/l2/molecules/grouprateitem/ml-emoji-mood-scale.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupRateItem';
export const skill = `# Metadata
- TagName: grouprateitem--ml-emoji-mood-scale

# Objective
A mood/sentiment scale where each option is an emoji (or custom Item). The user picks a single value from min..max by step, or from explicit Item slots. Supports hover preview, keyboard navigation, validation, disabled/readonly and a read-only view.

# Responsibilities
- Build options from Item slots or min/max/step and render them as a radiogroup.
- Handle click/hover/keyboard selection; dispatch change/focus/blur with { value }.
- Render label, helper or error, and a read-only summary of the chosen option.

# Constraints
- No selection while disabled or readonly; required with no value shows a validation message.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Frosted emoji buttons; selected/hover highlighted in indigo. Assumes a rich/dark background (container contract).`;
