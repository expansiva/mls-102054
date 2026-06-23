/// <mls fileReference="_102054_/l2/molecules/groupenterboolean/ml-toggle-switch-brutal.ts" enhancement="_102020_/l2/enhancementAura" />
// =============================================================================
// TOGGLE SWITCH — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupEnterBoolean
// Herda toda a lógica de ToggleSwitchMolecule (mls-102040) e sobrescreve apenas
// o render() com o template brutal. Aparência no .less escopado na tag -brutal.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ToggleSwitchMolecule } from '/_102040_/l2/molecules/groupenterboolean/ml-toggle-switch.js';

/// **collab_i18n_start**
const message_en = { yes: 'Yes', no: 'No' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { yes: 'Sim', no: 'Não' },
};
/// **collab_i18n_end**

interface ToggleSwitchInternals {
  handleToggle(): void;
  handleFocus(): void;
  handleBlur(): void;
  handleKeydown(event: KeyboardEvent): void;
}

@customElement('groupenterboolean--ml-toggle-switch-brutal')
export class ToggleSwitchBrutal extends ToggleSwitchMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `tg-brutal-${Math.random().toString(36).slice(2, 9)}`;

  private get internals(): ToggleSwitchInternals {
    return this as unknown as ToggleSwitchInternals;
  }

  private brutalLabel(labelId: string | undefined): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div id=${labelId || ''} class="brutal-tg-label mb-2 text-sm">
      ${unsafeHTML(this.getSlotContent('Label'))}
    </div>`;
  }

  private brutalHelper(helperId: string | undefined): TemplateResult {
    if (!this.hasSlot('Helper') || this.error) return html``;
    return html`<div id=${helperId || ''} class="brutal-helper mt-2 text-xs">
      ${unsafeHTML(this.getSlotContent('Helper'))}
    </div>`;
  }

  private brutalError(errorId: string | undefined): TemplateResult {
    if (!this.error) return html``;
    return html`<div id=${errorId || ''} class="brutal-error-text mt-2 text-xs">
      ${unsafeHTML(String(this.error))}
    </div>`;
  }

  private brutalTrackClasses(): string {
    return [
      'brutal-tg-track relative inline-flex h-7 w-14 items-center',
      this.value ? 'is-on' : '',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalThumbClasses(): string {
    return ['brutal-tg-thumb inline-block h-5 w-5', this.value ? 'is-on' : ''].filter(Boolean).join(' ');
  }

  private brutalViewMode(): TemplateResult {
    const labelId = this.hasSlot('Label') ? `${this.gUid}-label` : undefined;
    const viewValue = this.value ? this.gMsg.yes : this.gMsg.no;
    return html`
      <div class="w-full">
        ${this.brutalLabel(labelId)}
        <div class="brutal-tg-view text-sm">${viewValue}</div>
      </div>
    `;
  }

  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) {
      return this.brutalViewMode();
    }

    const labelId = this.hasSlot('Label') ? `${this.gUid}-label` : undefined;
    const helperId = this.hasSlot('Helper') ? `${this.gUid}-helper` : undefined;
    const errorId = this.error ? `${this.gUid}-error` : undefined;
    const describedBy = this.error ? errorId : helperId;
    const self = this.internals;

    return html`
      <div class="w-full">
        ${this.brutalLabel(labelId)}
        <button
          type="button"
          class=${this.brutalTrackClasses()}
          role="switch"
          aria-checked=${this.value ? 'true' : 'false'}
          aria-labelledby=${labelId || undefined}
          aria-describedby=${describedBy || undefined}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ?disabled=${this.disabled}
          tabindex=${this.disabled ? -1 : 0}
          @click=${() => self.handleToggle()}
          @focus=${() => self.handleFocus()}
          @blur=${() => self.handleBlur()}
          @keydown=${(e: KeyboardEvent) => self.handleKeydown(e)}
        >
          <span class=${this.brutalThumbClasses()}></span>
        </button>
        ${this.brutalError(errorId)}
        ${this.brutalHelper(helperId)}
      </div>
    `;
  }
}
