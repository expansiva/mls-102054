/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-radio-group-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RADIO GROUP — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlRadioGroupMolecule (mls-102040): parsing, teclado, eventos e estado
// reativo (focusedValue). Sobrescreve so render() com markup/classes brutal.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlRadioGroupMolecule } from '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'No selection',
  noOptions: 'No options available',
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Nenhuma selecao',
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
interface ParsedGroup {
  label: string;
  items: ParsedItem[];
}

interface RadioGroupInternals {
  focusedValue: string | null;
  parseItems(): ParsedItem[];
  parseGroups(): ParsedGroup[];
  findItem(value: string | null): ParsedItem | undefined;
  handleSelect(item: ParsedItem): void;
  handleFocus(): void;
  handleBlur(): void;
}

@customElement('groupselectone--ml-radio-group-brutal')
export class MlRadioGroupBrutal extends MlRadioGroupMolecule {
  private bMsg: MessageType = messages.en;
  private bLabelId = `label-${Math.random().toString(36).slice(2, 9)}`;
  private bErrorId = `error-${Math.random().toString(36).slice(2, 9)}`;

  private get x(): RadioGroupInternals {
    return this as unknown as RadioGroupInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalContainerClasses(): string {
    return ['flex flex-col gap-2', this.disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private brutalOptionClasses(item: ParsedItem): string {
    const isSelected = this.value === item.value;
    const isFocused = this.x.focusedValue === item.value;
    const hasError = this.error !== '';
    return [
      'brutal-rg-option',
      'flex items-center gap-3 px-3 py-2',
      isSelected ? 'is-selected' : '',
      isFocused && !isSelected ? 'is-focused' : '',
      hasError && !isSelected ? 'is-error' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
  private brutalRadioClasses(item: ParsedItem): string {
    const isSelected = this.value === item.value;
    return [
      'brutal-rg-radio',
      'w-4 h-4 flex items-center justify-center flex-shrink-0',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
  private brutalTextClasses(item: ParsedItem): string {
    const isSelected = this.value === item.value;
    return [
      'brutal-rg-text',
      'text-sm',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id=${this.bLabelId} class="brutal-rg-label text-sm">
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="brutal-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }
  private brutalRadioIndicator(item: ParsedItem): TemplateResult {
    const isSelected = this.value === item.value;
    return html`<span class=${this.brutalRadioClasses(item)}>${isSelected ? html`<span class="brutal-rg-dot"></span>` : html``}</span>`;
  }
  private brutalOption(item: ParsedItem): TemplateResult {
    const isSelected = this.value === item.value;
    return html`
      <div
        role="radio"
        aria-checked=${isSelected ? 'true' : 'false'}
        aria-disabled=${item.disabled || this.disabled || this.readonly || this.loading ? 'true' : 'false'}
        tabindex=${item.disabled || this.disabled || this.readonly || this.loading ? '-1' : '0'}
        class=${this.brutalOptionClasses(item)}
        @click=${() => this.x.handleSelect(item)}
        @focus=${() => this.x.handleFocus()}
        @blur=${() => this.x.handleBlur()}
      >
        ${this.brutalRadioIndicator(item)}
        <span class=${this.brutalTextClasses(item)}>${unsafeHTML(item.label)}</span>
      </div>
    `;
  }
  private brutalGroup(group: ParsedGroup): TemplateResult {
    if (group.items.length === 0) return html``;
    return html`
      <div class="flex flex-col gap-1">
        <span class="brutal-rg-group-label text-xs font-bold uppercase tracking-wide px-1">${group.label}</span>
        <div class="flex flex-col gap-1">${group.items.map((item) => this.brutalOption(item))}</div>
      </div>
    `;
  }
  private brutalRadioOptions(): TemplateResult {
    const standaloneItems = this.x.parseItems();
    const groups = this.x.parseGroups();
    const hasItems = standaloneItems.length > 0 || groups.some((g) => g.items.length > 0);
    if (!hasItems) {
      const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.bMsg.noOptions;
      return html`<div class="brutal-rg-empty text-sm py-2">${unsafeHTML(emptyContent)}</div>`;
    }
    return html`
      <div
        role="radiogroup"
        aria-labelledby=${this.hasSlot('Label') ? this.bLabelId : ''}
        aria-required=${this.required ? 'true' : 'false'}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-describedby=${this.error ? this.bErrorId : ''}
        class="flex flex-col gap-2"
      >
        ${standaloneItems.map((item) => this.brutalOption(item))} ${groups.map((group) => this.brutalGroup(group))}
      </div>
    `;
  }
  private brutalLoading(): TemplateResult {
    return html`
      <div class="flex items-center gap-2 py-2">
        <span class="brutal-rg-spinner">&#9881;</span>
        <span class="brutal-rg-loading-text text-sm">${this.bMsg.loading}</span>
      </div>
    `;
  }
  private brutalFeedback(): TemplateResult {
    if (this.error) {
      return html`<p id=${this.bErrorId} class="brutal-error-text text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p class="brutal-helper text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private brutalViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayText = selectedItem ? selectedItem.label : this.placeholder || this.bMsg.placeholder;
    return html`
      <div class="flex flex-col gap-1">
        ${this.brutalLabel()}
        <span class="brutal-rg-view-value text-sm">${selectedItem ? unsafeHTML(displayText) : displayText}</span>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.bMsg = messages[lang];
    if (!this.isEditing) {
      return this.brutalViewMode();
    }
    return html`
      <div class=${this.brutalContainerClasses()}>
        ${this.brutalLabel()} ${this.loading ? this.brutalLoading() : this.brutalRadioOptions()} ${this.brutalFeedback()}
      </div>
    `;
  }
}
