/// <mls fileReference="_102054_/l2/molecules/grouptriggeraction/ml-split-button.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupTriggerAction';
export const skill = `# Metadata
- TagName: grouptriggeraction--ml-split-button

# Objective
A split button combining a primary action with a dropdown of secondary actions. The main button triggers the default action; the chevron opens a menu of additional options. Supports sizes, icon, disabled and loading states.

# Responsibilities
- Render a primary button (Label + optional Icon) and a chevron button that toggles a secondary menu.
- Collect secondary options from child elements that carry a value attribute; hide them from normal flow.
- Dispatch an action event (bubbling, composed) with the chosen value: the primary value for the main button, or the option value from the menu.
- Close the menu after an option is selected.
- Support sizes (xs, sm, md, lg), icon position (start/end), button/submit/reset types.
- Show a spinner and busy state while loading; block activation while loading or disabled.
- Expose an accessible label for the primary action and a "more options" label for the chevron.

# Constraints
- Only child elements with a value attribute become menu options.
- Disabled options must not trigger actions.
- Action events must not fire while disabled or loading.
- The component must not contain business logic; slot/option content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Appearance lives in the scoped .less; the buttons are translucent glass and the menu is a translucent popover. Assumes a rich/dark background behind the component (container contract).`;
