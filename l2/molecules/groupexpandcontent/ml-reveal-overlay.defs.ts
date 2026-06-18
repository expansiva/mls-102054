/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/ml-reveal-overlay.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupExpandContent';
export const skill = `# Metadata
- TagName: groupexpandcontent--ml-reveal-overlay

# Objective
Hide section content behind a frosted overlay with a reveal action, expanding to show the content when activated. Supports multiple or single reveal, per-section disabled state, an optional warning label, and loading state.

# Responsibilities
- Render each Section slot with its content covered by an overlay until revealed.
- Toggle a section open/closed when its header or the reveal button is activated; dispatch a toggle event (index, title, expanded).
- In single mode, revealing a section hides any previously revealed section.
- Initialize revealed sections from the expanded attribute at first render.
- Support keyboard activation (Enter/Space) and ArrowUp/ArrowDown navigation between headers.
- Render an optional Label slot as a warning note above each section.
- Apply disabled appearance and block interaction for the whole component or individual sections.
- Render a loading placeholder when loading is true.

# Constraints
- A disabled component or section must not toggle.
- Section content is rendered via unsafeHTML and must not be sanitized here.
- The component must not contain business logic; it only manages reveal state and appearance.

# Notes
- Visual model: glassmorphism (mls-102054). The overlay uses backdrop-filter to frost the content until revealed. Assumes a rich/dark background behind the component (container contract).`;
