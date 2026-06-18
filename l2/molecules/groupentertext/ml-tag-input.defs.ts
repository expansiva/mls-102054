/// <mls fileReference="_102054_/l2/molecules/groupentertext/ml-tag-input.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-tag-input

# Objective
A tag/chip input. The user types tokens and commits them with Enter or comma; tags are stored as a comma-separated string. Backspace on an empty field removes the last tag. Supports a multi-line textarea mode (rows > 1), min/max length, prefix/suffix, validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Parse value into tags (split by comma) and render removable chips.
- Add tags on Enter/comma/blur (dedup case-insensitively, enforce min/max length) and remove by index.
- In multi-line mode, behave as a plain textarea with optional character counter.
- Dispatch input/change/focus/blur with { value } and focus the field on container click.

# Constraints
- Duplicate tags (case-insensitive) and tags outside min/max length are rejected.
- No edits while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent box with frosted chips. Assumes a rich/dark background behind the component (container contract).`;
