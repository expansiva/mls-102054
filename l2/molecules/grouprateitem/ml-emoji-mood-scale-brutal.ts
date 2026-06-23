/// <mls fileReference="_102054_/l2/molecules/grouprateitem/ml-emoji-mood-scale-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// EMOJI MOOD SCALE — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupRateItem
// Herda toda a lógica de EmojiMoodScaleMolecule (mls-102040) e sobrescreve apenas
// o render() com o template brutal. Aparência no .less escopado na tag -brutal.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { EmojiMoodScaleMolecule } from '/_102040_/l2/molecules/grouprateitem/ml-emoji-mood-scale.js';

/// **collab_i18n_start**
const message_en = {
  empty: '—',
  required: 'Required',
};

type MessageType = typeof message_en;

const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

type RatingItem = {
  value: number;
  label: string;
};

interface EmojiMoodScaleInternals {
  uid: string;
  hoverValue: number | null;
  focusedIndex: number;
  handleOptionClick(value: number): void;
  handleOptionFocus(index: number): void;
  handleOptionBlur(): void;
  handleMouseEnter(value: number): void;
  handleMouseLeave(): void;
  handleKeydown(e: KeyboardEvent, items: RatingItem[]): void;
  getItems(): RatingItem[];
  getActiveValue(): number | null;
  getHasError(): boolean;
  getErrorMessage(): string;
}

@customElement('grouprateitem--ml-emoji-mood-scale-brutal')
export class EmojiMoodScaleBrutal extends EmojiMoodScaleMolecule {
  private gMsg: MessageType = messages.en;

  private get internals(): EmojiMoodScaleInternals {
    return this as unknown as EmojiMoodScaleInternals;
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div id="${this.internals.uid}-label" class="brutal-em-label mb-2 text-sm font-bold">
      ${unsafeHTML(this.getSlotContent('Label'))}
    </div>`;
  }

  private brutalHelperOrError(): TemplateResult {
    const errorMessage = this.internals.getErrorMessage();
    if (errorMessage) {
      return html`<div id="${this.internals.uid}-error" class="brutal-error-text mt-2 text-xs">${unsafeHTML(errorMessage)}</div>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<div id="${this.internals.uid}-helper" class="brutal-helper mt-2 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</div>`;
    }
    return html``;
  }

  private brutalContainerClasses(): string {
    return [
      'brutal-em-box w-full p-3',
      this.internals.getHasError() ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalOptionClasses(isActive: boolean, isSelected: boolean): string {
    return [
      'brutal-em-option flex items-center justify-center px-3 py-2 text-xl',
      isActive || isSelected ? 'is-active' : '',
      this.disabled || this.readonly ? 'is-static' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalOption(item: RatingItem, index: number, activeValue: number | null): TemplateResult {
    const self = this.internals;
    const isSelected = this.value === item.value;
    const isActive = activeValue === item.value;
    const ariaChecked = isSelected ? 'true' : 'false';
    const label = `Rating ${item.value}`;
    const tabIndex = !this.disabled && !this.readonly && (isSelected || (this.value === null && index === 0)) ? 0 : -1;

    return html`
      <div
        class="${this.brutalOptionClasses(isActive, isSelected)}"
        role="radio"
        aria-checked="${ariaChecked}"
        aria-label="${label}"
        tabindex="${tabIndex}"
        data-index="${index}"
        @focus="${() => self.handleOptionFocus(index)}"
        @blur="${() => self.handleOptionBlur()}"
        @mouseenter="${() => self.handleMouseEnter(item.value)}"
        @mouseleave="${() => self.handleMouseLeave()}"
        @click="${() => self.handleOptionClick(item.value)}"
      >
        ${unsafeHTML(item.label)}
      </div>
    `;
  }

  private brutalViewMode(items: RatingItem[]): TemplateResult {
    const selected = items.find((i) => i.value === this.value);
    return html`
      <div class="flex items-center gap-3">
        ${selected
          ? html`<div class="brutal-em-view px-3 py-2 text-xl">${unsafeHTML(selected.label)}</div>`
          : html`<div class="brutal-em-empty">${this.gMsg.empty}</div>`}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    const self = this.internals;
    const items = self.getItems();

    if (!this.isEditing) {
      return html`
        <div class="w-full">
          ${this.brutalLabel()}
          ${this.brutalViewMode(items)}
        </div>
      `;
    }

    const activeValue = self.getActiveValue();
    const hasError = self.getHasError();
    const describedBy = hasError ? `${self.uid}-error` : this.hasSlot('Helper') ? `${self.uid}-helper` : '';

    return html`
      <div
        class="${this.brutalContainerClasses()}"
        role="radiogroup"
        aria-labelledby="${this.hasSlot('Label') ? `${self.uid}-label` : ''}"
        aria-describedby="${describedBy}"
        aria-invalid="${hasError ? 'true' : 'false'}"
        aria-required="${this.required ? 'true' : 'false'}"
        @keydown="${(e: KeyboardEvent) => self.handleKeydown(e, items)}"
        @mouseleave="${() => self.handleMouseLeave()}"
      >
        ${this.brutalLabel()}
        <div class="flex items-center gap-2">
          ${items.map((item, index) => this.brutalOption(item, index, activeValue))}
        </div>
        ${this.brutalHelperOrError()}
      </div>
    `;
  }
}
