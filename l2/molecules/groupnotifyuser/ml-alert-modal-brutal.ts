/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-alert-modal-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML-ALERT-MODAL — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNotifyUser
// Herda toda a lógica de MlAlertModalMolecule (mls-102040): visibilidade,
// auto-dismiss timer, eventos (dismiss/action) e estado reativo. Sobrescreve
// apenas render() e helpers brutal-prefixados.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlAlertModalMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';

/// **collab_i18n_start**
const message_en = {
  dismiss: 'Dismiss notification',
  defaultMessage: 'Notification',
};

type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    dismiss: 'Dispensar notificação',
    defaultMessage: 'Notificação',
  },
};
/// **collab_i18n_end**

interface AlertModalInternals {
  handleDismiss(): void;
  handleActionClick(): void;
  getNormalizedType(): 'info' | 'success' | 'warning' | 'error';
  getRole(): 'alert' | 'status';
  getAriaLive(): 'assertive' | 'polite';
  getPositionClasses(): string;
}

@customElement('groupnotifyuser--ml-alert-modal-brutal')
export class MlAlertModalBrutal extends MlAlertModalMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): AlertModalInternals {
    return this as unknown as AlertModalInternals;
  }

  private brutalHandleDismiss = () => this.x.handleDismiss();
  private brutalHandleActionClick = () => this.x.handleActionClick();

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalContainerClasses(): string {
    return ['brutal-modal', `is-${this.x.getNormalizedType()}`, 'w-full max-w-xl p-6'].join(' ');
  }

  private brutalIconWrapperClasses(): string {
    return 'brutal-modal-icon-wrap h-12 w-12 flex items-center justify-center';
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalDefaultIcon(): TemplateResult {
    const type = this.x.getNormalizedType();
    if (type === 'success') {
      return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>`}</svg>`;
    }
    if (type === 'warning') {
      return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01"></path>`}${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>`}</svg>`;
    }
    if (type === 'error') {
      return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01"></path>`}${svg`<circle cx="12" cy="12" r="9"></circle>`}</svg>`;
    }
    return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<circle cx="12" cy="12" r="9"></circle>`}${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M12 8h.01M11 12h2v4h-2z"></path>`}</svg>`;
  }

  private brutalIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="${this.brutalIconWrapperClasses()}">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="${this.brutalIconWrapperClasses()}">${this.brutalDefaultIcon()}</div>`;
  }

  private brutalTitle(): TemplateResult {
    if (!this.hasSlot('Title')) return html``;
    return html`<h3 class="brutal-modal-title text-lg font-bold">${unsafeHTML(this.getSlotContent('Title'))}</h3>`;
  }

  private brutalMessage(): TemplateResult {
    const message = this.getSlotContent('Message') || this.gMsg.defaultMessage;
    return html`<div class="brutal-modal-message text-sm">${unsafeHTML(message)}</div>`;
  }

  private brutalActions(): TemplateResult {
    if (!this.hasSlot('Action')) return html``;
    return html`<div class="mt-6 flex items-center justify-end gap-3" @click=${this.brutalHandleActionClick}>${unsafeHTML(this.getSlotContent('Action'))}</div>`;
  }

  private brutalDismiss(): TemplateResult {
    if (!this.dismissible) return html``;
    return html`
      <button type="button" class="brutal-modal-dismiss" aria-label="${this.gMsg.dismiss}" @click=${this.brutalHandleDismiss}>
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>`}</svg>
      </button>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (!this.visible) return html``;

    return html`
      <div class="fixed inset-0 z-50 flex ${x.getPositionClasses()} p-6">
        <div class="brutal-modal-scrim absolute inset-0" aria-hidden="true" @click=${this.dismissible ? this.brutalHandleDismiss : null}></div>
        <div
          class="relative z-10 w-full ${this.brutalContainerClasses()}"
          role="${x.getRole()}"
          aria-live="${x.getAriaLive()}"
          aria-modal="true"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              ${this.brutalIcon()}
              <div class="space-y-2">${this.brutalTitle()} ${this.brutalMessage()}</div>
            </div>
            ${this.brutalDismiss()}
          </div>
          ${this.brutalActions()}
        </div>
      </div>
    `;
  }
}
