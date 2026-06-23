/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-select-dropdown-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SELECT DROPDOWN — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlSelectDropdownMolecule (mls-102040): parsing, busca, teclado,
// outside-click, eventos e estado reativo (isOpen/searchQuery/focusedIndex).
// Sobrescreve so render() com markup/classes brutal.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlSelectDropdownMolecule } from '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select an option',
  noResults: 'No results found',
  loading: 'Loading...',
  searchPlaceholder: 'Search...',
  noSelection: '—',
};

type MessageType = typeof message_en;

const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione uma opcao',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando...',
    searchPlaceholder: 'Buscar...',
    noSelection: '—',
  },
};
/// **collab_i18n_end**

interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
  group?: string;
}

interface ParsedGroup {
  label: string;
  items: ParsedItem[];
}

interface SelectDropdownInternals {
  isOpen: boolean;
  searchQuery: string;
  focusedIndex: number;
  parseItems(): ParsedItem[];
  parseGroups(): ParsedGroup[];
  findItem(value: string | null): ParsedItem | undefined;
  getFilteredItems(): ParsedItem[];
  getSelectableItems(): ParsedItem[];
  handleTriggerClick(e: Event): void;
  handleSelect(item: ParsedItem): void;
  handleSearchInput(e: Event): void;
}

@customElement('groupselectone--ml-select-dropdown-brutal')
export class MlSelectDropdownBrutal extends MlSelectDropdownMolecule {
  protected portalClassName = 'brutal-sd-portal';
  private bMsg: MessageType = messages.en;

  private get x(): SelectDropdownInternals {
    return this as unknown as SelectDropdownInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalTriggerClasses(): string {
    return [
      'brutal-trigger',
      'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm',
      this.error !== '' ? 'is-error' : '',
      this.x.isOpen ? 'is-open' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalDropdownClasses(): string {
    return 'brutal-dropdown w-full max-h-60 overflow-auto';
  }

  private brutalItemClasses(item: ParsedItem, isSelected: boolean, isFocused: boolean): string {
    return [
      'brutal-item',
      'w-full px-3 py-2 text-sm text-left',
      isSelected ? 'is-selected' : '',
      isFocused ? 'is-focused' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalSearchClasses(): string {
    return 'brutal-search w-full px-3 py-2 text-sm';
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;

    const labelContent = this.getSlotContent('Label');
    const labelId = `label-${this.name || 'select'}`;

    return html`
      <label id="${labelId}" class="brutal-label block text-sm mb-1">
        ${unsafeHTML(labelContent)} ${this.required ? html`<span class="brutal-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private brutalTriggerContent(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);

    if (this.loading) {
      return html`
        <span class="brutal-placeholder flex items-center gap-2">
          <span class="brutal-loading-icon">&#9881;</span>
          ${this.bMsg.loading}
        </span>
      `;
    }

    if (selectedItem) {
      return html`<span class="truncate">${unsafeHTML(selectedItem.label)}</span>`;
    }

    if (this.hasSlot('Trigger')) {
      return html`<span class="brutal-placeholder truncate">${unsafeHTML(this.getSlotContent('Trigger'))}</span>`;
    }

    const placeholderText = this.placeholder || this.bMsg.placeholder;
    return html`<span class="brutal-placeholder truncate">${placeholderText}</span>`;
  }

  private brutalChevron(): TemplateResult {
    const rotateClass = this.x.isOpen ? 'rotate-180' : '';
    return html`
      <svg class="brutal-chevron w-4 h-4 ${rotateClass} flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    `;
  }

  private brutalTrigger(): TemplateResult {
    const hasError = this.error !== '';
    const labelId = this.hasSlot('Label') ? `label-${this.name || 'select'}` : undefined;
    const errorId = hasError ? `error-${this.name || 'select'}` : undefined;

    return html`
      <button
        type="button"
        role="combobox"
        aria-expanded="${this.x.isOpen}"
        aria-haspopup="listbox"
        aria-invalid="${hasError}"
        aria-required="${this.required}"
        aria-labelledby="${labelId || ''}"
        aria-describedby="${errorId || ''}"
        class="${this.brutalTriggerClasses()}"
        ?disabled="${this.disabled}"
        @click="${(e: Event) => this.x.handleTriggerClick(e)}"
      >
        ${this.brutalTriggerContent()} ${this.brutalChevron()}
      </button>
    `;
  }

  private brutalSearchInput(): TemplateResult {
    if (!this.searchable) return html``;

    return html`
      <div class="brutal-search-wrap sticky top-0">
        <input
          type="text"
          class="${this.brutalSearchClasses()}"
          placeholder="${this.bMsg.searchPlaceholder}"
          .value="${this.x.searchQuery}"
          @input="${(e: Event) => this.x.handleSearchInput(e)}"
          @click="${(e: Event) => e.stopPropagation()}"
        />
      </div>
    `;
  }

  private brutalItems(): TemplateResult {
    const filteredItems = this.x.getFilteredItems();
    const selectableItems = this.x.getSelectableItems();

    if (filteredItems.length === 0) {
      return this.brutalEmpty();
    }

    const groups = this.x.parseGroups();
    const standaloneItems = this.x.parseItems();

    const filteredStandalone = standaloneItems.filter((item) => {
      if (!this.searchable || !this.x.searchQuery.trim()) return true;
      return item.label.toLowerCase().includes(this.x.searchQuery.toLowerCase().trim());
    });

    const filteredGroups = groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!this.searchable || !this.x.searchQuery.trim()) return true;
          return item.label.toLowerCase().includes(this.x.searchQuery.toLowerCase().trim());
        }),
      }))
      .filter((group) => group.items.length > 0);

    return html`
      <div role="listbox" class="py-1">
        ${filteredStandalone.map((item) => {
          const isSelected = item.value === this.value;
          const selectableIndex = selectableItems.findIndex((si) => si.value === item.value);
          const isFocused = selectableIndex === this.x.focusedIndex;

          return html`
            <button
              type="button"
              role="option"
              aria-selected="${isSelected}"
              aria-disabled="${item.disabled}"
              class="${this.brutalItemClasses(item, isSelected, isFocused)}"
              @click="${() => this.x.handleSelect(item)}"
            >
              ${unsafeHTML(item.label)}
            </button>
          `;
        })}
        ${filteredGroups.map(
          (group) => html`
            <div class="pt-2 first:pt-0">
              <div class="brutal-group-label px-3 py-1 text-xs font-bold uppercase tracking-wider">${group.label}</div>
              ${group.items.map((item) => {
                const isSelected = item.value === this.value;
                const selectableIndex = selectableItems.findIndex((si) => si.value === item.value);
                const isFocused = selectableIndex === this.x.focusedIndex;

                return html`
                  <button
                    type="button"
                    role="option"
                    aria-selected="${isSelected}"
                    aria-disabled="${item.disabled}"
                    class="${this.brutalItemClasses(item, isSelected, isFocused)}"
                    @click="${() => this.x.handleSelect(item)}"
                  >
                    ${unsafeHTML(item.label)}
                  </button>
                `;
              })}
            </div>
          `
        )}
      </div>
    `;
  }

  private brutalEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.bMsg.noResults;
    return html`<div class="brutal-empty px-3 py-4 text-sm text-center">${unsafeHTML(emptyContent)}</div>`;
  }

  protected getPortalTemplate(): TemplateResult {
    return html`
      <div class="${this.brutalDropdownClasses()}">
        ${this.brutalSearchInput()} ${this.brutalItems()}
      </div>
    `;
  }

  private brutalHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    return html`<p class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
  }

  private brutalError(): TemplateResult {
    if (this.error === '') return html``;
    const errorId = `error-${this.name || 'select'}`;
    return html`<p id="${errorId}" class="brutal-error-text mt-1 text-xs">${this.error}</p>`;
  }

  private brutalFeedback(): TemplateResult {
    if (this.error !== '') {
      return this.brutalError();
    }
    return this.brutalHelper();
  }

  private brutalViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayValue = selectedItem ? selectedItem.label : this.bMsg.noSelection;

    return html`
      <div class="text-sm">
        ${this.hasSlot('Label')
          ? html`
              <span class="brutal-view-label">${unsafeHTML(this.getSlotContent('Label'))}:</span>
              <span class="brutal-view-value ml-1">${unsafeHTML(displayValue)}</span>
            `
          : html`<span class="brutal-view-value">${unsafeHTML(displayValue)}</span>`}
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
        ${this.brutalLabel()} ${this.brutalTrigger()} ${this.brutalFeedback()}
      </div>
    `;
  }
}
