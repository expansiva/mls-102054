/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-card.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupViewMetric';
export const skill = `# Metadata
- TagName: groupviewmetric--ml-metric-card

# Objective
A compact KPI card showing a label, a large value, an optional icon, an optional trend badge (up/down/neutral) and an optional helper line. Supports a loading skeleton.

# Responsibilities
- Render Label/Value/Icon/Trend/Helper slots; color the trend badge by its direction attribute.
- Show a skeleton placeholder while loading.
- Expose an accessible figure label derived from the Label slot text.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent card with light text; trend badge uses semantic colors. Assumes a rich/dark background (container contract).`;
