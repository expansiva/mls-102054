/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-combobox-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML COMBOBOX — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlComboboxMolecule (mls-102040): parsing de Item/Group, filtro, navegacao
// por teclado, free-text, clear, outside-click e estado (inputText/isOpen/
// activeIndex). Sobrescreve apenas render() + helpers presentacionais com classes
// brutal. This molecule does NOT contain business logic.
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from 'lit/decorators.js';
import { MlComboboxMolecule } from '/_102040_/l2/molecules/groupselectone/ml-combobox.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Search or select...',
  empty: 'No options found',
  loading: 'Loading...',
  clear: 'Clear value',
  useValue: 'Use',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Pesquisar ou selecionar...',
    empty: 'Nenhuma opcao encontrada',
    loading: 'Carregando...',
    clear: 'Limpar valor',
    useValue: 'Usar',
  },
};
/// **collab_i18n_end**

// =============================================================================
// TYPES (estruturais — espelham os tipos privados do pai)
// =============================================================================
interface ComboItem {
  value: string;
  label: string;
  labelText: string;
  disabled: boolean;
}

interface ComboGroup {
  label: string;
  items: ComboItem[];
}

interface ComboboxInternals {
  inputText: string;
  isOpen: boolean;
  activeIndex: number;
  uid: string;
  parseItems(): { standalone: ComboItem[]; groups: ComboGroup[] };
  getAllItems(): ComboItem[];
  filterItems(items: ComboItem[], query: string): ComboItem[];
  getFlatVisible(filteredStandalone: ComboItem[], filteredGroups: ComboGroup[]): ComboItem[];
  handleInputFocus(): void;
  handleInputInput(event: Event): void;
  handleInputBlur(): void;
  handleKeyDown(event: KeyboardEvent): void;
  selectItem(item: ComboItem): void;
  commitFreeText(): void;
  handleClear(event: MouseEvent): void;
}

@customElement('groupselectone--ml-combobox-brutal')
export class MlComboboxBrutal extends MlComboboxMolecule {
  protected portalClassName = 'brutal-cb-portal';
  private bMsg: MessageType = messages.en;

  private get x(): ComboboxInternals {
    return this as unknown as ComboboxInternals;
  }

  // ===========================================================================
  // CLASS HELPERS (brutal)
  // ===========================================================================
  private brutalInputClasses(hasError: boolean): string {
    return [
      'brutal-combo-input w-full px-3 py-2 text-sm',
      hasError ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalOptionClasses(item: ComboItem, flatIndex: number): string {
    const isSelected = item.value === this.value;
    const isActive = flatIndex === this.x.activeIndex;
    return [
      'brutal-combo-option flex w-full items-center gap-2 px-3 py-2 text-sm select-none',
      isSelected ? 'is-selected' : '',
      isActive ? 'is-active' : '',
      item.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalCheckmark(item: ComboItem): TemplateResult {
    if (item.value !== this.value) return html``;
    return html`
      <svg class="brutal-combo-check ml-auto h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/>
      </svg>
    `;
  }

  private brutalOption(item: ComboItem, flatIndex: number, indent = false): TemplateResult {
    const x = this.x;
    return html`
      <li
        id="${x.uid}-opt-${flatIndex}"
        role="option"
        aria-selected=${item.value === this.value ? 'true' : 'false'}
        aria-disabled=${item.disabled ? 'true' : 'false'}
        class=${this.brutalOptionClasses(item, flatIndex)}
        @mousedown=${(e: MouseEvent) => { e.preventDefault(); x.selectItem(item); }}
      >
        <span class="flex-1 truncate ${indent ? 'pl-2' : ''}">${unsafeHTML(item.label)}</span>
        ${this.brutalCheckmark(item)}
      </li>
    `;
  }

  protected getPortalTemplate(): TemplateResult {
    const x = this.x;
    const { standalone, groups } = x.parseItems();
    const q = x.inputText;
    const filteredStandalone = x.filterItems(standalone, q);
    const filteredGroups = groups
      .map(g => ({ ...g, items: x.filterItems(g.items, q) }))
      .filter(g => g.items.length > 0);
    const flatItems = x.getFlatVisible(filteredStandalone, filteredGroups);
    const listId = `${x.uid}-list`;
    const total = filteredStandalone.length + filteredGroups.reduce((n, g) => n + g.items.length, 0);

    return html`
      <ul
        id=${listId}
        role="listbox"
        class="brutal-combo-panel mt-1 max-h-60 w-full overflow-auto py-1 focus:outline-none"
      >
        ${this.loading ? html`
          <li class="brutal-combo-empty px-3 py-2 text-sm">${this.bMsg.loading}</li>
        ` : total === 0 ? html`
          <li class="brutal-combo-empty px-3 py-2 text-sm">
            ${this.hasSlot('Empty') ? unsafeHTML(this.getSlotContent('Empty')) : this.bMsg.empty}
          </li>
        ` : html`
          ${filteredStandalone.map(item => this.brutalOption(item, flatItems.indexOf(item)))}
          ${filteredGroups.map(group => html`
            ${group.label ? html`
              <li role="presentation" class="brutal-combo-group px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wider select-none">
                ${group.label}
              </li>
            ` : nothing}
            ${group.items.map(item => this.brutalOption(item, flatItems.indexOf(item), !!group.label))}
          `)}
        `}

        ${this.freeText && x.inputText.trim() && !flatItems.find(i => i.labelText.toLowerCase() === x.inputText.trim().toLowerCase()) ? html`
          <li
            class="brutal-combo-option flex items-center gap-2 px-3 py-2 text-sm select-none"
            @mousedown=${(e: MouseEvent) => { e.preventDefault(); x.commitFreeText(); }}
          >
            <svg class="brutal-combo-add h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            <span>${this.bMsg.useValue} "<strong>${x.inputText.trim()}</strong>"</span>
          </li>
        ` : nothing}
      </ul>
    `;
  }

  private brutalLoading(): TemplateResult {
    return html`<div class="brutal-combo-skeleton h-9 w-full"></div>`;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.bMsg = messages[lang];
    const x = this.x;

    const inputId = `${x.uid}-input`;
    const listId  = `${x.uid}-list`;
    const labelId = `${x.uid}-label`;
    const errorId = `${x.uid}-error`;

    const hasError  = (!!this.error && this.error.length > 0) || (this.required && !this.value);
    const showClear = this.clearable && !this.disabled && !this.readonly && !this.loading
      && (!!this.value || !!x.inputText);

    // View-only mode
    if (!this.isEditing) {
      const found = x.getAllItems().find(i => i.value === this.value);
      return html`
        <div class="w-full">
          ${this.hasSlot('Label')
            ? html`<div id=${labelId} class="brutal-combo-label-view mb-1 text-sm">${unsafeHTML(this.getSlotContent('Label'))}</div>`
            : nothing}
          <div class="brutal-combo-view text-sm ${this.value ? 'has-value' : ''}">
            ${this.value
              ? (found ? unsafeHTML(found.label) : this.value)
              : (this.placeholder || this.bMsg.placeholder)}
          </div>
          ${this.name ? html`<input type="hidden" name=${this.name} value=${this.value ?? ''} />` : nothing}
        </div>
      `;
    }

    const inputPaddingRight = showClear ? '4rem' : '2.5rem';

    return html`
      <div class="w-full">

        ${this.hasSlot('Label')
          ? html`<label for=${inputId} id=${labelId} class="brutal-combo-label mb-1.5 block text-sm font-bold">${unsafeHTML(this.getSlotContent('Label'))}</label>`
          : nothing}

        <div class="relative">

          ${this.loading && !x.isOpen ? this.brutalLoading() : html`
            <input
              id=${inputId}
              type="text"
              role="combobox"
              autocomplete="off"
              spellcheck="false"
              aria-expanded=${x.isOpen ? 'true' : 'false'}
              aria-autocomplete="list"
              aria-controls=${listId}
              aria-activedescendant=${ifDefined(x.activeIndex >= 0 ? `${x.uid}-opt-${x.activeIndex}` : undefined)}
              aria-labelledby=${ifDefined(this.hasSlot('Label') ? labelId : undefined)}
              aria-describedby=${ifDefined(hasError ? errorId : undefined)}
              aria-invalid=${hasError ? 'true' : 'false'}
              aria-required=${this.required ? 'true' : 'false'}
              ?disabled=${this.disabled || this.loading}
              ?readonly=${this.readonly}
              placeholder=${this.placeholder || this.bMsg.placeholder}
              .value=${x.inputText}
              class=${this.brutalInputClasses(hasError)}
              style="padding-right:${inputPaddingRight}"
              @focus=${() => x.handleInputFocus()}
              @input=${(e: Event) => x.handleInputInput(e)}
              @blur=${() => x.handleInputBlur()}
              @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e)}
            />

            <!-- Trailing icons -->
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 gap-1">

              ${showClear ? html`
                <button
                  type="button"
                  aria-label=${this.bMsg.clear}
                  class="brutal-combo-clear pointer-events-auto flex h-5 w-5 items-center justify-center"
                  @click=${(e: MouseEvent) => x.handleClear(e)}
                >
                  <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                  </svg>
                </button>
              ` : nothing}

              <span class="brutal-combo-chevron flex h-4 w-4 items-center justify-center">
                <svg class="h-4 w-4 ${x.isOpen ? 'rotate-180' : ''}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </span>
            </div>
          `}
        </div>

        ${this.name ? html`<input type="hidden" name=${this.name} value=${this.value ?? ''} />` : nothing}

        ${hasError && this.error
          ? html`<p id=${errorId} class="brutal-error-text mt-1.5 text-xs">${unsafeHTML(String(this.error))}</p>`
          : !hasError && this.hasSlot('Helper')
            ? html`<p class="brutal-helper mt-1.5 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`
            : nothing}
      </div>
    `;
  }
}
