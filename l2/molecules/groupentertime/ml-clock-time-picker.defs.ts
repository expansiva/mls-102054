/// <mls fileReference="_102054_/l2/molecules/groupentertime/ml-clock-time-picker.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterTime';
export const skill = `# Metadata
- TagName: groupentertime--ml-clock-time-picker

# Objective
A time picker with a read-only field and a popover that steps through hour, then minute, then (optionally) second selection. The value is a time string (HH:mm or HH:mm:ss). Supports 12/24-hour mode with AM/PM, minute step, min/max time bounds, validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Open a popover; pick hour → minute → (second); toggle AM/PM in 12-hour mode; confirm to commit.
- Disable out-of-range hours/minutes/seconds based on min/max time; format the field via Intl.DateTimeFormat.
- Clear the value; close on outside click; dispatch change ({ value }), focus and blur.

# Constraints
- Values outside min/max are disabled; selection is only committed on Confirm; no changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent field; popover uses rgba(30,27,75,0.85) + blur(18px); circular time options, selected in indigo; confirm is a solid indigo accent. Assumes a rich/dark background (container contract).`;
