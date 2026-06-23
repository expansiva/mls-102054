/// <mls fileReference="_102054_/l2/molecules/groupenternumber/ml-number-stepper-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NUMBER STEPPER — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupEnterNumber
// Herda NumberStepperMolecule (mls-102040): parse/format, clamp, increment/decrement,
// estado (rawValue). Sobrescreve só render().
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { NumberStepperMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';

/// **collab_i18n_start**
const message_en = { increment: 'Increment', decrement: 'Decrement', loading: 'Loading...', required: 'Required', emptyValue: '—' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { increment: 'Incrementar', decrement: 'Decrementar', loading: 'Carregando...', required: 'Obrigatório', emptyValue: '—' },
};
/// **collab_i18n_end**

interface NumberStepperInternals {
  rawValue: string;
  handleInput(e: Event): void;
  handleBlur(): void;
  handleFocus(): void;
  increment(): void;
  decrement(): void;
  formatToDisplay(value: number | null): string;
}

@customElement('groupenternumber--ml-number-stepper-brutal')
export class NumberStepperBrutal extends NumberStepperMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `ns-brutal-${Math.random().toString(36).slice(2, 9)}`;
  private get gLabelId() { return `${this.gUid}-label`; }
  private get gHelperId() { return `${this.gUid}-helper`; }
  private get gErrorId() { return `${this.gUid}-error`; }
  private get gInputId() { return `${this.gUid}-input`; }

  private get x(): NumberStepperInternals {
    return this as unknown as NumberStepperInternals;
  }

  private brutalInputClasses(hasError: boolean): string {
    return [
      'brutal-ns-input w-full flex-1 px-3 py-2 text-sm outline-none',
      hasError ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private brutalButtonClasses(): string {
    return 'brutal-ns-btn h-9 w-9 inline-flex items-center justify-center text-sm';
  }
  private brutalContainerClasses(): string {
    return ['w-full', this.disabled || this.loading ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<label id="${this.gLabelId}" class="brutal-ns-label mb-1 block text-sm">${unsafeHTML(this.getSlotContent('Label'))}</label>`;
  }
  private brutalHelperOrError(effectiveError: string): TemplateResult {
    if (String(effectiveError).length > 0) {
      return html`<p id="${this.gErrorId}" class="brutal-error-text mt-1 text-xs">${unsafeHTML(String(effectiveError))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${this.gHelperId}" class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private brutalPrefix(): TemplateResult {
    if (!this.hasSlot('Prefix')) return html``;
    return html`<span class="brutal-ns-affix text-sm">${unsafeHTML(this.getSlotContent('Prefix'))}</span>`;
  }
  private brutalSuffix(): TemplateResult {
    if (!this.hasSlot('Suffix')) return html``;
    return html`<span class="brutal-ns-affix text-sm">${unsafeHTML(this.getSlotContent('Suffix'))}</span>`;
  }
  private brutalViewMode(): TemplateResult {
    const display = this.value === null || this.value === undefined ? this.gMsg.emptyValue : this.x.formatToDisplay(this.value);
    return html`
      <div class="${this.brutalContainerClasses()}">
        ${this.brutalLabel()}
        <div class="brutal-ns-view flex items-center gap-2 text-sm">
          ${this.brutalPrefix()}<span>${display}</span>${this.brutalSuffix()}
        </div>
      </div>
    `;
  }

  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) return this.brutalViewMode();

    const effectiveError =
      this.error || (this.required && (this.value === null || this.value === undefined) ? this.gMsg.required : '');
    const hasError = String(effectiveError).length > 0;
    const ariaDescribedBy = hasError ? this.gErrorId : this.hasSlot('Helper') ? this.gHelperId : undefined;
    const placeholder = this.placeholder || '';

    return html`
      <div class="${this.brutalContainerClasses()}">
        ${this.brutalLabel()}
        <div class="flex items-center gap-2">
          ${this.brutalPrefix()}
          <input
            id="${this.gInputId}"
            class="${this.brutalInputClasses(hasError)}"
            type="text"
            inputmode="${this.decimals > 0 ? 'decimal' : 'numeric'}"
            .value=${this.x.rawValue}
            placeholder="${this.value === null ? placeholder : ''}"
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readonly}
            aria-labelledby="${this.hasSlot('Label') ? this.gLabelId : nothing}"
            aria-describedby="${ariaDescribedBy || nothing}"
            aria-invalid="${hasError ? 'true' : 'false'}"
            aria-required="${this.required ? 'true' : 'false'}"
            @input=${(e: Event) => this.x.handleInput(e)}
            @blur=${() => this.x.handleBlur()}
            @focus=${() => this.x.handleFocus()}
          />
          ${this.brutalSuffix()}
          <button type="button" class="${this.brutalButtonClasses()}" aria-label="${this.gMsg.decrement}" ?disabled=${this.disabled || this.readonly || this.loading} @click=${() => this.x.decrement()}>−</button>
          <button type="button" class="${this.brutalButtonClasses()}" aria-label="${this.gMsg.increment}" ?disabled=${this.disabled || this.readonly || this.loading} @click=${() => this.x.increment()}>+</button>
        </div>
        ${this.loading ? html`<div class="brutal-ns-loading mt-2 text-xs">${this.gMsg.loading}</div>` : this.brutalHelperOrError(effectiveError)}
      </div>
    `;
  }
}
