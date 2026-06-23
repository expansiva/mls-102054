/// <mls fileReference="_102054_/l2/molecules/groupenternumber/ml-range-slider-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RANGE SLIDER — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupEnterNumber
// Herda RangeSliderMolecule (mls-102040): dual-range, clampPair, bounds, formatação,
// estado. Sobrescreve só render().
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { RangeSliderMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-range-slider.js';

/// **collab_i18n_start**
const message_en = { placeholder: 'Select a range', empty: '—', loading: 'Loading...', rangeSeparator: '–' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { placeholder: 'Selecione um intervalo', empty: '—', loading: 'Carregando...', rangeSeparator: '–' },
};
/// **collab_i18n_end**

interface RangeSliderInternals {
  handleLowInput(e: Event): void;
  handleHighInput(e: Event): void;
  handleLowChange(): void;
  handleHighChange(): void;
  handleFocus(): void;
  handleBlur(): void;
  getBounds(): { min: number; max: number };
  getValueDisplay(): { low: string; high: string };
  isIntervalUnset(): boolean;
}

@customElement('groupenternumber--ml-range-slider-brutal')
export class RangeSliderBrutal extends RangeSliderMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `rs-brutal-${Math.random().toString(36).slice(2, 8)}`;
  private get gLabelId() { return `${this.gUid}-label`; }
  private get gErrorId() { return `${this.gUid}-error`; }
  private get gHelperId() { return `${this.gUid}-helper`; }

  private get x(): RangeSliderInternals {
    return this as unknown as RangeSliderInternals;
  }

  private brutalInputClasses(): string {
    return [
      'brutal-range w-full',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<label id=${this.gLabelId} class="brutal-rs-label mb-1 text-sm">${unsafeHTML(this.getSlotContent('Label'))}</label>`;
  }
  private brutalPrefixSuffix(content: string): TemplateResult {
    const prefix = this.hasSlot('Prefix') ? unsafeHTML(this.getSlotContent('Prefix')) : null;
    const suffix = this.hasSlot('Suffix') ? unsafeHTML(this.getSlotContent('Suffix')) : null;
    return html`
      <span class="inline-flex items-center gap-1">
        ${prefix ? html`<span class="brutal-rs-affix">${prefix}</span>` : html``}
        <span class="brutal-rs-value">${content}</span>
        ${suffix ? html`<span class="brutal-rs-affix">${suffix}</span>` : html``}
      </span>
    `;
  }
  private brutalHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id=${this.gErrorId} class="brutal-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id=${this.gHelperId} class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private brutalLoading(): TemplateResult {
    if (!this.loading) return html``;
    return html`<div class="brutal-rs-loading mt-2 text-xs">${this.gMsg.loading}</div>`;
  }

  private brutalEditMode(): TemplateResult {
    const { min, max } = this.x.getBounds();
    const display = this.x.getValueDisplay();
    const ariaDescribedBy = this.error ? this.gErrorId : this.hasSlot('Helper') ? this.gHelperId : undefined;
    const ariaLabelledBy = this.hasSlot('Label') ? this.gLabelId : undefined;

    return html`
      <div class="flex flex-col">
        ${this.brutalLabel()}
        <div class="brutal-rs-row mb-2 flex items-center justify-between text-sm">
          ${this.brutalPrefixSuffix(display.low)}
          <span class="brutal-rs-sep">${this.gMsg.rangeSeparator}</span>
          ${this.brutalPrefixSuffix(display.high)}
        </div>
        <div class="grid gap-3">
          <input
            type="range"
            class=${this.brutalInputClasses()}
            min=${min} max=${max} step=${this.step}
            .value=${String(this.value ?? min)}
            aria-labelledby=${ariaLabelledBy || ''}
            aria-describedby=${ariaDescribedBy || ''}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-valuemin=${min} aria-valuemax=${max} aria-valuenow=${this.value ?? min}
            aria-readonly=${this.readonly ? 'true' : 'false'}
            ?disabled=${this.disabled || this.loading}
            @input=${(e: Event) => this.x.handleLowInput(e)}
            @change=${() => this.x.handleLowChange()}
            @focus=${() => this.x.handleFocus()}
            @blur=${() => this.x.handleBlur()}
          />
          <input
            type="range"
            class=${this.brutalInputClasses()}
            min=${min} max=${max} step=${this.step}
            .value=${String(this.valueHigh ?? max)}
            aria-labelledby=${ariaLabelledBy || ''}
            aria-describedby=${ariaDescribedBy || ''}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-valuemin=${min} aria-valuemax=${max} aria-valuenow=${this.valueHigh ?? max}
            aria-readonly=${this.readonly ? 'true' : 'false'}
            ?disabled=${this.disabled || this.loading}
            @input=${(e: Event) => this.x.handleHighInput(e)}
            @change=${() => this.x.handleHighChange()}
            @focus=${() => this.x.handleFocus()}
            @blur=${() => this.x.handleBlur()}
          />
        </div>
        ${this.brutalHelperOrError()} ${this.brutalLoading()}
      </div>
    `;
  }

  private brutalViewMode(): TemplateResult {
    const display = this.x.getValueDisplay();
    const content = this.x.isIntervalUnset() ? this.gMsg.empty : `${display.low} ${this.gMsg.rangeSeparator} ${display.high}`;
    return html`
      <div class="flex flex-col">${this.brutalLabel()}<div class="brutal-rs-view text-sm">${this.brutalPrefixSuffix(content)}</div></div>
    `;
  }

  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    if (!this.isEditing) return this.brutalViewMode();
    return this.brutalEditMode();
  }
}
