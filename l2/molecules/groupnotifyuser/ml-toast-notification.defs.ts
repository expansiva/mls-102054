/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-toast-notification.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNotifyUser';
export const skill = `# Metadata
- TagName: groupnotifyuser--ml-toast-notification

# Objective
Display a transient toast notification that appears at a configurable screen position to communicate a short status message, with four semantic types (info, success, warning, error), optional title, action, and custom icon, a dismiss button, and automatic timed dismissal with enter/exit animation.

# Responsibilities
- Render the toast only when visible is true (or while animating out); render nothing otherwise.
- Apply type-specific colors and a default icon matching the type.
- Render optional Title, Message, Action and Icon slots; dispatch an action event when the Action area is clicked.
- Render a dismiss button when dismissible is true; dismissing animates out, sets visible to false and dispatches a dismiss event.
- Start an auto-close timer when visible and duration > 0; cancel it when visible becomes false or duration changes; clear on disconnect.
- Apply fixed-position placement classes from the position property (top, bottom and corners) and enter/exit animation classes.
- Set role/aria-live according to type.

# Constraints
- The toast must render no DOM output while not visible and not animating out.
- The dismiss button must not appear unless dismissible is true.
- Only one auto-close timer may be active at a time.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Appearance lives in the scoped .less; the toast is a translucent panel tinted by type. Assumes a rich/dark background behind the component (container contract).`;
