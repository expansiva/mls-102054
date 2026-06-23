/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/ml-collapsible-panel-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COLLAPSIBLE PANEL — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupExpandContent
// Herda toda a lógica de MlCollapsiblePanelMolecule (mls-102040): estado das
// seções abertas (openSections), toggle, navegação por teclado e parsing dos
// slots Section. Sobrescreve apenas render() + helpers brutal-*.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlCollapsiblePanelMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-collapsible-panel.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

interface CollapsiblePanelInternals {
  openSections: Set<number>;
  msg: MessageType;
  handleHeaderClick(index: number): void;
  handleHeaderKeydown(event: KeyboardEvent, index: number): void;
  getSectionContent(el: Element): string;
}

@customElement('groupexpandcontent--ml-collapsible-panel-brutal')
export class MlCollapsiblePanelBrutal extends MlCollapsiblePanelMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): CollapsiblePanelInternals {
    return this as unknown as CollapsiblePanelInternals;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    return html`
      <div class="w-full">
        ${this.brutalLabel()}
        ${this.loading ? this.brutalLoading() : this.brutalSections()}
      </div>
    `;
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="brutal-clp-label mb-2 text-sm font-bold">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private brutalLoading(): TemplateResult {
    const items = [0, 1, 2];
    return html`
      <div class="space-y-2" aria-busy="true" aria-live="polite">
        ${items.map(() => html`<div class="brutal-clp-skel h-12 w-full"></div>`)}
        <div class="sr-only">${this.gMsg.loading}</div>
      </div>
    `;
  }

  private brutalSections(): TemplateResult {
    const sections = this.getSlots('Section');
    return html`
      <div class="space-y-2">
        ${sections.map((el, index) => {
          const title = el.getAttribute('title') || '';
          const subtitle = el.getAttribute('subtitle') || '';
          const icon = el.getAttribute('icon') || '';
          const isDisabled = this.disabled || el.hasAttribute('disabled');
          const isOpen = this.x.openSections.has(index);
          const headerId = `${this.localName}-header-${index}`;
          const contentId = `${this.localName}-content-${index}`;

          return html`
            <div class="brutal-clp-section w-full ${isOpen ? 'is-open' : ''}">
              <div
                id=${headerId}
                role="button"
                tabindex=${isDisabled ? -1 : 0}
                aria-expanded=${isOpen ? 'true' : 'false'}
                aria-disabled=${isDisabled ? 'true' : 'false'}
                data-header="true"
                class=${this.brutalHeaderClasses(isOpen, isDisabled)}
                @click=${() => this.x.handleHeaderClick(index)}
                @keydown=${(e: KeyboardEvent) => this.x.handleHeaderKeydown(e, index)}
              >
                <div class="flex items-center gap-3">
                  ${icon ? html`<span class="brutal-clp-icon">${unsafeHTML(icon)}</span>` : html``}
                  <div class="flex flex-col">
                    <span class="brutal-clp-title text-sm font-bold">${title}</span>
                    ${subtitle ? html`<span class="brutal-clp-subtitle text-xs">${subtitle}</span>` : html``}
                  </div>
                </div>
                <span class=${this.brutalChevronClasses(isOpen)} aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
                    ${svg`<path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`}
                  </svg>
                </span>
              </div>
              <div id=${contentId} role="region" aria-labelledby=${headerId} class=${this.brutalContentClasses(isOpen)}>
                <div class="brutal-clp-body px-4 pb-4 pt-0 text-sm">${unsafeHTML(this.x.getSectionContent(el))}</div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private brutalHeaderClasses(isOpen: boolean, isDisabled: boolean): string {
    return [
      'brutal-clp-header flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
      isOpen ? 'is-open' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalChevronClasses(isOpen: boolean): string {
    return ['brutal-clp-chevron', isOpen ? 'rotate-180' : 'rotate-0'].join(' ');
  }

  private brutalContentClasses(isOpen: boolean): string {
    return [
      'overflow-hidden',
      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
    ].join(' ');
  }
}
