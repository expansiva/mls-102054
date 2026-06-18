/// <mls fileReference="_102054_/l2/molecules/grouptriggeraction/ml-icon-button.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupTriggerAction';
export const skill = `# Metadata
- TagName: grouptriggeraction--ml-icon-button

# Objective
An icon-only button that triggers an action. It shows an icon (custom or default), supports multiple sizes, disabled and loading states, and exposes an accessible label derived from the Label slot for assistive technologies.

# Responsibilities
- Render an icon-only button using the Icon slot, or a default icon when none is provided.
- Expose an accessible name from the Label slot (stripped of markup); fall back to a default label.
- Adjust size according to the size property (xs, sm, md, lg).
- Behave as button, submit, or reset based on type.
- Show a spinner and busy state during loading; block activation while loading or disabled.
- Dispatch an action event (bubbling, composed) when activated, unless disabled or loading.

# Constraints
- The visible content is icon-only; the label exists for accessibility (sr-only).
- The action event must not fire while disabled or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Appearance lives in the scoped .less; the button is a translucent glass square. Assumes a rich/dark background behind the component (container contract).`;
