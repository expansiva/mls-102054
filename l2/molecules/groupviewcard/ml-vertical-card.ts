/// <mls fileReference="_102054_/l2/molecules/groupviewcard/ml-vertical-card.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML VERTICAL CARD MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupViewCard
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

@customElement('groupviewcard--ml-vertical-card')
export class MlVerticalCardMolecule extends MoleculeAuraElement {
  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'CardAction'];
  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: Boolean })
  clickable = false;

  @propertyDataSource({ type: Boolean })
  selected = false;

  @propertyDataSource({ type: Boolean })
  disabled = false;

  @propertyDataSource({ type: Boolean })
  loading = false;

  @propertyDataSource({ type: Boolean, attribute: 'is-editing' })
  isEditing = false;
  // ===========================================================================
  // LIFECYCLE
  // ===========================================================================
  updated(changed: Map<string, unknown>) {
    if (changed.has('isEditing')) {
      this.applyEditingAttribute();
    }
  }
  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleCardClick() {
    if (!this.isInteractive()) return;
    this.dispatchEvent(new CustomEvent('cardClick', { bubbles: true, composed: true, detail: {} }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isInteractive()) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleCardClick();
    }
  }
  // ===========================================================================
  // INTERNAL HELPERS  (aparência = classes glass)
  // ===========================================================================
  private isInteractive(): boolean {
    return this.clickable && !this.disabled && !this.loading;
  }

  private applyEditingAttribute() {
    const elements = Array.from(this.querySelectorAll('*'));
    elements.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      if (!tag.includes('-')) return;
      if (this.isEditing) {
        el.setAttribute('is-editing', '');
      } else {
        el.removeAttribute('is-editing');
      }
    });
  }

  private getRootClasses(): string {
    return [
      'glass-card',
      'w-full p-4 flex flex-col gap-4',
      this.selected ? 'is-selected' : '',
      this.isInteractive() ? 'is-interactive' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private renderHeader(): TemplateResult {
    const hasHeader = this.hasSlot('CardHeader');
    const hasTitle = this.hasSlot('CardTitle');
    const hasDescription = this.hasSlot('CardDescription');

    if (!hasHeader && !hasTitle && !hasDescription) {
      return html``;
    }

    if (hasHeader) {
      return html`<div class="flex flex-col gap-1 glass-card-text">${unsafeHTML(this.getSlotContent('CardHeader'))}</div>`;
    }

    return html`
      <div class="flex flex-col gap-1">
        ${hasTitle ? html`<div class="glass-card-title text-base font-semibold">${unsafeHTML(this.getSlotContent('CardTitle'))}</div>` : html``}
        ${hasDescription ? html`<div class="glass-card-desc text-sm">${unsafeHTML(this.getSlotContent('CardDescription'))}</div>` : html``}
      </div>
    `;
  }

  private renderContent(): TemplateResult {
    if (!this.hasSlot('CardContent')) return html``;
    return html`<div class="glass-card-content text-sm">${unsafeHTML(this.getSlotContent('CardContent'))}</div>`;
  }

  private renderFooter(): TemplateResult {
    if (!this.hasSlot('CardFooter')) return html``;
    return html`<div class="glass-card-footer text-xs">${unsafeHTML(this.getSlotContent('CardFooter'))}</div>`;
  }

  private renderAction(): TemplateResult {
    if (!this.hasSlot('CardAction')) return html``;
    return html`<div class="glass-card-action pt-3">${unsafeHTML(this.getSlotContent('CardAction'))}</div>`;
  }

  private renderLoading(): TemplateResult {
    return html`
      <div class="flex flex-col gap-4 animate-pulse">
        <div class="glass-skeleton h-4 w-2/3"></div>
        <div class="glass-skeleton h-3 w-1/2"></div>
        <div class="glass-skeleton h-20 w-full"></div>
        <div class="glass-skeleton h-3 w-1/3"></div>
        <div class="glass-skeleton h-9 w-28"></div>
      </div>
    `;
  }
  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const interactive = this.isInteractive();
    return html`
      <div
        class=${this.getRootClasses()}
        role=${ifDefined(interactive ? 'button' : undefined)}
        tabindex=${ifDefined(interactive ? '0' : undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-selected=${ifDefined(this.selected ? 'true' : undefined)}
        @click=${this.handleCardClick}
        @keydown=${this.handleKeyDown}
      >
        ${this.loading
          ? this.renderLoading()
          : html` ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()} ${this.renderAction()} `}
      </div>
    `;
  }
}
