/// <mls fileReference="_102054_/l2/molecules/groupviewcard/ml-profile-card.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupViewCard';
export const skill = `# Metadata
- TagName: groupviewcard--ml-profile-card

# Objective
A profile/content card that groups related information into header, content, footer and action regions. Supports clickable, selected, disabled and loading states, and an editing mode that propagates to nested molecules.

# Responsibilities
- Render content from named regions: CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction.
- When clickable and enabled, behave as a button: dispatch a cardClick event on click or Enter/Space; expose role/tabindex.
- Apply selected, disabled and loading appearances; show a loading skeleton when loading.
- In editing mode, set is-editing on nested custom elements so child molecules switch to edit mode.

# Constraints
- cardClick must not fire while disabled or loading, or when not clickable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). The card is a translucent glass panel. Assumes a rich/dark background behind the component (container contract).`;
