/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-circular-progress-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML CIRCULAR PROGRESS — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupShowProgress
// Herda CircularProgressMolecule (mls-102040): contrato/props (value, size, label,
// showValue) e clamp/determinismo. Sobrescreve so render() + helpers de aparencia.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CircularProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-circular-progress.js';

interface CircularProgressInternals {
  isDeterminate(): boolean;
  getClampedValue(): number;
  getAriaAttributes(value: number | null): unknown;
  getResolvedSize(): string;
}

@customElement('groupshowprogress--ml-circular-progress-brutal')
export class CircularProgressBrutal extends CircularProgressMolecule {
  private get x(): CircularProgressInternals {
    return this as unknown as CircularProgressInternals;
  }

  // ===========================================================================
  // RENDER (override) — logica/clamp herdados via this.x
  // ===========================================================================
  render() {
    const determinate = this.x.isDeterminate();
    const clampedValue = determinate ? this.x.getClampedValue() : null;
    const showText = determinate && this.showValue;
    const ariaAttrs = this.x.getAriaAttributes(clampedValue);
    return html`
      <div class="${this.brutalWrapperClasses()}" role="progressbar" aria-label="${this.label || 'Progress'}" ${ariaAttrs}>
        ${this.brutalRenderSvg(clampedValue, determinate)}
        ${showText ? html`<div class="${this.brutalValueTextClasses()}">${Math.round(clampedValue || 0)}%</div>` : html``}
      </div>
    `;
  }

  // ===========================================================================
  // SVG RENDERING (brutal)
  // ===========================================================================
  private brutalRenderSvg(value: number | null, determinate: boolean): TemplateResult {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = determinate && value !== null ? circumference * (1 - value / 100) : circumference * 0.25;
    return html`
      <svg viewBox="0 0 100 100" class="${this.brutalSvgClasses()}" aria-hidden="true">
        ${svg`
          <circle cx="50" cy="50" r="45" fill="none" stroke-width="10" class="brutal-cp-track"></circle>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke-width="10"
            stroke-linecap="square"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${dashOffset}"
            class="brutal-cp-fill"
            transform="${determinate ? 'rotate(-90 50 50)' : ''}"
          >
            ${!determinate
              ? svg`<animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>`
              : svg``}
          </circle>
        `}
      </svg>
    `;
  }

  // ---- helpers presentacionais (brutal) ----
  private brutalWrapperClasses(): string {
    return ['brutal-cp relative inline-flex items-center justify-center', this.brutalSizeClasses()].join(' ');
  }

  private brutalSvgClasses(): string {
    return 'w-full h-full';
  }

  private brutalValueTextClasses(): string {
    return 'brutal-cp-value absolute text-xs font-bold pointer-events-none';
  }

  private brutalSizeClasses(): string {
    const size = this.x.getResolvedSize();
    const map: Record<string, string> = {
      xs: 'w-4 h-4',
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-16 h-16',
    };
    return map[size] || map.md;
  }
}
