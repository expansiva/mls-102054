/// <mls fileReference="_102054_/l2/molecules/groupenterdate/ml-date-picker.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterDate';
export const skill = `# Metadata
- TagName: groupenterdate--ml-date-picker

# Objective
A date picker with a trigger field and a popover calendar. The value is an ISO date string (YYYY-MM-DD). Supports locale formatting, min/max date bounds, first day of week, optional week numbers, validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Open a popover calendar; navigate months (respecting min/max) and select a day.
- Format the trigger and view value via Intl.DateTimeFormat; mark today and the selected day.
- Clear the value; close on outside click; dispatch change ({ value }), monthChange ({ year, month }), focus and blur.

# Constraints
- Dates outside min/max are disabled; no changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent trigger; calendar popover uses rgba(30,27,75,0.85) + blur(18px); selected day in indigo. Assumes a rich/dark background (container contract).`;
