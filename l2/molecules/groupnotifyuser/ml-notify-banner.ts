/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-notify-banner.ts" enhancement="_102020_/l2/enhancementAura" />

// =============================================================================
// NOTIFY BANNER MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupNotifyUser (notify + user)
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, state } from 'lit/decorators.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

/// **collab_i18n_start**
const message_en = {
  dismissLabel: 'Dismiss notification',
  missingMessage: 'Notification message is required.',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    dismissLabel: 'Dispensar notificação',
    missingMessage: 'Mensagem da notificação é obrigatória.',
  },
};
/// **collab_i18n_end**

@customElement('groupnotifyuser--ml-notify-banner')
export class NotifyBannerMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;

  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Title', 'Message', 'Action', 'Icon'];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: String })
  type: 'info' | 'success' | 'warning' | 'error' | string = 'info';

  @propertyDataSource({ type: Boolean })
  visible = false;

  @propertyDataSource({ type: Boolean })
  dismissible = true;

  @propertyDataSource({ type: Number })
  duration = 0;

  @propertyDataSource({ type: String })
  position = '';

  // ===========================================================================
  // INTERNAL STATE
  // ===========================================================================
  @state()
  private dismissTimer: number | null = null;

  // ===========================================================================
  // LIFECYCLE
  // ===========================================================================
  disconnectedCallback() {
    this.clearAutoDismiss();
    super.disconnectedCallback();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('visible') || changedProps.has('duration')) {
      if (this.visible && this.duration > 0) {
        this.startAutoDismiss();
      } else {
        this.clearAutoDismiss();
      }
    }
  }

  // ===========================================================================
  // AUTO-DISMISS
  // ===========================================================================
  private startAutoDismiss(): void {
    this.clearAutoDismiss();
    this.dismissTimer = window.setTimeout(() => {
      if (!this.visible) return;
      this.handleDismiss();
    }, this.duration);
  }

  private clearAutoDismiss(): void {
    if (this.dismissTimer) {
      window.clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
  }

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleDismiss(): void {
    if (!this.visible) return;
    this.clearAutoDismiss();
    this.visible = false;
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true, detail: {} }));
  }

  private handleActionClick(): void {
    this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true, detail: {} }));
  }

  // ===========================================================================
  // RENDER HELPERS  (aparência = classes glass; layout/posição = Tailwind)
  // ===========================================================================
  private getRole(): string {
    return this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
  }

  private getAriaLive(): string {
    return this.type === 'error' ? 'assertive' : 'polite';
  }

  private getPositionClasses(): string {
    if (!this.position) return '';
    const pos = this.position.toLowerCase();
    const base = ['fixed', 'z-50'].join(' ');

    if (pos.includes('top-right')) return `${base} top-4 right-4`;
    if (pos.includes('top-left')) return `${base} top-4 left-4`;
    if (pos.includes('bottom-right')) return `${base} bottom-4 right-4`;
    if (pos.includes('bottom-left')) return `${base} bottom-4 left-4`;
    if (pos.includes('top')) return `${base} top-4 left-1/2 -translate-x-1/2`;
    if (pos.includes('bottom')) return `${base} bottom-4 left-1/2 -translate-x-1/2`;

    return `${base} top-4 right-4`;
  }

  private getContainerClasses(): string {
    return [
      'glass-banner',
      `is-${this.type}`,
      'w-full max-w-xl flex items-start gap-3 px-4 py-3 text-sm',
      this.position ? '' : 'relative',
      this.getPositionClasses(),
    ]
      .filter(Boolean)
      .join(' ');
  }

  private renderDefaultIcon(): TemplateResult {
    const iconClasses = 'glass-banner-icon h-5 w-5';

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

  private renderIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="mt-0.5">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="mt-0.5">${this.renderDefaultIcon()}</div>`;
  }

  private renderTitle(): TemplateResult {
    if (!this.hasSlot('Title')) return html``;
    return html`<div class="glass-banner-title text-sm font-semibold">${unsafeHTML(this.getSlotContent('Title'))}</div>`;
  }

  private renderMessage(): TemplateResult {
    const content = this.hasSlot('Message') ? this.getSlotContent('Message') : this.msg.missingMessage;
    return html`<div class="glass-banner-message text-sm">${unsafeHTML(content)}</div>`;
  }

  private renderAction(): TemplateResult {
    if (!this.hasSlot('Action')) return html``;
    return html`
      <div class="glass-banner-action mt-3 inline-flex items-center text-sm font-medium cursor-pointer" @click=${this.handleActionClick}>
        ${unsafeHTML(this.getSlotContent('Action'))}
      </div>
    `;
  }

  private renderDismissButton(): TemplateResult {
    if (!this.dismissible) return html``;
    return html`
      <button
        class="glass-banner-dismiss ml-2 inline-flex h-7 w-7 items-center justify-center"
        aria-label="${this.msg.dismissLabel}"
        @click=${this.handleDismiss}
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
  // RENDER
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    if (!this.visible) {
      return html``;
    }

    return html`
      <div class="${this.getContainerClasses()}" role="${this.getRole()}" aria-live="${this.getAriaLive()}">
        ${this.renderIcon()}
        <div class="flex-1">${this.renderTitle()} ${this.renderMessage()} ${this.renderAction()}</div>
        ${this.renderDismissButton()}
      </div>
    `;
  }
}
