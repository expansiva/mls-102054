/// <mls fileReference="_102054_/l2/molecules/groupentermoney/ml-currency-input.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterMoney';
export const skill = `# Metadata
- TagName: groupentermoney--ml-currency-input

# Objective
A currency amount input. The user types digits which are interpreted as minor units (cents) and formatted with locale/currency. Supports min/max clamping, decimals, optional symbol, validation, disabled/readonly/loading and a read-only view mode.

# Responsibilities
- Maintain a raw input string and parse it to a number (BigInt-safe) on input.
- Format the committed value with Intl.NumberFormat (currency or decimal) on blur and in view mode.
- Clamp the value to min/max on blur and dispatch input/change/focus/blur with { value }.
- Render label, helper or error, and a loading overlay.

# Constraints
- Value is rounded to the configured number of decimals and clamped to min/max on blur.
- No value changes while disabled or readonly.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent field with light text. Assumes a rich/dark background behind the component (container contract).`;
