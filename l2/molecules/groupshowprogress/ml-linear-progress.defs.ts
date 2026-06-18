/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-linear-progress.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupShowProgress';
export const skill = `# Metadata
- TagName: groupshowprogress--ml-linear-progress

# Objective
A horizontal progress bar. Shows determinate progress (0–100) or an indeterminate animation when value is null. Supports size (xs/sm/md/lg), semantic variant (default/success/warning/danger), an optional percentage readout and an aria label.

# Responsibilities
- Clamp value to 0–100 and render the fill width; animate when indeterminate.
- Apply size and variant styling; optionally show the rounded percentage.
- Expose progressbar ARIA attributes (valuemin/max/now) or omit them when indeterminate.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent track with a luminous gradient fill. Assumes a rich/dark background (container contract).`;
