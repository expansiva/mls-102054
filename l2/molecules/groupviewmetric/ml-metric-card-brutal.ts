/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-card-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC CARD — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupViewMetric
// Herda MetricCardMolecule (mls-102040): contrato/slots/loading intactos.
// Sobrescreve so render() + helpers presentacionais (brutal). Display-only.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetricCardMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';

@customElement('groupviewmetric--ml-metric-card-brutal')
export class MetricCardBrutal extends MetricCardMolecule {
  // ---- helpers presentacionais (brutal) — nomes proprios p/ nao colidir com os private do pai ----
  private brutalBaseClasses(): string {
    return 'brutal-mc w-full p-4';
  }

  private brutalLabelClasses(): string {
    return 'brutal-mc-label text-sm font-bold';
  }

  private brutalValueClasses(): string {
    return 'brutal-mc-value text-3xl font-black tracking-tight';
  }

  private brutalHelperClasses(): string {
    return 'brutal-mc-helper text-xs';
  }

  private brutalTrendClasses(direction: string | null): string {
    const dir = direction === 'up' ? 'is-up' : direction === 'down' ? 'is-down' : 'is-neutral';
    return `brutal-mc-trend ${dir} inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold`;
  }

  private brutalAriaLabelFromHtml(content: string): string {
    if (!content) return '';
    return content.replace(/<[^>]*>/g, '').trim();
  }

  private brutalIcon(): TemplateResult {
    if (!this.hasSlot('Icon')) return html``;
    return html`
      <div class="brutal-mc-icon flex items-center justify-center p-2">
        <span>${unsafeHTML(this.getSlotContent('Icon'))}</span>
      </div>
    `;
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="${this.brutalLabelClasses()}">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private brutalValue(): TemplateResult {
    return html`<div class="${this.brutalValueClasses()}" aria-live="polite">${unsafeHTML(this.getSlotContent('Value'))}</div>`;
  }

  private brutalTrend(): TemplateResult {
    if (!this.hasSlot('Trend')) return html``;
    const direction = this.getSlotAttr('Trend', 'direction');
    const aria = direction ? `Trend: ${direction}` : '';
    return html`<div class="${this.brutalTrendClasses(direction)}" aria-label=${aria}>${unsafeHTML(this.getSlotContent('Trend'))}</div>`;
  }

  private brutalHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    return html`<div class="${this.brutalHelperClasses()}">${unsafeHTML(this.getSlotContent('Helper'))}</div>`;
  }

  private brutalSkeleton(): TemplateResult {
    const block = 'brutal-mc-skel';
    return html`
      <div class="flex items-start gap-3">
        <div class="h-10 w-10 ${block}"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 w-1/2 ${block}"></div>
          <div class="h-8 w-2/3 ${block}"></div>
          <div class="h-4 w-1/3 ${block}"></div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — contrato/slots/loading herdados
  // ===========================================================================
  render() {
    const labelContent = this.getSlotContent('Label');
    const ariaLabel = this.brutalAriaLabelFromHtml(labelContent);

    return html`
      <div class="${this.brutalBaseClasses()}" role="figure" aria-label=${ariaLabel}>
        ${this.loading
          ? this.brutalSkeleton()
          : html`
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                  ${this.brutalIcon()}
                  <div class="space-y-1">
                    ${this.brutalLabel()}
                    ${this.brutalValue()}
                  </div>
                </div>
                <div class="pt-1">${this.brutalTrend()}</div>
              </div>
              <div class="mt-2">${this.brutalHelper()}</div>
            `}
      </div>
    `;
  }
}
