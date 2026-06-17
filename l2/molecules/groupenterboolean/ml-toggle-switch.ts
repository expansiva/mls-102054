/// <mls fileReference="_102054_/l2/molecules/groupenterboolean/ml-toggle-switch.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TOGGLE SWITCH MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupEnterBoolean
// Mesma molécula/contrato do mls-102040. A aparência (vidro) vive no .less,
// escopada sob a tag. Este projeto implementa apenas o modelo glassmorphism.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

/// **collab_i18n_start**
const message_en = {
  yes: 'Yes',
  no: 'No',
};

type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    yes: 'Sim',
    no: 'Não',
  },
};
/// **collab_i18n_end**

@customElement('groupenterboolean--ml-toggle-switch')
export class ToggleSwitchMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;
  private uid = `toggle-${Math.random().toString(36).slice(2, 9)}`;

  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Label', 'Helper'];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: Boolean })
  value = false;

  @propertyDataSource({ type: String })
  error = '';

  @propertyDataSource({ type: String })
  name = '';

  @propertyDataSource({ type: Boolean, attribute: 'is-editing' })
  isEditing = true;

  @propertyDataSource({ type: Boolean, attribute: 'disabled' })
  disabled = false;

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleToggle() {
    if (!this.isEditing || this.disabled) return;
    this.value = !this.value;
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, composed: true, detail: { value: this.value } })
    );
  }

  private handleFocus() {
    if (!this.isEditing || this.disabled) return;
    this.dispatchEvent(new CustomEvent('focus', { bubbles: true, composed: true, detail: {} }));
  }

  private handleBlur() {
    if (!this.isEditing || this.disabled) return;
    this.dispatchEvent(new CustomEvent('blur', { bubbles: true, composed: true, detail: {} }));
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!this.isEditing || this.disabled) return;
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      this.handleToggle();
    }
  }

  // ===========================================================================
  // RENDER HELPERS  (aparência via classes locais definidas no .less)
  // ===========================================================================
  private renderLabel(labelId: string | undefined): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div id=${labelId || ''} class="glass-label">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private renderHelper(helperId: string | undefined): TemplateResult {
    if (!this.hasSlot('Helper') || this.error) return html``;
    return html`<div id=${helperId || ''} class="glass-helper">${unsafeHTML(this.getSlotContent('Helper'))}</div>`;
  }

  private renderError(errorId: string | undefined): TemplateResult {
    if (!this.error) return html``;
    return html`<div id=${errorId || ''} class="glass-error-text">${unsafeHTML(String(this.error))}</div>`;
  }

  private renderViewMode(): TemplateResult {
    const labelId = this.hasSlot('Label') ? `${this.uid}-label` : undefined;
    const viewValue = this.value ? this.msg.yes : this.msg.no;
    return html`
      <div class="w-full">
        ${this.renderLabel(labelId)}
        <div class="glass-view-value">${viewValue}</div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    if (!this.isEditing) {
      return this.renderViewMode();
    }

    const labelId = this.hasSlot('Label') ? `${this.uid}-label` : undefined;
    const helperId = this.hasSlot('Helper') ? `${this.uid}-helper` : undefined;
    const errorId = this.error ? `${this.uid}-error` : undefined;
    const describedBy = this.error ? errorId : helperId;

    const trackClasses = [
      'glass-track',
      this.value ? 'is-on' : '',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="w-full">
        ${this.renderLabel(labelId)}
        <button
          type="button"
          class=${trackClasses}
          role="switch"
          aria-checked=${this.value ? 'true' : 'false'}
          aria-labelledby=${labelId || undefined}
          aria-describedby=${describedBy || undefined}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ?disabled=${this.disabled}
          tabindex=${this.disabled ? -1 : 0}
          @click=${this.handleToggle}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeydown}
        >
          <span class="glass-track-highlight" aria-hidden="true"></span>
          <span class="glass-thumb"></span>
        </button>
        ${this.renderError(errorId)}
        ${this.renderHelper(helperId)}
      </div>
    `;
  }
}
