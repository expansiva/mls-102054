/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-alert-modal.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNotifyUser';
export const skill = `# Metadata
- TagName: groupnotifyuser--ml-alert-modal

# Objective
Display a centered modal alert dialog over a dimmed overlay to communicate an important status to the user and optionally request an action. Supports four semantic types (info, success, warning, error), optional title, custom icon, action area, dismiss button, timed auto-dismiss, and configurable position.

# Responsibilities
- Render nothing when visible is false; render the overlay and dialog when visible is true.
- Apply type-specific accent and icon (info, success, warning, error); normalize "danger" to "error".
- Render a custom icon from the Icon slot when provided; otherwise render the default type icon.
- Render an optional Title slot and the Message slot (with fallback text when absent).
- Render an optional Action slot and dispatch an action custom event (bubbling, composed) when clicked.
- Render a dismiss button when dismissible is true; clicking it sets visible to false and dispatches a dismiss event.
- Start an auto-dismiss timer when visible and duration > 0; cancel it when visible becomes false or duration is 0.
- Position the dialog according to the position property (center, top, bottom, and corners).
- Set role/aria-live according to type and mark the dialog as aria-modal.

# Constraints
- The dialog must render no DOM output while visible is false.
- The dismiss button must not appear unless dismissible is true.
- Only one auto-dismiss timer may be active at a time.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). The scrim uses backdrop-filter to blur the page behind it and the dialog is a translucent glass panel. Assumes a rich/dark background behind the component (container contract).`;
