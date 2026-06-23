/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-toast-notification-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TOAST NOTIFICATION — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNotifyUser
// Herda toda a lógica de ToastNotificationMolecule (mls-102040): timers de
// auto-dismiss, estado de animação, dispatch de eventos (dismiss/action) e o
// ciclo de vida reativo. Sobrescreve APENAS render() + helpers brutal-*.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ToastNotificationMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';

/// **collab_i18n_start**
const message_en = {
  dismissLabel: 'Dismiss notification',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    dismissLabel: 'Dispensar notificação',
  },
};
/// **collab_i18n_end**

interface ToastNotificationInternals {
  isAnimatingOut: boolean;
  handleDismiss(): void;
  handleActionClick(e: Event): void;
}

@customElement('groupnotifyuser--ml-toast-notification-brutal')
export class MlToastNotificationBrutal extends ToastNotificationMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): ToastNotificationInternals {
    return this as unknown as ToastNotificationInternals;
  }

  private gHandleDismiss = (): void => {
    this.x.handleDismiss();
  };

  private gHandleActionClick = (e: Event): void => {
    this.x.handleActionClick(e);
  };

  // ===========================================================================
  // STYLING HELPERS (brutal)
  // ===========================================================================
  private brutalContainerClasses(): string {
    return [
      'brutal-toast',
      `is-${this.type}`,
      'flex items-start gap-3 p-4 max-w-sm w-full',
      this.brutalPositionClasses(),
      this.x.isAnimatingOut ? 'opacity-0' : 'opacity-100',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalPositionClasses(): string {
    if (!this.position) return '';
    const positionMap: Record<string, string> = {
      top: 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
      bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
      'top-right': 'fixed top-4 right-4 z-50',
      'bottom-right': 'fixed bottom-4 right-4 z-50',
      'top-left': 'fixed top-4 left-4 z-50',
      'bottom-left': 'fixed bottom-4 left-4 z-50',
    };
    return positionMap[this.position] || '';
  }

  // ===========================================================================
  // ACCESSIBILITY HELPERS
  // ===========================================================================
  private brutalAriaRole(): string {
    return this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
  }

  private brutalAriaLive(): 'assertive' | 'polite' {
    return this.type === 'error' ? 'assertive' : 'polite';
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalRenderIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="brutal-toast-icon flex-shrink-0">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="brutal-toast-icon flex-shrink-0">${this.brutalRenderDefaultIcon()}</div>`;
  }

  private brutalRenderDefaultIcon(): TemplateResult {
    const iconClasses = 'w-5 h-5';
    switch (this.type) {
      case 'success':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />`}</svg>`;
      case 'warning':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />`}</svg>`;
      case 'error':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />`}</svg>`;
      case 'info':
      default:
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />`}</svg>`;
    }
  }

  private brutalRenderTitle(): TemplateResult {
    if (!this.hasSlot('Title')) return html``;
    return html`<div class="brutal-toast-title text-sm font-bold">${unsafeHTML(this.getSlotContent('Title'))}</div>`;
  }

  private brutalRenderMessage(): TemplateResult {
    return html`<div class="brutal-toast-message text-sm">${unsafeHTML(this.getSlotContent('Message'))}</div>`;
  }

  private brutalRenderAction(): TemplateResult {
    if (!this.hasSlot('Action')) return html``;
    return html`<div class="brutal-toast-action mt-2 text-sm font-bold cursor-pointer" @click=${this.gHandleActionClick}>${unsafeHTML(this.getSlotContent('Action'))}</div>`;
  }

  private brutalRenderCloseButton(): TemplateResult {
    if (!this.dismissible) return html``;
    return html`
      <button type="button" class="brutal-toast-close flex-shrink-0 p-1" aria-label="${this.gMsg.dismissLabel}" @click=${this.gHandleDismiss}>
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">${svg`<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />`}</svg>
      </button>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.visible && !this.x.isAnimatingOut) {
      return html``;
    }

    return html`
      <div class="${this.brutalContainerClasses()}" role="${this.brutalAriaRole()}" aria-live="${this.brutalAriaLive()}">
        ${this.brutalRenderIcon()}
        <div class="flex-1 min-w-0">${this.brutalRenderTitle()} ${this.brutalRenderMessage()} ${this.brutalRenderAction()}</div>
        ${this.brutalRenderCloseButton()}
      </div>
    `;
  }
}
