/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-linear-progress.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// LINEAR PROGRESS MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupShowProgress
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

@customElement('groupshowprogress--ml-linear-progress')
export class LinearProgressMolecule extends MoleculeAuraElement {
  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags: string[] = [];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: Number })
  value: number | null = null;

  @propertyDataSource({ type: String })
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @propertyDataSource({ type: String })
  label: string = '';

  @propertyDataSource({ type: Boolean, attribute: 'show-value' })
  showValue: boolean = false;

  @propertyDataSource({ type: String })
  variant: 'default' | 'success' | 'warning' | 'danger' = 'default';

  // ===========================================================================
  // HELPERS
  // ===========================================================================
  private getNormalizedValue(): number | null {
    if (this.value === null || this.value === undefined) return null;
    const clamped = Math.max(0, Math.min(100, this.value));
    return clamped;
  }

  private getSizeClasses(): string {
    const sizeMap: Record<string, string> = {
      xs: 'glass-lp--xs',
      sm: 'glass-lp--sm',
      md: 'glass-lp--md',
      lg: 'glass-lp--lg',
    };
    return sizeMap[this.size] || sizeMap.md;
  }

  private getTextSizeClasses(): string {
    const sizeMap: Record<string, string> = {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    };
    return sizeMap[this.size] || sizeMap.md;
  }

  private getTrackClasses(): string {
    return 'glass-lp-track w-full overflow-hidden';
  }

  private getFillClasses(isIndeterminate: boolean): string {
    return [
      'glass-lp-fill h-full',
      `is-${this.variant}`,
      isIndeterminate ? 'is-indeterminate' : '',
    ].filter(Boolean).join(' ');
  }

  private renderValueText(value: number | null) {
    if (value === null || !this.showValue) return null;
    const textClasses = ['glass-lp-value min-w-[3rem] text-right', this.getTextSizeClasses()].join(' ');
    return html`<span class="${textClasses}">${Math.round(value)}%</span>`;
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const normalized = this.getNormalizedValue();
    const isIndeterminate = normalized === null;

    const trackClasses = [this.getTrackClasses(), this.getSizeClasses()].join(' ');

    const fillClasses = this.getFillClasses(isIndeterminate);
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
        ${this.renderValueText(isIndeterminate ? null : normalized)}
      </div>
    `;
  }
}
