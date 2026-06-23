/// <mls fileReference="_102054_/l2/molecules/groupselectmany/ml-popover-multi-select-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML POPOVER MULTI SELECT — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSelectMany
// Herda MlPopoverMultiSelectMolecule (mls-102040): selecao multipla, parsing de
// slots, busca, navegacao por teclado (activeIndex), min/max, outside-click e
// estado reativo (isOpen/searchQuery/activeIndex). Sobrescreve apenas render() +
// helpers de template com classes brutal. i18n proprio.
// Mantem data-ml-item + data-index para o focusActiveItem do pai.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlPopoverMultiSelectMolecule } from '/_102040_/l2/molecules/groupselectmany/ml-popover-multi-select.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select options',
  noResults: 'No results found',
  loading: 'Loading...',
  search: 'Search',
  selected: 'selected',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione opcoes',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando...',
    search: 'Buscar',
    selected: 'selecionado',
  },
};
/// **collab_i18n_end**

type ItemData = {
  value: string;
  labelHtml: string;
  labelText: string;
  disabled: boolean;
  groupLabel?: string;
};
type GroupData = {
  label: string;
  items: ItemData[];
};

interface PopoverMultiSelectInternals {
  isOpen: boolean;
  searchQuery: string;
  activeIndex: number;
  handleTriggerFocus(): void;
  handleTriggerBlur(): void;
  handleTriggerClick(): void;
  handleSearchInput(e: Event): void;
  handlePanelKeyDown(e: KeyboardEvent): void;
  handleItemClick(item: ItemData, isItemDisabled: boolean): void;
  openPanel(): void;
  collectSlotData(): { groups: GroupData[]; items: ItemData[]; allItems: ItemData[] };
  filterData(
    data: { groups: GroupData[]; items: ItemData[] },
    query: string
  ): { groups: GroupData[]; items: ItemData[] };
  getSelectionState(): {
    selectedValues: string[];
    selectedSet: Set<string>;
    selectedCount: number;
    selectionFull: boolean;
  };
  getValidationError(selectedCount: number): string;
  getItemDisabled(item: ItemData, selectionFull: boolean, selectedSet: Set<string>): boolean;
  getSelectedLabelMap(items: ItemData[]): Map<string, string>;
}

@customElement('groupselectmany--ml-popover-multi-select-brutal')
export class MlPopoverMultiSelectBrutal extends MlPopoverMultiSelectMolecule {
  protected portalClassName = 'brutal-pms-portal';
  private bMsg: MessageType = messages.en;
  private bUid = `brutal-pms-${Math.random().toString(36).slice(2)}`;
  private bLabelId = `${this.bUid}-label`;
  private bErrorId = `${this.bUid}-error`;
  private bPanelId = `${this.bUid}-panel`;

  private get x(): PopoverMultiSelectInternals {
    return this as unknown as PopoverMultiSelectInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalTriggerClasses(hasError: boolean): string {
    return [
      'brutal-pms-trigger w-full min-h-[40px] px-3 py-2 text-sm flex items-center justify-between gap-2',
      hasError ? 'is-error' : '',
      this.disabled || this.readonly || this.loading ? 'is-disabled' : '',
      this.x.isOpen ? 'is-open' : '',
    ].filter(Boolean).join(' ');
  }
  private brutalItemClasses(isSelected: boolean, isDisabled: boolean): string {
    return [
      'brutal-pms-item w-full px-3 py-2 text-sm flex items-center justify-between',
      isSelected ? 'is-selected' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult | typeof nothing {
    if (!this.hasSlot('Label')) return nothing;
    return html`<label id="${this.bLabelId}" class="brutal-pms-label text-sm">${unsafeHTML(this.getSlotContent('Label'))}</label>`;
  }
  private brutalHelper(hasError: boolean): TemplateResult | typeof nothing {
    if (hasError || !this.hasSlot('Helper')) return nothing;
    return html`<p class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
  }
  private brutalError(hasError: boolean): TemplateResult | typeof nothing {
    if (!hasError) return nothing;
    const message = this.error || '';
    return html`<p id="${this.bErrorId}" class="brutal-error-text mt-1 text-xs">${unsafeHTML(message)}</p>`;
  }
  private brutalSelectedTag(label: string, isHtml: boolean): TemplateResult {
    return html`
      <span class="brutal-pms-tag px-2 py-0.5 text-xs">
        ${isHtml ? unsafeHTML(label) : label}
      </span>
    `;
  }
  private brutalTriggerContent(selectedLabels: { label: string; isHtml: boolean }[], selectedCount: number): TemplateResult {
    if (this.loading) {
      return html`<span class="brutal-pms-muted">${this.bMsg.loading}</span>`;
    }
    if (this.hasSlot('Trigger')) {
      return html`${unsafeHTML(this.getSlotContent('Trigger'))}`;
    }
    if (selectedCount === 0) {
      const placeholder = this.placeholder || this.bMsg.placeholder;
      return html`<span class="brutal-pms-placeholder">${placeholder}</span>`;
    }
    const visible = selectedLabels.slice(0, 2);
    const extraCount = selectedCount - visible.length;
    return html`
      <div class="flex flex-wrap items-center gap-1">
        ${visible.map((item) => this.brutalSelectedTag(item.label, item.isHtml))}
        ${extraCount > 0
          ? html`<span class="brutal-pms-muted text-xs">+${extraCount}</span>`
          : nothing}
      </div>
    `;
  }
  private brutalEmpty(): TemplateResult {
    const content = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.bMsg.noResults;
    return html`<div class="brutal-pms-empty px-3 py-2 text-sm">${unsafeHTML(content)}</div>`;
  }
  private brutalOptionButton(item: ItemData, isSelected: boolean, isDisabled: boolean, itemIndex: number): TemplateResult {
    const x = this.x;
    return html`
      <button
        type="button"
        role="option"
        aria-selected="${isSelected}"
        aria-disabled="${isDisabled}"
        class="${this.brutalItemClasses(isSelected, isDisabled)}"
        ?disabled=${isDisabled}
        @mouseenter=${() => { x.activeIndex = itemIndex; }}
        @click=${() => x.handleItemClick(item, isDisabled)}
        @keydown=${(e: KeyboardEvent) => x.handlePanelKeyDown(e)}
        data-ml-item
        data-index="${itemIndex}"
      >
        <span>${unsafeHTML(item.labelHtml || item.labelText)}</span>
        ${isSelected
          ? html`<span class="brutal-pms-check text-xs">&#x2713;</span>`
          : nothing}
      </button>
    `;
  }
  private brutalGroup(group: GroupData, selectedSet: Set<string>, selectionFull: boolean, baseIndex: number): TemplateResult {
    const x = this.x;
    let runningIndex = baseIndex;
    return html`
      <div class="mb-2">
        ${group.label
          ? html`<div class="brutal-pms-group px-3 py-1 text-xs">${group.label}</div>`
          : nothing}
        <div class="flex flex-col gap-1">
          ${group.items.map((item) => {
            const isSelected = selectedSet.has(item.value);
            const isDisabled = x.getItemDisabled(item, selectionFull, selectedSet);
            const itemIndex = runningIndex++;
            return this.brutalOptionButton(item, isSelected, isDisabled, itemIndex);
          })}
        </div>
      </div>
    `;
  }
  private brutalItems(groups: GroupData[], items: ItemData[], selectedSet: Set<string>, selectionFull: boolean): TemplateResult {
    const x = this.x;
    let indexCounter = 0;
    return html`
      ${groups.map((group) => {
        const template = this.brutalGroup(group, selectedSet, selectionFull, indexCounter);
        indexCounter += group.items.length;
        return template;
      })}
      ${items.length
        ? html`<div class="flex flex-col gap-1">
            ${items.map((item) => {
              const isSelected = selectedSet.has(item.value);
              const isDisabled = x.getItemDisabled(item, selectionFull, selectedSet);
              const itemIndex = indexCounter++;
              return this.brutalOptionButton(item, isSelected, isDisabled, itemIndex);
            })}
          </div>`
        : nothing}
    `;
  }
  protected getPortalTemplate(): TemplateResult {
    const x = this.x;
    const slotData = x.collectSlotData();
    const filtered = x.filterData(slotData, x.searchQuery);
    const { selectedSet, selectionFull } = x.getSelectionState();
    const showEmpty = filtered.groups.length === 0 && filtered.items.length === 0;
    return html`
      <div
        class="brutal-pms-panel w-full"
        role="listbox"
        aria-multiselectable="true"
        @keydown=${(e: KeyboardEvent) => x.handlePanelKeyDown(e)}
      >
        ${this.searchable
          ? html`
            <div class="brutal-pms-search-row p-2">
              <input
                class="brutal-pms-search w-full px-3 py-2 text-sm"
                .placeholder=${this.bMsg.search}
                value=${x.searchQuery}
                @input=${(e: Event) => x.handleSearchInput(e)}
                data-ml-search
              />
            </div>`
          : nothing}
        <div class="max-h-64 overflow-auto p-2">
          ${showEmpty ? this.brutalEmpty() : this.brutalItems(filtered.groups, filtered.items, selectedSet, selectionFull)}
        </div>
      </div>
    `;
  }

  private brutalViewMode(selectedLabels: { label: string; isHtml: boolean }[]): TemplateResult {
    const hasSelection = selectedLabels.length > 0;
    const placeholder = this.placeholder || this.bMsg.placeholder;
    return html`
      <div class="flex flex-col gap-1">
        ${this.brutalLabel()}
        <div class="brutal-pms-view min-h-[40px] px-3 py-2 text-sm">
          ${hasSelection
            ? html`<div class="flex flex-wrap gap-1">
                ${selectedLabels.map((item) => this.brutalSelectedTag(item.label, item.isHtml))}
              </div>`
            : html`<span class="brutal-pms-placeholder">${placeholder}</span>`}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.bMsg = messages[lang];
    const x = this.x;
    const slotData = x.collectSlotData();
    const filtered = x.filterData(slotData, x.searchQuery);
    const { selectedValues, selectedSet, selectedCount, selectionFull } = x.getSelectionState();
    const hasError = this.isEditing ? Boolean(x.getValidationError(selectedCount)) : false;
    const labelMap = x.getSelectedLabelMap(slotData.allItems);
    const selectedLabels = selectedValues.map((val) => {
      const label = labelMap.get(val);
      if (label) {
        return { label, isHtml: true };
      }
      return { label: val, isHtml: false };
    });
    if (!this.isEditing) {
      return this.brutalViewMode(selectedLabels);
    }
    const triggerClasses = this.brutalTriggerClasses(hasError);
    return html`
      <div class="w-full" role="group">
        <div class="flex items-start gap-3">
          ${this.brutalLabel()}
          <div class="relative flex-1">
            <button
              id="${this.name || this.bPanelId}"
              type="button"
              class="${triggerClasses}"
              role="combobox"
              aria-expanded="${x.isOpen}"
              aria-haspopup="listbox"
              aria-controls="${this.bPanelId}"
              aria-labelledby="${this.hasSlot('Label') ? this.bLabelId : ''}"
              aria-invalid="${hasError}"
              aria-required="${this.required}"
              ?disabled=${this.disabled || this.readonly || this.loading}
              @focus=${() => x.handleTriggerFocus()}
              @blur=${() => x.handleTriggerBlur()}
              @click=${() => x.handleTriggerClick()}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  x.openPanel();
                }
              }}
            >
              <div class="flex-1 flex items-center gap-2">
                ${this.brutalTriggerContent(selectedLabels, selectedCount)}
              </div>
              <span class="brutal-pms-chevron">
                <svg viewBox="0 0 20 20" class="w-4 h-4" aria-hidden="true">
                  ${svg`<path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"></path>`}
                </svg>
              </span>
            </button>
          </div>
        </div>
        ${this.brutalError(hasError)}
        ${this.brutalHelper(hasError)}
      </div>
    `;
  }
}
