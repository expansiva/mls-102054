/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-big-number.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupViewMetric';
export const skill = `# Metadata
- TagName: groupviewmetric--ml-metric-big-number

# Objective
A single prominent metric: an oversized value with an optional icon, label, trend (up/down/neutral) and helper line. Supports a loading skeleton.

# Responsibilities
- Render Label/Value/Icon/Trend/Helper slots, with the Value rendered at large size.
- Color the trend by its direction attribute; expose an accessible figure label.
- Show a skeleton while loading; render nothing if no Value is provided.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent surface with light text. Assumes a rich/dark background (container contract).`;
