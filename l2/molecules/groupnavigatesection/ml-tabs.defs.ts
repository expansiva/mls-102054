/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-tabs.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSection';
export const skill = `# Metadata
- TagName: groupnavigatesection--ml-tabs

# Objective
A classic underlined tab navigation that switches between sections and shows the active tab's content. Supports per-tab icons, disabled tabs, loading, empty and error states, and keyboard navigation.

# Responsibilities
- Render each Tab slot as an underlined tab with optional icon and title; show the active tab's content in a panel.
- Track the active tab via value; default to the first enabled tab.
- Dispatch a change event (value, title) when a tab is activated (not when re-selecting the active one).
- Support ArrowLeft/ArrowRight focus movement and Enter/Space activation, skipping disabled tabs (roving tabindex).
- Show loading, empty and error states.

# Constraints
- Disabled tabs cannot be activated; no interaction while loading or disabled.
- The component must not contain business logic; tab content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Active tab uses an accent underline; panel is translucent glass. Assumes a rich/dark background behind the component (container contract).`;
