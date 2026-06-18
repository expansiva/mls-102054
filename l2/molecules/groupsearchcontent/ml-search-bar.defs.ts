/// <mls fileReference="_102054_/l2/molecules/groupsearchcontent/ml-search-bar.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSearchContent';
export const skill = `# Metadata
- TagName: groupsearchcontent--ml-search-bar

# Objective
A search input with a leading icon, clearable text, debounced search events, and an optional suggestion dropdown with keyboard navigation. Supports validation, disabled and loading states.

# Responsibilities
- Track the query, debounce 'search' events, and dispatch 'change' on commit (Enter or suggestion click) and 'clear' when emptied.
- Render suggestions from Suggestion slots; support ArrowUp/Down/Enter/Escape and mouse selection.
- Show loading and empty states inside the suggestion panel; show label, helper or error.

# Constraints
- No interaction while disabled.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent input with icon; suggestion panel uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
