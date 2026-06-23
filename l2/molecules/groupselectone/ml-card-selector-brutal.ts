/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-card-selector-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CARD SELECTOR — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlCardSelectorMolecule (mls-102040): parsing de Item/Group, busca,
// navegacao por teclado, abertura/fechamento de painel, outside-click e estado
// (isOpen/searchQuery/focusedIndex). Sobrescreve apenas render() + helpers
// presentacionais com classes brutal. This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlCardSelectorMolecule } from '/_102040_/l2/molecules/groupselectone/ml-card-selector.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select an option',
  noResults: 'No results found',
  loading: 'Loading...',
  searchPlaceholder: 'Search...',
  noValue: '—',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione uma opcao',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando...',
    searchPlaceholder: 'Buscar...',
    noValue: '—',
  },
};
/// **collab_i18n_end**

// =============================================================================
// TYPES (estruturais — espelham os tipos privados do pai)
// =============================================================================
interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
  content: string;
  group?: string;
}

interface ParsedGroup {
  label: string;
  items: ParsedItem[];
}

interface CardSelectorInternals {
  isOpen: boolean;
  searchQuery: string;
  focusedIndex: number;
  parseItems(): ParsedItem[];
  parseGroups(): ParsedGroup[];
  getFilteredItems(items: ParsedItem[]): ParsedItem[];
  getSelectableItems(): ParsedItem[];
  findItem(value: string | null): ParsedItem | undefined;
  handleTriggerClick(e: Event): void;
  handleSelect(value: string): void;
  handleSearchInput(e: Event): void;
}

@customElement('groupselectone--ml-card-selector-brutal')
export class MlCardSelectorBrutal extends MlCardSelectorMolecule {
  protected portalClassName = 'brutal-cs-portal';
  private bMsg: MessageType = messages.en;

  private get x(): CardSelectorInternals {
    return this as unknown as CardSelectorInternals;
  }

  // ===========================================================================
  // CSS CLASSES (brutal)
  // ===========================================================================
  private brutalTriggerClasses(): string {
    const hasError = this.error !== '';
    return [
      'brutal-cs-trigger w-full min-h-[44px] px-4 py-3 text-sm',
      'flex items-center justify-between gap-2',
      hasError ? 'is-error' : '',
      this.x.isOpen ? 'is-open' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalCardClasses(item: ParsedItem, isSelected: boolean, isFocused: boolean): string {
    return [
      'brutal-cs-card p-4',
      isSelected ? 'is-selected' : '',
      isFocused && !isSelected ? 'is-focused' : '',
      item.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalSearchInputClasses(): string {
    return 'brutal-cs-search w-full px-3 py-2 text-sm';
  }

  private brutalGroupLabelClasses(): string {
    return 'brutal-cs-group text-xs font-bold uppercase tracking-wider mb-2';
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelContent = this.getSlotContent('Label');
    const labelId = `label-${this.name || 'card-selector'}`;
    return html`
      <label id="${labelId}" class="brutal-cs-label block text-sm font-bold mb-1.5">
        ${unsafeHTML(labelContent)}
        ${this.required ? html`<span class="brutal-cs-req ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private brutalTrigger(): TemplateResult {
    const x = this.x;
    const selectedItem = x.findItem(this.value);
    const placeholderText = this.placeholder || this.getSlotContent('Trigger') || this.bMsg.placeholder;
    const hasError = this.error !== '';
    const labelId = `label-${this.name || 'card-selector'}`;
    const errorId = `error-${this.name || 'card-selector'}`;

    return html`
      <button
        type="button"
        role="combobox"
        aria-expanded="${x.isOpen}"
        aria-haspopup="listbox"
        aria-labelledby="${this.hasSlot('Label') ? labelId : ''}"
        aria-describedby="${hasError ? errorId : ''}"
        aria-invalid="${hasError}"
        aria-required="${this.required}"
        ?disabled="${this.disabled}"
        class="${this.brutalTriggerClasses()}"
        @click="${(e: Event) => x.handleTriggerClick(e)}"
      >
        <span class="brutal-cs-value flex-1 text-left ${!selectedItem ? 'is-placeholder' : ''}">
          ${this.loading
            ? html`<span class="flex items-center gap-2">
                <span class="brutal-cs-loading-icon">&#9881;</span>
                ${this.bMsg.loading}
              </span>`
            : selectedItem
              ? selectedItem.label
              : unsafeHTML(placeholderText)
          }
        </span>
        <svg
          class="brutal-cs-chevron w-5 h-5 ${x.isOpen ? 'rotate-180' : ''}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    `;
  }

  private brutalSearch(): TemplateResult {
    if (!this.searchable) return html``;
    const x = this.x;

    return html`
      <div class="brutal-cs-search-row p-3">
        <input
          type="text"
          class="${this.brutalSearchInputClasses()}"
          placeholder="${this.bMsg.searchPlaceholder}"
          .value="${x.searchQuery}"
          @input="${(e: Event) => x.handleSearchInput(e)}"
        />
      </div>
    `;
  }

  private brutalCard(item: ParsedItem): TemplateResult {
    const x = this.x;
    const isSelected = this.value === item.value;
    const selectableItems = x.getSelectableItems();
    const selectableIndex = selectableItems.findIndex(i => i.value === item.value);
    const isFocused = selectableIndex === x.focusedIndex;

    return html`
      <div
        role="option"
        aria-selected="${isSelected}"
        aria-disabled="${item.disabled}"
        class="${this.brutalCardClasses(item, isSelected, isFocused)}"
        @click="${() => !item.disabled && x.handleSelect(item.value)}"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1">
            ${unsafeHTML(item.content)}
          </div>
          ${isSelected ? html`
            <div class="flex-shrink-0">
              <svg class="brutal-cs-check w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
          ` : html``}
        </div>
      </div>
    `;
  }

  private brutalCardGrid(): TemplateResult {
    const x = this.x;
    const standaloneItems = x.getFilteredItems(x.parseItems());
    const groups = x.parseGroups();
    const hasItems = standaloneItems.length > 0 || groups.some(g => x.getFilteredItems(g.items).length > 0);

    if (!hasItems) {
      return this.brutalEmpty();
    }

    return html`
      <div class="p-4">
        ${groups.map(group => {
          const filteredGroupItems = x.getFilteredItems(group.items);
          if (filteredGroupItems.length === 0) return html``;
          return html`
            <div class="mb-4 last:mb-0">
              <div class="${this.brutalGroupLabelClasses()}">${group.label}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${filteredGroupItems.map(item => this.brutalCard(item))}
              </div>
            </div>
          `;
        })}
        ${standaloneItems.length > 0 ? html`
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${standaloneItems.map(item => this.brutalCard(item))}
          </div>
        ` : html``}
      </div>
    `;
  }

  private brutalEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty')
      ? this.getSlotContent('Empty')
      : this.bMsg.noResults;

    return html`
      <div class="brutal-cs-empty p-8 text-center">
        ${unsafeHTML(emptyContent)}
      </div>
    `;
  }

  protected getPortalTemplate(): TemplateResult {
    return html`
      <div role="listbox" class="brutal-cs-panel w-full max-h-[400px] overflow-auto">
        ${this.brutalSearch()}
        ${this.brutalCardGrid()}
      </div>
    `;
  }

  private brutalHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    const helperContent = this.getSlotContent('Helper');
    return html`<p class="brutal-helper mt-1.5 text-xs">${unsafeHTML(helperContent)}</p>`;
  }

  private brutalError(): TemplateResult {
    if (!this.error) return html``;
    const errorId = `error-${this.name || 'card-selector'}`;
    return html`<p id="${errorId}" class="brutal-error-text mt-1.5 text-xs">${unsafeHTML(this.error)}</p>`;
  }

  private brutalFeedback(): TemplateResult {
    if (this.error) {
      return this.brutalError();
    }
    return this.brutalHelper();
  }

  private brutalViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayValue = selectedItem
      ? selectedItem.label
      : (this.placeholder || this.bMsg.noValue);

    return html`
      <div class="brutal-cs-view text-sm">
        ${this.hasSlot('Label') ? html`
          <span class="brutal-cs-view-label">
            ${unsafeHTML(this.getSlotContent('Label'))}:
          </span>
          <span class="ml-1">${displayValue}</span>
        ` : html`
          <span>${displayValue}</span>
        `}
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
      <div class="relative w-full">
        ${this.brutalLabel()}
        ${this.brutalTrigger()}
        ${this.brutalFeedback()}
      </div>
    `;
  }
}
