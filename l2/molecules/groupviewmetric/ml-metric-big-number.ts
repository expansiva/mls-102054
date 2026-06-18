/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-big-number.ts" enhancement="_102020_/l2/enhancementAura" />

// =============================================================================
// ML METRIC BIG NUMBER MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupViewMetric
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

@customElement('groupviewmetric--ml-metric-big-number')
export class MlMetricBigNumberMolecule extends MoleculeAuraElement {
  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Label', 'Value', 'Icon', 'Trend', 'Helper'];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: Boolean })
  loading = false;

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render(): TemplateResult {
    if (this.loading) {
      return this.renderLoadingSkeleton();
    }

    if (!this.hasSlot('Value')) {
      return html``;
    }

    const ariaLabel = this.getAriaLabel();

    return html`
      <div class="${this.getContainerClasses()}" role="figure" aria-label="${ariaLabel}">
        ${this.hasSlot('Icon') ? this.renderIcon() : html``}
        ${this.hasSlot('Label') ? this.renderLabel() : html``}
        ${this.renderValue()}
        ${this.hasSlot('Trend') ? this.renderTrend() : html``}
        ${this.hasSlot('Helper') ? this.renderHelper() : html``}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private renderIcon(): TemplateResult {
    const content = this.getSlotContent('Icon');
    return html`<div class="glass-bn-icon flex items-center">${unsafeHTML(content)}</div>`;
  }

  private renderLabel(): TemplateResult {
    const content = this.getSlotContent('Label');
    return html`<div class="glass-bn-label text-sm font-medium">${unsafeHTML(content)}</div>`;
  }

  private renderValue(): TemplateResult {
    const content = this.getSlotContent('Value');
    return html`<div class="glass-bn-value text-4xl leading-tight font-semibold" aria-live="polite">${unsafeHTML(content)}</div>`;
  }

  private renderTrend(): TemplateResult {
    const direction = this.getTrendDirection();
    const content = this.getSlotContent('Trend');
    return html`<div class="${this.getTrendClasses(direction)}" aria-label="Trend: ${direction}">${unsafeHTML(content)}</div>`;
  }

  private renderHelper(): TemplateResult {
    const content = this.getSlotContent('Helper');
    return html`<div class="glass-bn-helper text-xs">${unsafeHTML(content)}</div>`;
  }

  private renderLoadingSkeleton(): TemplateResult {
    return html`
      <div class="${this.getContainerClasses()}" role="figure" aria-busy="true">
        <div class="glass-bn-skel h-4 w-24"></div>
        <div class="glass-bn-skel mt-2 h-10 w-40"></div>
        <div class="glass-bn-skel mt-2 h-4 w-20"></div>
      </div>
    `;
  }

  // ===========================================================================
  // CLASS HELPERS (glass)
  // ===========================================================================
  private getContainerClasses(): string {
    return 'glass-bn flex flex-col gap-1 p-4';
  }

  private getTrendClasses(direction: 'up' | 'down' | 'neutral'): string {
    const dir = direction === 'up' ? 'is-up' : direction === 'down' ? 'is-down' : 'is-neutral';
    return `glass-bn-trend ${dir} inline-flex items-center gap-1 text-sm font-medium`;
  }

  // ===========================================================================
  // UTILITIES
  // ===========================================================================
  private getTrendDirection(): 'up' | 'down' | 'neutral' {
    const dir = this.getSlotAttr('Trend', 'direction');
    if (dir === 'up' || dir === 'down' || dir === 'neutral') return dir;
    return 'neutral';
  }

  private getAriaLabel(): string {
    const raw = this.getSlotContent('Label') || 'Metric';
    return raw.replace(/<[^>]*>/g, '').trim() || 'Metric';
  }
}
