/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-notify-banner-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NOTIFY BANNER — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNotifyUser
// Herda toda a lógica de NotifyBannerMolecule (mls-102040): auto-dismiss/timer,
// estado reativo (visible) e despacho de eventos (dismiss/action). NÃO sobrescreve
// lifecycle — apenas render() e os helpers brutal-prefixados.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { NotifyBannerMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';

/// **collab_i18n_start**
const message_en = {
  dismissLabel: 'Dismiss notification',
  missingMessage: 'Notification message is required.',
};
type MessageType = typeof message_en;
const gMsg: Record<string, MessageType> = {
  en: message_en,
  pt: {
    dismissLabel: 'Dispensar notificação',
    missingMessage: 'Mensagem da notificação é obrigatória.',
  },
};
/// **collab_i18n_end**

interface NotifyBannerInternals {
  handleDismiss(): void;
  handleActionClick(): void;
  getRole(): string;
  getAriaLive(): string;
  getPositionClasses(): string;
}

@customElement('groupnotifyuser--ml-notify-banner-brutal')
export class MlNotifyBannerBrutal extends NotifyBannerMolecule {
  private gLocalMsg: MessageType = gMsg.en;

  private get x(): NotifyBannerInternals {
    return this as unknown as NotifyBannerInternals;
  }

  private brutalDismiss = (): void => this.x.handleDismiss();
  private brutalActionClick = (): void => this.x.handleActionClick();

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalContainerClasses(): string {
    return [
      'brutal-banner',
      `is-${this.type}`,
      'w-full max-w-xl flex items-start gap-3 px-4 py-3 text-sm',
      this.position ? '' : 'relative',
      this.x.getPositionClasses(),
    ]
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalDefaultIcon(): TemplateResult {
    const iconClasses = 'brutal-banner-icon h-5 w-5';

    switch (this.type) {
      case 'success':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.415l-7.2 7.2a1 1 0 01-1.415 0l-3.6-3.6a1 1 0 011.415-1.415l2.893 2.893 6.493-6.493a1 1 0 011.415 0z" clip-rule="evenodd" /></svg>`;
      case 'warning':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.594C18.994 16.025 18.049 18 16.517 18H3.483c-1.532 0-2.477-1.975-1.744-3.307L8.257 3.1zM9 7a1 1 0 012 0v4a1 1 0 01-2 0V7zm1 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 15z" clip-rule="evenodd" /></svg>`;
      case 'error':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-10a1 1 0 112 0v4a1 1 0 01-2 0V8zm1 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 16z" clip-rule="evenodd" /></svg>`;
      case 'info':
      default:
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 8a1 1 0 112 0v6a1 1 0 11-2 0V8zm1-3a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z" clip-rule="evenodd" /></svg>`;
    }
  }

  private brutalIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="mt-0.5">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="mt-0.5">${this.brutalDefaultIcon()}</div>`;
  }

  private brutalTitle(): TemplateResult {
    if (!this.hasSlot('Title')) return html``;
    return html`<div class="brutal-banner-title text-sm font-bold">${unsafeHTML(this.getSlotContent('Title'))}</div>`;
  }

  private brutalMessage(): TemplateResult {
    const content = this.hasSlot('Message') ? this.getSlotContent('Message') : this.gLocalMsg.missingMessage;
    return html`<div class="brutal-banner-message text-sm">${unsafeHTML(content)}</div>`;
  }

  private brutalAction(): TemplateResult {
    if (!this.hasSlot('Action')) return html``;
    return html`
      <div class="brutal-banner-action mt-3 inline-flex items-center text-sm font-bold cursor-pointer" @click=${this.brutalActionClick}>
        ${unsafeHTML(this.getSlotContent('Action'))}
      </div>
    `;
  }

  private brutalDismissButton(): TemplateResult {
    if (!this.dismissible) return html``;
    return html`
      <button
        class="brutal-banner-dismiss ml-2 inline-flex h-7 w-7 items-center justify-center"
        aria-label="${this.gLocalMsg.dismissLabel}"
        @click=${this.brutalDismiss}
      >
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(gMsg);
    this.gLocalMsg = gMsg[lang];

    if (!this.visible) {
      return html``;
    }

    return html`
      <div class="${this.brutalContainerClasses()}" role="${this.x.getRole()}" aria-live="${this.x.getAriaLive()}">
        ${this.brutalIcon()}
        <div class="flex-1">${this.brutalTitle()} ${this.brutalMessage()} ${this.brutalAction()}</div>
        ${this.brutalDismissButton()}
      </div>
    `;
  }
}
