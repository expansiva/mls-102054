/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-combobox.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-combobox

# Objective
A single-select combobox with type-to-filter, keyboard navigation, optional grouped options, optional free-text entry, and an optional clear button. Supports validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Parse Item/Group slots into options and filter them by the typed query.
- Open a popover listbox; support ArrowUp/Down/Enter/Escape/Tab and mouse selection.
- Accept free text as the value when free-text is enabled; clear the value via the clear button.
- Dispatch input/change/focus/blur with { value } and keep a hidden input in sync for forms.

# Constraints
- No selection while disabled, readonly or loading; disabled items are skipped.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent input; the popover panel uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
