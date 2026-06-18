/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-circular-progress.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupShowProgress';
export const skill = `# Metadata
- TagName: groupshowprogress--ml-circular-progress

# Objective
A circular (ring) progress indicator. Shows determinate progress (0–100) via stroke offset or an indeterminate spinning arc when value is null. Supports size (xs/sm/md/lg), an optional centered percentage and an aria label.

# Responsibilities
- Compute the SVG circle dash offset from the clamped value; spin the arc when indeterminate.
- Apply size classes and optionally render the rounded percentage in the center.
- Expose progressbar ARIA attributes when determinate.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent ring track with a glowing arc. Assumes a rich/dark background (container contract).`;
