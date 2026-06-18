/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-alert-modal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML-ALERT-MODAL MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupNotifyUser
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// O scrim usa backdrop-filter (desfoca a página atrás); o painel é vidro.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

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

@customElement('groupnotifyuser--ml-alert-modal')
export class MlAlertModalMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;

  // =========================================================================
  // SLOT TAGS
  // =========================================================================
  slotTags = ['Title', 'Message', 'Action', 'Icon'];

  // =========================================================================
  // PROPERTIES — From Contract
  // =========================================================================
  @propertyDataSource({ type: String })
  type: string = 'info';

  @propertyDataSource({ type: Boolean })
  visible: boolean = false;

  @propertyDataSource({ type: Boolean })
  dismissible: boolean = true;

  @propertyDataSource({ type: Number })
  duration: number = 0;

  @propertyDataSource({ type: String })
  position: string = '';

  // =========================================================================
  // INTERNAL STATE
  // =========================================================================
  @state()
  private autoDismissId: number | null = null;

  // =========================================================================
  // STATE CHANGE HANDLER
  // =========================================================================
  handleIcaStateChange(key: string) {
    const visibleAttr = this.getAttribute('visible');
    const durationAttr = this.getAttribute('duration');
    if (visibleAttr === `{{${key}}}` || durationAttr === `{{${key}}}`) {
      this.manageAutoDismiss();
    }
    this.requestUpdate();
  }

  // =========================================================================
  // LIFECYCLE
  // =========================================================================
  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('visible') || changedProps.has('duration')) {
      this.manageAutoDismiss();
    }
  }

  // =========================================================================
  // AUTO DISMISS
  // =========================================================================
  private manageAutoDismiss() {
    this.clearAutoDismiss();
    if (!this.visible || this.duration <= 0) return;
    this.autoDismissId = window.setTimeout(() => {
      this.handleDismiss();
    }, this.duration);
  }

  private clearAutoDismiss() {
    if (this.autoDismissId !== null) {
      window.clearTimeout(this.autoDismissId);
      this.autoDismissId = null;
    }
  }

  // =========================================================================
  // EVENT HANDLERS
  // =========================================================================
  private handleDismiss() {
    if (!this.visible) return;
    this.visible = false;
    this.clearAutoDismiss();
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true, detail: {} }));
  }

  private handleActionClick() {
    if (!this.visible) return;
    this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true, detail: {} }));
  }

  // =========================================================================
  // HELPERS
  // =========================================================================
  private getNormalizedType(): 'info' | 'success' | 'warning' | 'error' {
    const raw = (this.type || 'info').toLowerCase();
    if (raw === 'danger') return 'error';
    if (raw === 'success' || raw === 'warning' || raw === 'error') return raw;
    return 'info';
  }

  private getRole(): 'alert' | 'status' {
    const t = this.getNormalizedType();
    return t === 'error' || t === 'warning' ? 'alert' : 'status';
  }

  private getAriaLive(): 'assertive' | 'polite' {
    const t = this.getNormalizedType();
    return t === 'error' ? 'assertive' : 'polite';
  }

  private getPositionClasses(): string {
    const pos = (this.position || '').toLowerCase();
    const base = 'items-center justify-center';
    if (!pos || pos === 'center') return base;
    if (pos === 'top') return 'items-start justify-center';
    if (pos === 'bottom') return 'items-end justify-center';
    if (pos === 'top-right') return 'items-start justify-end';
    if (pos === 'bottom-right') return 'items-end justify-end';
    if (pos === 'top-left') return 'items-start justify-start';
    if (pos === 'bottom-left') return 'items-end justify-start';
    return base;
  }

  private getContainerClasses(): string {
    return ['glass-modal', `is-${this.getNormalizedType()}`, 'w-full max-w-xl p-6'].join(' ');
  }

  private getIconWrapperClasses(): string {
    return 'glass-modal-icon-wrap h-12 w-12 rounded-full flex items-center justify-center';
  }

  private renderDefaultIcon(): TemplateResult {
    const type = this.getNormalizedType();
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

  private renderIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="${this.getIconWrapperClasses()}">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="${this.getIconWrapperClasses()}">${this.renderDefaultIcon()}</div>`;
  }

  private renderTitle(): TemplateResult {
    if (!this.hasSlot('Title')) return html``;
    return html`<h3 class="glass-modal-title text-lg font-semibold">${unsafeHTML(this.getSlotContent('Title'))}</h3>`;
  }

  private renderMessage(): TemplateResult {
    const message = this.getSlotContent('Message') || this.msg.defaultMessage;
    return html`<div class="glass-modal-message text-sm">${unsafeHTML(message)}</div>`;
  }

  private renderActions(): TemplateResult {
    if (!this.hasSlot('Action')) return html``;
    return html`<div class="mt-6 flex items-center justify-end gap-3" @click=${this.handleActionClick}>${unsafeHTML(this.getSlotContent('Action'))}</div>`;
  }

  private renderDismiss(): TemplateResult {
    if (!this.dismissible) return html``;
    return html`
      <button type="button" class="glass-modal-dismiss" aria-label="${this.msg.dismiss}" @click=${this.handleDismiss}>
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>`}</svg>
      </button>
    `;
  }

  // =========================================================================
  // RENDER
  // =========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    if (!this.visible) return html``;

    return html`
      <div class="fixed inset-0 z-50 flex ${this.getPositionClasses()} p-6">
        <div class="glass-modal-scrim absolute inset-0" aria-hidden="true" @click=${this.dismissible ? this.handleDismiss : null}></div>
        <div
          class="relative z-10 w-full ${this.getContainerClasses()}"
          role="${this.getRole()}"
          aria-live="${this.getAriaLive()}"
          aria-modal="true"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              ${this.renderIcon()}
              <div class="space-y-2">${this.renderTitle()} ${this.renderMessage()}</div>
            </div>
            ${this.renderDismiss()}
          </div>
          ${this.renderActions()}
        </div>
      </div>
    `;
  }
}
