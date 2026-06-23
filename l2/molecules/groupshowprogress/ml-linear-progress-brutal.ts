/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-linear-progress-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML LINEAR PROGRESS — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupShowProgress
// Herda LinearProgressMolecule (mls-102040): contrato/props (value, size, label,
// showValue, variant) e clamp. Sobrescreve so render() + helpers de aparencia.
// This molecule does NOT contain business logic.
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LinearProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-linear-progress.js';

interface LinearProgressInternals {
  getNormalizedValue(): number | null;
  getTextSizeClasses(): string;
}

@customElement('groupshowprogress--ml-linear-progress-brutal')
export class LinearProgressBrutal extends LinearProgressMolecule {
  private get x(): LinearProgressInternals {
    return this as unknown as LinearProgressInternals;
  }

  // ---- helpers presentacionais (brutal) — nomes proprios p/ nao colidir com os private do pai ----
  private brutalSizeClasses(): string {
    const sizeMap: Record<string, string> = {
      xs: 'brutal-lp--xs',
      sm: 'brutal-lp--sm',
      md: 'brutal-lp--md',
      lg: 'brutal-lp--lg',
    };
    return sizeMap[this.size] || sizeMap.md;
  }

  private brutalTrackClasses(): string {
    return 'brutal-lp-track w-full overflow-hidden';
  }

  private brutalFillClasses(isIndeterminate: boolean): string {
    return ['brutal-lp-fill h-full', `is-${this.variant}`, isIndeterminate ? 'is-indeterminate' : '']
      .filter(Boolean)
      .join(' ');
  }

  private brutalValueText(value: number | null) {
    if (value === null || !this.showValue) return null;
    const textClasses = ['brutal-lp-value min-w-[3rem] text-right', this.x.getTextSizeClasses()].join(' ');
    return html`<span class="${textClasses}">${Math.round(value)}%</span>`;
  }

  // ===========================================================================
  // RENDER (override) — logica/clamp herdados via this.x
  // ===========================================================================
  render() {
    const normalized = this.x.getNormalizedValue();
    const isIndeterminate = normalized === null;

    const trackClasses = [this.brutalTrackClasses(), this.brutalSizeClasses()].join(' ');

    const fillClasses = this.brutalFillClasses(isIndeterminate);
    const widthStyle = isIndeterminate ? '' : `width: ${normalized}%;`;

    const ariaAttrs = {
      role: 'progressbar',
      'aria-label': this.label || undefined,
      'aria-valuemin': isIndeterminate ? undefined : '0',
      'aria-valuemax': isIndeterminate ? undefined : '100',
      'aria-valuenow': isIndeterminate ? undefined : String(normalized),
    } as Record<string, string | undefined>;

    return html`
      <div class="w-full flex items-center gap-2" ...=${ariaAttrs}>
        <div class="${trackClasses}">
          <div class="${fillClasses}" style="${widthStyle}" aria-hidden="true"></div>
        </div>
        ${this.brutalValueText(isIndeterminate ? null : normalized)}
      </div>
    `;
  }
}
