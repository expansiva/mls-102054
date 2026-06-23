/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/ml-reveal-overlay-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// REVEAL OVERLAY — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupExpandContent
// Herda toda a lógica de RevealOverlayMolecule (mls-102040): estado de seções
// abertas (openSections), toggle, navegação por teclado e inicialização no
// firstUpdated. Sobrescreve apenas render() e os helpers de classe (brutal).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { RevealOverlayMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-reveal-overlay.js';

/// **collab_i18n_start**
const message_en = {
  reveal: 'Reveal',
  hide: 'Hide',
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

interface RevealOverlayInternals {
  openSections: Set<number>;
  handleToggle(index: number, title: string, sectionDisabled: boolean): void;
  handleHeaderKeydown(e: KeyboardEvent, index: number, title: string, sectionDisabled: boolean): void;
}

@customElement('groupexpandcontent--ml-reveal-overlay-brutal')
export class MlRevealOverlayBrutal extends RevealOverlayMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): RevealOverlayInternals {
    return this as unknown as RevealOverlayInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalHeaderClasses(sectionDisabled: boolean): string {
    return [
      'brutal-reveal-header',
      'w-full flex items-center justify-between px-4 py-3 text-sm font-bold',
      this.disabled || sectionDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalContainerClasses(sectionDisabled: boolean): string {
    return ['brutal-reveal-container', 'relative mt-2', this.disabled || sectionDisabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private brutalOverlayClasses(expanded: boolean, sectionDisabled: boolean): string {
    return [
      'brutal-reveal-overlay',
      'absolute inset-0 flex items-center justify-center',
      expanded ? 'is-open' : '',
      this.disabled || sectionDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalActionButtonClasses(sectionDisabled: boolean): string {
    return ['brutal-reveal-btn', 'px-4 py-2 text-sm font-bold', this.disabled || sectionDisabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalRenderLoading(): TemplateResult {
    return html`<div class="brutal-reveal-loading p-4 text-sm">${this.gMsg.loading}</div>`;
  }

  private brutalRenderSectionContent(content: string): TemplateResult {
    return html`<div class="brutal-reveal-content relative p-4 text-sm">${unsafeHTML(content)}</div>`;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (this.loading) {
      return this.brutalRenderLoading();
    }

    const warning = this.hasSlot('Label') ? this.getSlotContent('Label') : '';
    const sections = this.getSlots('Section').map((el, index) => ({
      index,
      title: el.getAttribute('title') || '',
      content: el.innerHTML || '',
      sectionDisabled: el.hasAttribute('disabled'),
      expanded: x.openSections.has(index),
    }));

    return html`
      <div class="space-y-4">
        ${sections.map((section) => {
          const headerId = `brutal-reveal-header-${section.index}`;
          const regionId = `brutal-reveal-region-${section.index}`;
          const actionLabel = section.expanded
            ? `${this.gMsg.hide} ${section.title}`
            : `${this.gMsg.reveal} ${section.title}`;
          return html`
            <div>
              <button
                id=${headerId}
                class=${this.brutalHeaderClasses(section.sectionDisabled)}
                role="button"
                aria-expanded=${section.expanded ? 'true' : 'false'}
                aria-controls=${regionId}
                aria-disabled=${this.disabled || section.sectionDisabled ? 'true' : 'false'}
                data-header="true"
                data-index=${section.index}
                tabindex=${this.disabled || section.sectionDisabled ? '-1' : '0'}
                @click=${() => x.handleToggle(section.index, section.title, section.sectionDisabled)}
                @keydown=${(e: KeyboardEvent) =>
                  x.handleHeaderKeydown(e, section.index, section.title, section.sectionDisabled)}
              >
                <span>${section.title}</span>
                <span class="brutal-reveal-action">${actionLabel}</span>
              </button>
              ${warning
                ? html`<div class="brutal-reveal-warning mt-2 px-4 py-3 text-sm">${unsafeHTML(warning)}</div>`
                : html``}
              <div id=${regionId} class=${this.brutalContainerClasses(section.sectionDisabled)} role="region" aria-labelledby=${headerId}>
                ${this.brutalRenderSectionContent(section.content)}
                <div class=${this.brutalOverlayClasses(section.expanded, section.sectionDisabled)}>
                  <button
                    class=${this.brutalActionButtonClasses(section.sectionDisabled)}
                    @click=${() => x.handleToggle(section.index, section.title, section.sectionDisabled)}
                    ?disabled=${this.disabled || section.sectionDisabled}
                  >
                    ${actionLabel}
                  </button>
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
