/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-big-number-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC BIG NUMBER — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupViewMetric
// Herda MlMetricBigNumberMolecule (mls-102040): contrato/slots/loading intactos.
// Sobrescreve so render() + helpers presentacionais (brutal). Display-only.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlMetricBigNumberMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

@customElement('groupviewmetric--ml-metric-big-number-brutal')
export class MlMetricBigNumberBrutal extends MlMetricBigNumberMolecule {
  // ===========================================================================
  // RENDER (override) — contrato/slots/loading herdados
  // ===========================================================================
  render(): TemplateResult {
    if (this.loading) {
      return this.brutalLoadingSkeleton();
    }

    if (!this.hasSlot('Value')) {
      return html``;
    }

    const ariaLabel = this.brutalAriaLabel();

    return html`
      <div class="${this.brutalContainerClasses()}" role="figure" aria-label="${ariaLabel}">
        ${this.hasSlot('Icon') ? this.brutalIcon() : html``}
        ${this.hasSlot('Label') ? this.brutalLabel() : html``}
        ${this.brutalValue()}
        ${this.hasSlot('Trend') ? this.brutalTrend() : html``}
        ${this.hasSlot('Helper') ? this.brutalHelper() : html``}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER HELPERS (brutal) — nomes proprios p/ nao colidir com os private do pai
  // ===========================================================================
  private brutalIcon(): TemplateResult {
    const content = this.getSlotContent('Icon');
    return html`<div class="brutal-bn-icon flex items-center">${unsafeHTML(content)}</div>`;
  }

  private brutalLabel(): TemplateResult {
    const content = this.getSlotContent('Label');
    return html`<div class="brutal-bn-label text-sm font-bold">${unsafeHTML(content)}</div>`;
  }

  private brutalValue(): TemplateResult {
    const content = this.getSlotContent('Value');
    return html`<div class="brutal-bn-value text-4xl leading-tight font-black" aria-live="polite">${unsafeHTML(content)}</div>`;
  }

  private brutalTrend(): TemplateResult {
    const direction = this.brutalTrendDirection();
    const content = this.getSlotContent('Trend');
    return html`<div class="${this.brutalTrendClasses(direction)}" aria-label="Trend: ${direction}">${unsafeHTML(content)}</div>`;
  }

  private brutalHelper(): TemplateResult {
    const content = this.getSlotContent('Helper');
    return html`<div class="brutal-bn-helper text-xs">${unsafeHTML(content)}</div>`;
  }

  private brutalLoadingSkeleton(): TemplateResult {
    return html`
      <div class="${this.brutalContainerClasses()}" role="figure" aria-busy="true">
        <div class="brutal-bn-skel h-4 w-24"></div>
        <div class="brutal-bn-skel mt-2 h-10 w-40"></div>
        <div class="brutal-bn-skel mt-2 h-4 w-20"></div>
      </div>
    `;
  }

  // ===========================================================================
  // CLASS HELPERS (brutal)
  // ===========================================================================
  private brutalContainerClasses(): string {
    return 'brutal-bn flex flex-col gap-1 p-4';
  }

  private brutalTrendClasses(direction: 'up' | 'down' | 'neutral'): string {
    const dir = direction === 'up' ? 'is-up' : direction === 'down' ? 'is-down' : 'is-neutral';
    return `brutal-bn-trend ${dir} inline-flex items-center gap-1 text-sm font-bold`;
  }

  // ===========================================================================
  // UTILITIES (brutal)
  // ===========================================================================
  private brutalTrendDirection(): 'up' | 'down' | 'neutral' {
    const dir = this.getSlotAttr('Trend', 'direction');
    if (dir === 'up' || dir === 'down' || dir === 'neutral') return dir;
    return 'neutral';
  }

  private brutalAriaLabel(): string {
    const raw = this.getSlotContent('Label') || 'Metric';
    return raw.replace(/<[^>]*>/g, '').trim() || 'Metric';
  }
}
