/// <mls fileReference="_102054_/l2/molecules/grouptriggeraction/ml-icon-button-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ICON BUTTON — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupTriggerAction
// Herda IconButtonMolecule (mls-102040): sizes, loading, evento 'action', rótulo
// acessível. Sobrescreve só render() + helpers presentacionais brutal.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { IconButtonMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-icon-button.js';

/// **collab_i18n_start**
const message_en = {
  defaultLabel: 'Action',
  loadingLabel: 'Processing',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    defaultLabel: 'Ação',
    loadingLabel: 'Processando',
  },
};
/// **collab_i18n_end**

interface IconButtonInternals {
  handleActionClick(event: Event): void;
  getAccessibleLabel(rawLabel: string): string;
  getSizeClasses(): string;
}

@customElement('grouptriggeraction--ml-icon-button-brutal')
export class IconButtonBrutal extends IconButtonMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): IconButtonInternals {
    return this as unknown as IconButtonInternals;
  }

  private brutalButtonClasses(isDisabled: boolean): string {
    return [
      'brutal-icon-btn',
      'inline-flex items-center justify-center',
      this.x.getSizeClasses(),
      isDisabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalIconClasses(): string {
    return 'brutal-icon-btn-icon inline-flex items-center justify-center w-full h-full';
  }

  private brutalRenderIcon(): TemplateResult {
    const iconContent = this.getSlotContent('Icon');
    if (iconContent) {
      return html`<span class=${this.brutalIconClasses()} aria-hidden="true">${unsafeHTML(iconContent)}</span>`;
    }
    return html`
      <span class=${this.brutalIconClasses()} aria-hidden="true">
        <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor" aria-hidden="true">${svg`<circle cx="12" cy="12" r="4"></circle>`}</svg>
      </span>
    `;
  }

  private brutalRenderLoadingIcon(): TemplateResult {
    const label = this.getSlotContent('Label') || this.gMsg.loadingLabel;
    return html`
      <span class=${this.brutalIconClasses()} aria-hidden="true">
        <svg viewBox="0 0 24 24" class="w-full h-full animate-spin" fill="none" stroke="currentColor" stroke-width="2">${svg`<circle cx="12" cy="12" r="9" opacity="0.3"></circle><path d="M21 12a9 9 0 0 1-9 9"></path>`}</svg>
      </span>
      <span class="sr-only">${unsafeHTML(label)}</span>
    `;
  }

  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    const isDisabled = this.disabled || this.loading;
    const labelContent = this.getSlotContent('Label') || this.gMsg.defaultLabel;
    const ariaLabel = x.getAccessibleLabel(labelContent);

    return html`
      <button
        type=${this.type}
        class=${this.brutalButtonClasses(isDisabled)}
        ?disabled=${isDisabled}
        aria-label=${ariaLabel}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-disabled=${isDisabled ? 'true' : 'false'}
        @click=${(e: Event) => x.handleActionClick(e)}
      >
        <span class="sr-only">${unsafeHTML(labelContent)}</span>
        ${this.loading ? this.brutalRenderLoadingIcon() : this.brutalRenderIcon()}
      </button>
    `;
  }
}
