/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-card-selector.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-card-selector

# Objective
A single-select control that opens a popover panel with rich option cards (optionally grouped and searchable). The user picks one card. Supports validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Parse Item/Group slots into cards (HTML content preserved) and optionally filter by a search query.
- Open/close a popover; support keyboard navigation (arrows/Enter/Escape) and outside-click close.
- Mark the selected card and dispatch change/focus/blur with { value }.
- Render label, helper or error, loading state and empty state.

# Constraints
- No selection while disabled or readonly; disabled cards cannot be chosen.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent trigger; popover panel uses rgba(30,27,75,0.85) + blur(18px); cards are frosted. Assumes a rich/dark background (container contract).`;
