/// <mls fileReference="_102054_/l2/molecules/groupentertext/ml-password-strength-input.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-password-strength-input

# Objective
A password input with a live strength meter and criteria checklist (min length, uppercase, number, symbol). Supports show/hide toggle, optional mask, prefix/suffix, validation, disabled/readonly/loading and a masked read-only view.

# Responsibilities
- Maintain the password value, apply optional mask, and toggle visibility (text/password).
- Compute the criteria status and strength level (weak/medium/strong/veryStrong) and render the bar + checklist.
- Dispatch input/change/focus/blur with { value }.
- Render label, helper or error, and a loading state.

# Constraints
- maxLength limits the stored value; no value changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent field; strength bar uses semantic colors on a dark background (container contract).`;
