/// <mls fileReference="_102054_/l2/molecules/groupnavigatemain/ml-sidebar-nav.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateMain';
export const skill = `# Metadata
- TagName: groupnavigatemain--ml-sidebar-nav

# Objective
A primary application sidebar navigation listing items (with icons and badges), optionally organized in collapsible groups and a footer. Supports a collapsed (icon-only) mode, active item highlight, disabled items, and loading state.

# Responsibilities
- Render top-level Item slots, grouped Items inside Group slots (with collapsible group headers), and Footer Items.
- Each item shows an icon (or initials fallback), label, and optional badge.
- Track the active item via value; dispatch a change event (value, label, badge) when an enabled item is clicked.
- Toggle a collapsed (icon-only) mode and dispatch a collapse event; show tooltips and a badge dot when collapsed.
- Collapse/expand individual groups.
- Show a loading skeleton; apply disabled appearance and block interaction for disabled items or the whole component.

# Constraints
- Disabled items do not trigger change events.
- The component must not contain business logic; slot content/icons are rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). The sidebar surface and items are translucent glass; active item uses an indigo tint. Assumes a rich/dark background behind the component (container contract).`;
