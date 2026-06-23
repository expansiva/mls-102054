/// <mls fileReference="_102054_/l2/molecules/groupentermoney/ml-currency-input-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CURRENCY INPUT — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupEnterMoney
// Herda GroupEnterMoneyMlCurrencyInputMolecule (mls-102040): parsing BigInt,
// clamp min/max, formatação Intl, estado (rawValue). Sobrescreve só render().
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { GroupEnterMoneyMlCurrencyInputMolecule } from '/_102040_/l2/molecules/groupentermoney/ml-currency-input.js';

/// **collab_i18n_start**
const message_en = { loading: 'Loading...', placeholder: 'Enter amount', noValue: '—' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { loading: 'Carregando...', placeholder: 'Digite o valor', noValue: '—' },
};
/// **collab_i18n_end**

interface CurrencyInternals {
  rawValue: string;
  onFocus(e: FocusEvent): void;
  onInput(e: InputEvent): void;
  onBlur(): void;
  formatNumber(num: number | null): string;
  formatToRaw(num: number | null): string;
}

@customElement('groupentermoney--ml-currency-input-brutal')
export class CurrencyInputBrutal extends GroupEnterMoneyMlCurrencyInputMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `cur-brutal-${Math.random().toString(36).slice(2, 9)}`;

  private get x(): CurrencyInternals {
    return this as unknown as CurrencyInternals;
  }

  private brutalInputClasses(): string {
    return [
      'brutal-cur-input w-full px-3 py-2 text-sm',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private brutalContainerClasses(): string {
    return ['relative', this.loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  }

  private brutalLabel(): TemplateResult | typeof nothing {
    if (!this.hasSlot('Label')) return nothing;
    return html`<label id="${this.gUid}-label" class="brutal-cur-label block mb-1 text-sm">
      ${unsafeHTML(this.getSlotContent('Label'))}
    </label>`;
  }
  private brutalHelperOrError(): TemplateResult | typeof nothing {
    const describedId = `${this.gUid}-desc`;
    if (this.error) {
      return html`<p id="${describedId}" class="brutal-error-text mt-1 text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${describedId}" class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return nothing;
  }
  private brutalInput(): TemplateResult {
    const describedId = this.error || this.hasSlot('Helper') ? `${this.gUid}-desc` : undefined;
    const placeholder = this.placeholder || this.getSlotAttr('Label', 'placeholder') || this.gMsg.placeholder;
    return html`
      <input
        id="${this.gUid}-input"
        name="${this.name}"
        class="${this.brutalInputClasses()}"
        .value=${this.x.rawValue}
        ?disabled=${this.disabled || this.loading}
        ?readonly=${this.readonly}
        placeholder="${placeholder}"
        maxlength="20"
        aria-labelledby="${this.hasSlot('Label') ? `${this.gUid}-label` : undefined}"
        aria-describedby="${describedId}"
        aria-invalid="${this.error ? 'true' : 'false'}"
        aria-required="${this.required ? 'true' : 'false'}"
        @focus="${(e: FocusEvent) => this.x.onFocus(e)}"
        @input="${(e: InputEvent) => this.x.onInput(e)}"
        @blur="${() => this.x.onBlur()}"
      />
    `;
  }
  private brutalViewMode(): TemplateResult {
    const display = this.value === null ? this.gMsg.noValue : this.x.formatNumber(this.value);
    return html`<span class="brutal-cur-view block w-full text-sm">${unsafeHTML(display)}</span>`;
  }

  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    if (this.x.rawValue === '' && this.value !== null) {
      this.x.rawValue = this.x.formatToRaw(this.value);
    }
    return html`
      <div class="${this.brutalContainerClasses()}">
        ${this.brutalLabel()}
        ${this.isEditing ? this.brutalInput() : this.brutalViewMode()}
        ${this.brutalHelperOrError()}
        ${this.loading
          ? html`<div class="brutal-cur-loading absolute inset-0 flex items-center justify-center"><span class="text-sm">${this.gMsg.loading}</span></div>`
          : nothing}
      </div>
    `;
  }
}
