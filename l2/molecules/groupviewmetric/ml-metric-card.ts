/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-card.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC CARD MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupViewMetric
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

@customElement('groupviewmetric--ml-metric-card')
export class MetricCardMolecule extends MoleculeAuraElement {
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
  // RENDER HELPERS (glass)
  // ===========================================================================
  private getBaseClasses(): string {
    return 'glass-mc w-full p-4';
  }

  private getLabelClasses(): string {
    return 'glass-mc-label text-sm font-medium';
  }

  private getValueClasses(): string {
    return 'glass-mc-value text-3xl font-semibold tracking-tight';
  }

  private getHelperClasses(): string {
    return 'glass-mc-helper text-xs';
  }

  private getTrendClasses(direction: string | null): string {
    const dir = direction === 'up' ? 'is-up' : direction === 'down' ? 'is-down' : 'is-neutral';
    return `glass-mc-trend ${dir} inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium`;
  }

  private getAriaLabelFromHtml(content: string): string {
    if (!content) return '';
    return content.replace(/<[^>]*>/g, '').trim();
  }

  private renderIcon(): TemplateResult {
    if (!this.hasSlot('Icon')) return html``;
    return html`
      <div class="glass-mc-icon flex items-center justify-center p-2">
        <span>${unsafeHTML(this.getSlotContent('Icon'))}</span>
      </div>
    `;
  }

  private renderLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="${this.getLabelClasses()}">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private renderValue(): TemplateResult {
    return html`<div class="${this.getValueClasses()}" aria-live="polite">${unsafeHTML(this.getSlotContent('Value'))}</div>`;
  }

  private renderTrend(): TemplateResult {
    if (!this.hasSlot('Trend')) return html``;
    const direction = this.getSlotAttr('Trend', 'direction');
    const aria = direction ? `Trend: ${direction}` : '';
    return html`<div class="${this.getTrendClasses(direction)}" aria-label=${aria}>${unsafeHTML(this.getSlotContent('Trend'))}</div>`;
  }

  private renderHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    return html`<div class="${this.getHelperClasses()}">${unsafeHTML(this.getSlotContent('Helper'))}</div>`;
  }

  private renderSkeleton(): TemplateResult {
    const block = 'glass-mc-skel';
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
  // RENDER
  // ===========================================================================
  render() {
    const labelContent = this.getSlotContent('Label');
    const ariaLabel = this.getAriaLabelFromHtml(labelContent);

    return html`
      <div class="${this.getBaseClasses()}" role="figure" aria-label=${ariaLabel}>
        ${this.loading
          ? this.renderSkeleton()
          : html`
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                  ${this.renderIcon()}
                  <div class="space-y-1">
                    ${this.renderLabel()}
                    ${this.renderValue()}
                  </div>
                </div>
                <div class="pt-1">${this.renderTrend()}</div>
              </div>
              <div class="mt-2">${this.renderHelper()}</div>
            `}
      </div>
    `;
  }
}
