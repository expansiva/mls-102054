/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-navigate-pills.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSection';
export const skill = `# Metadata
- TagName: groupnavigatesection--ml-navigate-pills

# Objective
A pill-style section navigation that lets the user switch between named tabs, showing the active tab's content below. Supports icons per tab, disabled tabs, loading and error states, and keyboard navigation.

# Responsibilities
- Render each Tab slot as a pill with optional icon and title; show the active tab's content in a panel.
- Track the active tab via the value property; default to the first enabled tab.
- Dispatch a change event (value, title) when a tab is activated.
- Support keyboard navigation (ArrowLeft/ArrowRight to move focus, Enter/Space to activate), skipping disabled tabs.
- Show disabled tabs as non-interactive; show a loading state and an error message when provided.

# Constraints
- Disabled tabs cannot be activated.
- No interaction while loading or disabled.
- The component must not contain business logic; tab content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Pills and panel are translucent glass. Assumes a rich/dark background behind the component (container contract).`;
