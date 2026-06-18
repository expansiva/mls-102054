/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-segmented-control.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SEGMENTED CONTROL MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupSelectOne
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência no .less.
// This molecule does NOT contain business logic.

import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

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
    placeholder: 'Selecione uma opção',
    noOptions: 'Nenhuma opção disponível',
    loading: 'Carregando...',
  },
};
/// **collab_i18n_end**

interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
}

@customElement('groupselectone--ml-segmented-control')
export class SegmentedControlMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;

  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Label', 'Helper', 'Trigger', 'Item', 'Group', 'Empty'];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: String })
  value: string | null = null;

  @propertyDataSource({ type: String })
  error: string = '';

  @propertyDataSource({ type: String })
  name: string = '';

  @propertyDataSource({ type: String })
  placeholder: string = '';

  @propertyDataSource({ type: Boolean, attribute: 'is-editing' })
  isEditing: boolean = true;

  @propertyDataSource({ type: Boolean })
  disabled: boolean = false;

  @propertyDataSource({ type: Boolean })
  readonly: boolean = false;

  @propertyDataSource({ type: Boolean })
  required: boolean = false;

  @propertyDataSource({ type: Boolean })
  loading: boolean = false;

  // ===========================================================================
  // INTERNAL STATE
  // ===========================================================================
  @state()
  private focusedIndex: number = -1;

  @state()
  private parsedItems: ParsedItem[] = [];

  // ===========================================================================
  // LIFECYCLE
  // ===========================================================================
  firstUpdated() {
    this.parseItems();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.requestUpdate();
    }
  }

  // ===========================================================================
  // ITEM PARSING
  // ===========================================================================
  private parseItems(): void {
    const itemElements = this.getSlots('Item');
    this.parsedItems = itemElements.map((el) => ({
      value: el.getAttribute('value') || '',
      label: el.innerHTML.trim(),
      disabled: el.hasAttribute('disabled'),
    }));
  }

  private findItem(value: string | null): ParsedItem | undefined {
    if (value === null) return undefined;
    return this.parsedItems.find((item) => item.value === value);
  }

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleSelect(item: ParsedItem) {
    if (this.disabled || this.readonly || this.loading || item.disabled) return;

    this.value = item.value;
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { value: this.value } }));
  }

  private handleKeyDown(e: KeyboardEvent, index: number) {
    if (this.disabled || this.loading) return;

    const enabledItems = this.parsedItems.filter((item) => !item.disabled);
    const currentEnabledIndex = enabledItems.findIndex((item) => item.value === this.parsedItems[index]?.value);

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        this.focusNextItem(currentEnabledIndex, enabledItems);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this.focusPreviousItem(currentEnabledIndex, enabledItems);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!this.parsedItems[index]?.disabled) {
          this.handleSelect(this.parsedItems[index]);
        }
        break;
    }
  }

  private focusNextItem(currentIndex: number, enabledItems: ParsedItem[]) {
    if (enabledItems.length === 0) return;
    const nextIndex = (currentIndex + 1) % enabledItems.length;
    const nextItem = enabledItems[nextIndex];
    const globalIndex = this.parsedItems.findIndex((item) => item.value === nextItem.value);
    this.focusedIndex = globalIndex;
    this.focusSegment(globalIndex);
  }

  private focusPreviousItem(currentIndex: number, enabledItems: ParsedItem[]) {
    if (enabledItems.length === 0) return;
    const prevIndex = currentIndex <= 0 ? enabledItems.length - 1 : currentIndex - 1;
    const prevItem = enabledItems[prevIndex];
    const globalIndex = this.parsedItems.findIndex((item) => item.value === prevItem.value);
    this.focusedIndex = globalIndex;
    this.focusSegment(globalIndex);
  }

  private focusSegment(index: number) {
    const segments = this.querySelectorAll('[role="option"]');
    const segment = segments[index] as HTMLElement;
    if (segment) {
      segment.focus();
    }
  }

  private handleFocus() {
    if (this.disabled || this.loading) return;
    this.dispatchEvent(new CustomEvent('focus', { bubbles: true, composed: true }));
  }

  private handleBlur() {
    this.focusedIndex = -1;
    this.dispatchEvent(new CustomEvent('blur', { bubbles: true, composed: true }));
  }

  // ===========================================================================
  // RENDER HELPERS  (aparência = classes glass; layout = Tailwind)
  // ===========================================================================
  private getContainerClasses(): string {
    return [
      'glass-seg-track',
      'flex w-full p-1 gap-1',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getSegmentClasses(item: ParsedItem, isSelected: boolean): string {
    return [
      'glass-seg',
      'px-4 py-2 text-sm font-medium',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
      this.readonly && !item.disabled ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getLabelClasses(): string {
    return 'glass-seg-label block text-xs';
  }

  private getHelperClasses(): string {
    return 'glass-helper mt-1.5 text-xs';
  }

  private getErrorClasses(): string {
    return 'glass-error-text mt-1.5 text-xs';
  }

  private getViewModeClasses(): string {
    return 'glass-seg-view-value text-sm';
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    this.parseItems();

    if (!this.isEditing) {
      return this.renderViewMode();
    }

    return this.renderEditMode();
  }

  private renderViewMode(): TemplateResult {
    const selectedItem = this.findItem(this.value);
    const displayText = selectedItem
      ? selectedItem.label
      : this.placeholder || this.getSlotContent('Trigger') || this.msg.placeholder;

    return html`<div class=${this.getViewModeClasses()}>${unsafeHTML(displayText)}</div>`;
  }

  private renderEditMode(): TemplateResult {
    const labelId = `label-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `error-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!this.error;

    return html`
      <div class="flex flex-col w-full">
        <div class="min-h-[1rem]">${this.renderLabel(labelId)}</div>
        ${this.loading ? this.renderLoading() : this.renderSegments(labelId, errorId, hasError)}
        ${this.renderFeedback(errorId, hasError)}
      </div>
    `;
  }

  private renderLabel(labelId: string): TemplateResult {
    if (!this.hasSlot('Label')) {
      return html``;
    }

    return html`
      <label id=${labelId} class=${this.getLabelClasses()}>
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private renderLoading(): TemplateResult {
    return html`
      <div class=${this.getContainerClasses()}>
        <div class="glass-seg-loading px-4 py-2 text-sm">${this.msg.loading}</div>
      </div>
    `;
  }

  private renderSegments(labelId: string, errorId: string, hasError: boolean): TemplateResult {
    if (this.parsedItems.length === 0) {
      return this.renderEmpty();
    }

    return html`
      <div
        role="listbox"
        aria-labelledby=${this.hasSlot('Label') ? labelId : ''}
        aria-required=${this.required}
        aria-invalid=${hasError}
        aria-describedby=${hasError ? errorId : ''}
        class=${this.getContainerClasses()}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        ${this.parsedItems.map((item, index) => this.renderSegment(item, index))}
      </div>
    `;
  }

  private renderSegment(item: ParsedItem, index: number): TemplateResult {
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
        class=${this.getSegmentClasses(item, isSelected)}
        @click=${() => this.handleSelect(item)}
        @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, index)}
        ?disabled=${this.disabled || this.loading}
      >
        ${unsafeHTML(item.label)}
      </button>
    `;
  }

  private renderEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.msg.noOptions;
    return html`<div class="glass-seg-empty px-4 py-2 text-sm">${unsafeHTML(emptyContent)}</div>`;
  }

  private renderFeedback(errorId: string, hasError: boolean): TemplateResult {
    if (hasError) {
      return html`<p id=${errorId} class=${this.getErrorClasses()}>${unsafeHTML(this.error)}</p>`;
    }

    if (this.hasSlot('Helper')) {
      return html`<p class=${this.getHelperClasses()}>${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }

    return html``;
  }
}
