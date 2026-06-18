/// <mls fileReference="_102054_/l2/molecules/groupenterdatetime/ml-datetime-picker.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterDatetime';
export const skill = `# Metadata
- TagName: groupenterdatetime--ml-datetime-picker

# Objective
A combined date and time picker. The value is an ISO datetime string (YYYY-MM-DDTHH:mm:ss). The popover shows a month calendar plus hour and minute columns, confirmed via a button. Supports locale/timezone formatting, min/max datetime bounds, minute step, validation, disabled/readonly/loading and a read-only view.

# Responsibilities
- Open a popover; select a day, then an hour and minute; confirm to commit the value.
- Disable out-of-range dates/times based on min/max and the chosen day; auto-pick the first valid time.
- Format the trigger/view via Intl.DateTimeFormat; clear the value; close on outside click.
- Dispatch change ({ value }), focus and blur; keep a hidden input in sync for forms.

# Constraints
- Values outside min/max are disabled; no changes while disabled, readonly or loading; selection is only committed on Confirm.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent trigger; popover uses rgba(30,27,75,0.85) + blur(18px); selected day/time in indigo; confirm button is a solid indigo accent. Assumes a rich/dark background (container contract).`;
