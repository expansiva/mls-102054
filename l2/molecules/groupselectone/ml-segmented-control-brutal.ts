/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-segmented-control-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SEGMENTED CONTROL — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSelectOne
// Herda SegmentedControlMolecule (mls-102040): parsing, teclado, eventos e estado
// reativo (focusedIndex/parsedItems). Sobrescreve so render() com markup/classes
// brutal (track + segmentos com bordas grossas e sombras offset).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { SegmentedControlMolecule } from '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select an option',
  noOptions: 'No options available',
  loading: 'Loading...',
};

type MessageType = typeof message_en;

const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione uma opcao',
    noOptions: 'Nenhuma opcao disponivel',
    loading: 'Carregando...',
  },
};
/// **collab_i18n_end**

interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
}

interface SegmentedControlInternals {
  parsedItems: ParsedItem[];
  parseItems(): void;
  findItem(value: string | null): ParsedItem | undefined;
  handleSelect(item: ParsedItem): void;
  handleKeyDown(e: KeyboardEvent, index: number): void;
  handleFocus(): void;
  handleBlur(): void;
}

@customElement('groupselectone--ml-segmented-control-brutal')
export class SegmentedControlBrutal extends SegmentedControlMolecule {
  private bMsg: MessageType = messages.en;

  private get x(): SegmentedControlInternals {
    return this as unknown as SegmentedControlInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalContainerClasses(): string {
    return [
      'brutal-seg-track',
      'flex w-full p-1 gap-1',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalSegmentClasses(item: ParsedItem, isSelected: boolean): string {
    return [
      'brutal-seg',
      'px-4 py-2 text-sm font-bold',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
      this.readonly && !item.disabled ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalLabelClasses(): string {
    return 'brutal-seg-label block text-xs';
  }

  private brutalHelperClasses(): string {
    return 'brutal-helper mt-1.5 text-xs';
  }

  private brutalErrorClasses(): string {
    return 'brutal-error-text mt-1.5 text-xs';
  }

  private brutalViewModeClasses(): string {
    return 'brutal-seg-view-value text-sm';
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayText = selectedItem
      ? selectedItem.label
      : this.placeholder || this.getSlotContent('Trigger') || this.bMsg.placeholder;

    return html`<div class=${this.brutalViewModeClasses()}>${unsafeHTML(displayText)}</div>`;
  }

  private brutalEditMode(): TemplateResult {
    const labelId = `label-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `error-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!this.error;

    return html`
      <div class="flex flex-col w-full">
        <div class="min-h-[1rem]">${this.brutalLabel(labelId)}</div>
        ${this.loading ? this.brutalLoading() : this.brutalSegments(labelId, errorId, hasError)}
        ${this.brutalFeedback(errorId, hasError)}
      </div>
    `;
  }

  private brutalLabel(labelId: string): TemplateResult {
    if (!this.hasSlot('Label')) {
      return html``;
    }

    return html`
      <label id=${labelId} class=${this.brutalLabelClasses()}>
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="brutal-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private brutalLoading(): TemplateResult {
    return html`
      <div class=${this.brutalContainerClasses()}>
        <div class="brutal-seg-loading px-4 py-2 text-sm">${this.bMsg.loading}</div>
      </div>
    `;
  }

  private brutalSegments(labelId: string, errorId: string, hasError: boolean): TemplateResult {
    if (this.x.parsedItems.length === 0) {
      return this.brutalEmpty();
    }

    return html`
      <div
        role="listbox"
        aria-labelledby=${this.hasSlot('Label') ? labelId : ''}
        aria-required=${this.required}
        aria-invalid=${hasError}
        aria-describedby=${hasError ? errorId : ''}
        class=${this.brutalContainerClasses()}
        @focus=${() => this.x.handleFocus()}
        @blur=${() => this.x.handleBlur()}
      >
        ${this.x.parsedItems.map((item, index) => this.brutalSegment(item, index))}
      </div>
    `;
  }

  private brutalSegment(item: ParsedItem, index: number): TemplateResult {
    const isSelected = this.value === item.value;
    const tabIndex =
      this.disabled || this.loading || item.disabled ? -1 : isSelected || (this.value === null && index === 0) ? 0 : -1;

    return html`
      <button
        type="button"
        role="option"
        aria-selected=${isSelected}
        aria-disabled=${item.disabled}
        tabindex=${tabIndex}
        class=${this.brutalSegmentClasses(item, isSelected)}
        @click=${() => this.x.handleSelect(item)}
        @keydown=${(e: KeyboardEvent) => this.x.handleKeyDown(e, index)}
        ?disabled=${this.disabled || this.loading}
      >
        ${unsafeHTML(item.label)}
      </button>
    `;
  }

  private brutalEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.bMsg.noOptions;
    return html`<div class="brutal-seg-empty px-4 py-2 text-sm">${unsafeHTML(emptyContent)}</div>`;
  }

  private brutalFeedback(errorId: string, hasError: boolean): TemplateResult {
    if (hasError) {
      return html`<p id=${errorId} class=${this.brutalErrorClasses()}>${unsafeHTML(this.error)}</p>`;
    }

    if (this.hasSlot('Helper')) {
      return html`<p class=${this.brutalHelperClasses()}>${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }

    return html``;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.bMsg = messages[lang];

    this.x.parseItems();

    if (!this.isEditing) {
      return this.brutalViewMode();
    }

    return this.brutalEditMode();
  }
}
