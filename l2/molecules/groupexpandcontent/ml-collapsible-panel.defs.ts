/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/ml-collapsible-panel.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupExpandContent';
export const skill = `# Metadata
- TagName: groupexpandcontent--ml-collapsible-panel

# Objective
A stacked collapsible panel: each Section has a title, optional subtitle and icon, and expandable HTML content. Supports single or multiple open sections, per-section expanded/disabled flags, keyboard control and a loading skeleton.

# Responsibilities
- Parse Section slots; open initially-expanded sections; toggle on header click/Enter/Space.
- Enforce single vs multiple open mode; support ArrowUp/Down to move focus between headers.
- Dispatch toggle with { index, title, expanded }; animate content height/opacity.

# Constraints
- No toggling while disabled or loading; disabled sections cannot open.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Frosted stacked sections; open header highlighted in indigo. Assumes a rich/dark background (container contract).`;
