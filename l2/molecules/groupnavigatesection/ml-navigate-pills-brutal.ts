/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-navigate-pills-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NAVIGATE PILLS — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSection
// Herda NavigatePillsMolecule (mls-102040): parse de slots Tab, índice ativo,
// click/keyboard e estado (instanceId/lastActiveIndex). Sobrescreve apenas
// render() e os helpers de aparência (brutal-prefix).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { NavigatePillsMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
  },
};
/// **collab_i18n_end**

interface NavigateTab {
  value: string;
  title: string;
  icon: string;
  disabled: boolean;
  content: string;
}

interface NavigatePillsInternals {
  instanceId: string;
  lastActiveIndex: number;
  handleTabClick(tab: NavigateTab): void;
  handleKeyDown(e: KeyboardEvent, index: number, tabs: NavigateTab[]): void;
  getTabs(): NavigateTab[];
  getActiveIndex(tabs: NavigateTab[]): number;
}

@customElement('groupnavigatesection--ml-navigate-pills-brutal')
export class NavigatePillsBrutal extends NavigatePillsMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): NavigatePillsInternals {
    return this as unknown as NavigatePillsInternals;
  }

  // ===========================================================================
  // HELPERS DE APARÊNCIA (brutal)
  // ===========================================================================
  private brutalTabClasses(isActive: boolean, isDisabled: boolean): string {
    return ['brutal-pill', 'flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap', isActive ? 'is-active' : '', isDisabled || this.disabled || this.loading ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelContent = this.getSlotContent('Label');
    return html`<div class="brutal-nav-label mb-2 text-sm font-bold">${unsafeHTML(labelContent)}</div>`;
  }

  private brutalLoading(): TemplateResult {
    return html`
      <div class="space-y-2">
        ${this.brutalLabel()}
        <div class="brutal-nav-loading flex items-center gap-2 px-4 py-3 text-sm">${this.gMsg.loading}</div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (this.loading) {
      return this.brutalLoading();
    }

    const tabs = x.getTabs();
    const activeIndex = x.getActiveIndex(tabs);
    x.lastActiveIndex = activeIndex;
    const activeTab = activeIndex >= 0 ? tabs[activeIndex] : null;

    return html`
      <div class="w-full">
        ${this.brutalLabel()}
        <div
          class="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="${this.hasSlot('Label') ? this.getSlotContent('Label') : 'Navigation'}"
        >
          ${tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const isDisabled = tab.disabled;
            const tabId = `${x.instanceId}-tab-${index}`;
            const panelId = `${x.instanceId}-panel-${index}`;
            return html`
              <button
                class="${this.brutalTabClasses(isActive, isDisabled)}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-disabled="${isDisabled || this.disabled || this.loading ? 'true' : 'false'}"
                aria-controls="${panelId}"
                id="${tabId}"
                data-tab-index="${index}"
                ?disabled=${isDisabled || this.disabled || this.loading}
                @click=${() => x.handleTabClick(tab)}
                @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e, index, tabs)}
              >
                ${tab.icon ? html`<span class="text-base">${unsafeHTML(tab.icon)}</span>` : html``}
                <span>${unsafeHTML(tab.title)}</span>
              </button>
            `;
          })}
        </div>
        ${activeTab
          ? html`
              <div
                class="brutal-pill-panel mt-0 p-4"
                role="tabpanel"
                id="${x.instanceId}-panel-${activeIndex}"
                aria-labelledby="${x.instanceId}-tab-${activeIndex}"
              >
                ${unsafeHTML(activeTab.content)}
              </div>
            `
          : html``}
        ${this.error ? html`<p class="brutal-error-text mt-2 text-xs">${unsafeHTML(this.error)}</p>` : html``}
      </div>
    `;
  }
}
