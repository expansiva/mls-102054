/// <mls fileReference="_102054_/l2/molecules/grouprateitem/ml-star-rating-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// STAR RATING — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupRateItem
// Herda toda a lógica de MlStarRatingMolecule (mls-102040) e sobrescreve apenas
// o render() com o template brutal. Aparência no .less escopado na tag -brutal.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlStarRatingMolecule } from '/_102040_/l2/molecules/grouprateitem/ml-star-rating.js';

type RatingItem = {
  value: number;
  label: string;
};

interface StarRatingInternals {
  hoverValue: number | null;
  handleOptionClick(value: number): void;
  handleOptionMouseEnter(value: number): void;
  handleOptionMouseLeave(): void;
  handleOptionFocus(): void;
  handleOptionBlur(): void;
  handleOptionKeydown(e: KeyboardEvent, currentValue: number): void;
  getRatingItems(): RatingItem[];
  getActiveValue(): number | null;
  isItemActive(itemValue: number, activeValue: number | null): boolean;
  getLabelId(): string | null;
  getHelpId(): string | null;
  getIsInvalid(): boolean;
}

@customElement('grouprateitem--ml-star-rating-brutal')
export class StarRatingBrutal extends MlStarRatingMolecule {
  private get internals(): StarRatingInternals {
    return this as unknown as StarRatingInternals;
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id="${this.internals.getLabelId() || ''}" class="brutal-sr-label mb-1 text-sm font-bold">
        ${unsafeHTML(this.getSlotContent('Label'))}
      </label>
    `;
  }

  private brutalHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id="${this.internals.getHelpId() || ''}" class="brutal-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${this.internals.getHelpId() || ''}" class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }

  private brutalHiddenInput(): TemplateResult {
    if (!this.name) return html``;
    const val = this.value === null || this.value === undefined ? '' : String(this.value);
    return html`<input type="hidden" name="${this.name}" value="${val}" />`;
  }

  private brutalStarIcon(isActive: boolean): TemplateResult {
    const iconClasses = ['brutal-sr-star w-5 h-5', isActive ? 'is-active' : ''].filter(Boolean).join(' ');
    return html`
      <svg class="${iconClasses}" viewBox="0 0 20 20" aria-hidden="true">
        ${svg`<path fill="currentColor" d="M10 15.27l-5.18 3.05 1.64-5.81L1 7.97l6.02-.52L10 2l2.98 5.45 6.02.52-5.46 4.54 1.64 5.81z" />`}
      </svg>
    `;
  }

  private brutalOption(item: RatingItem, activeValue: number | null, isTabbable: boolean): TemplateResult {
    const self = this.internals;
    const isActive = self.isItemActive(item.value, activeValue);
    const isSelected = this.value === item.value;
    const optionClasses = [
      'brutal-sr-option inline-flex items-center justify-center p-1',
      this.disabled ? 'is-disabled' : '',
      isSelected ? 'is-selected' : '',
    ].filter(Boolean).join(' ');
    const ariaChecked = isSelected ? 'true' : 'false';
    const label = item.label ? item.label : `Rating ${item.value}`;
    return html`
      <button
        class="${optionClasses}"
        type="button"
        role="radio"
        aria-checked="${ariaChecked}"
        aria-label="${label}"
        data-role="rating-option"
        data-value="${item.value}"
        ?disabled="${this.disabled}"
        ?tabindex="${isTabbable}"
        @focus="${() => self.handleOptionFocus()}"
        @blur="${() => self.handleOptionBlur()}"
        @mouseenter="${() => self.handleOptionMouseEnter(item.value)}"
        @mouseleave="${() => self.handleOptionMouseLeave()}"
        @click="${() => self.handleOptionClick(item.value)}"
        @keydown="${(e: KeyboardEvent) => self.handleOptionKeydown(e, item.value)}"
      >
        ${item.label ? html`${unsafeHTML(item.label)}` : this.brutalStarIcon(isActive)}
      </button>
    `;
  }

  private brutalEditMode(items: RatingItem[]): TemplateResult {
    const self = this.internals;
    const activeValue = self.getActiveValue();
    const labelId = self.getLabelId();
    const helpId = self.getHelpId();
    const isInvalid = self.getIsInvalid();
    const containerClasses = [
      'brutal-sr-box flex items-center gap-1 px-2 py-1',
      isInvalid ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
    const defaultTabValue = this.value !== null ? this.value : (items[0]?.value ?? 0);
    return html`
      <div
        class="${containerClasses}"
        role="radiogroup"
        aria-labelledby="${labelId || ''}"
        aria-describedby="${helpId || ''}"
        aria-invalid="${isInvalid ? 'true' : 'false'}"
        aria-required="${this.required ? 'true' : 'false'}"
        @mouseleave="${() => self.handleOptionMouseLeave()}"
      >
        ${items.map((item) => this.brutalOption(item, activeValue, item.value === defaultTabValue))}
      </div>
      ${this.brutalHiddenInput()}
      ${this.brutalHelperOrError()}
    `;
  }

  private brutalViewMode(items: RatingItem[]): TemplateResult {
    const self = this.internals;
    const labelId = self.getLabelId();
    const selected = items.find((i) => i.value === this.value);
    const content = this.value === null
      ? html`<span class="brutal-sr-empty">—</span>`
      : selected && selected.label
      ? html`${unsafeHTML(selected.label)}`
      : html`
          <div class="flex items-center gap-1" aria-labelledby="${labelId || ''}">
            ${items.map((item) => this.brutalStarIcon(self.isItemActive(item.value, this.value)))}
          </div>
        `;
    return html`
      <div class="flex items-center gap-2">
        ${content}
        ${this.brutalHiddenInput()}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const items = this.internals.getRatingItems();
    return html`
      <div class="w-full">
        ${this.brutalLabel()}
        ${this.isEditing ? this.brutalEditMode(items) : this.brutalViewMode(items)}
      </div>
    `;
  }
}
