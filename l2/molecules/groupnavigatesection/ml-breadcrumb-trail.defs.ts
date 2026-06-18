/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSection';
export const skill = `# Metadata
- TagName: groupnavigatesection--ml-breadcrumb-trail

# Objective
A breadcrumb trail that shows the navigation path as a sequence of levels separated by delimiters. The last level is the current page (non-interactive); earlier levels are clickable. Collapses middle levels into an overflow menu on small screens, and shows the active level's content.

# Responsibilities
- Render each Tab slot as a breadcrumb level with optional icon and title, separated by a delimiter.
- Treat the last level as the current page (non-clickable); make earlier, enabled levels clickable.
- Dispatch a change event (value, title) when an earlier level is activated.
- On small screens, collapse middle levels into an overflow ("...") menu.
- Support keyboard navigation (ArrowLeft/ArrowRight, Enter/Space) across interactive levels.
- Show the active level's content, plus loading and error states.

# Constraints
- The last level and disabled levels are not clickable.
- No interaction while loading or disabled.
- The component must not contain business logic; content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Levels are subtle translucent links; the overflow menu is a translucent popover. Assumes a rich/dark background behind the component (container contract).`;
