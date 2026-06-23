/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-tabs-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TABS — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSection
// Herda MlTabsMolecule (mls-102040): parse de slots Tab, tab ativa, roving
// tabindex, click/keyboard e estado (uid). Sobrescreve apenas render() e os
// helpers de aparência (brutal-prefix).
// This molecule does NOT contain business logic.
import { html, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlTabsMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-tabs.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
  empty: 'No tabs available',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
    empty: 'Nenhuma aba disponível',
  },
};
/// **collab_i18n_end**

interface TabItem {
  value: string;
  title: string;
  icon: string;
  disabled: boolean;
  content: string;
}

interface TabsInternals {
  uid: string;
  handleTabClick(tab: TabItem, activeValue: string | null): void;
  handleKeyDown(event: KeyboardEvent): void;
  parseTabs(): TabItem[];
  getActiveValue(tabs: TabItem[]): string | null;
  toSafeId(value: string): string;
}

@customElement('groupnavigatesection--ml-tabs-brutal')
export class MlTabsBrutal extends MlTabsMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): TabsInternals {
    return this as unknown as TabsInternals;
  }

  // ===========================================================================
  // HELPERS DE APARÊNCIA (brutal)
  // ===========================================================================
  private brutalTabClasses(isActive: boolean, isDisabled: boolean): string {
    return ['brutal-tab', 'inline-flex items-center gap-2 px-4 py-2 text-sm font-bold', isActive ? 'is-active' : '', isDisabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private brutalTabListClasses(): string {
    return 'brutal-tablist flex flex-wrap gap-0';
  }

  private brutalPanelClasses(): string {
    return 'brutal-tab-panel mt-0 p-4';
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div id="${this.x.uid}-label" class="brutal-nav-label mb-2 text-sm font-bold">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private brutalLoading(): TemplateResult {
    return html`<div class="brutal-nav-box p-4 text-sm">${this.gMsg.loading}</div>`;
  }

  private brutalError(): TemplateResult {
    if (!this.error) return html``;
    return html`<p class="brutal-error-text mt-2 text-xs">${unsafeHTML(String(this.error))}</p>`;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (this.loading) {
      return html`<div class="w-full">${this.brutalLabel()} ${this.brutalLoading()}</div>`;
    }

    const tabs = x.parseTabs();
    if (tabs.length === 0) {
      return html`
        <div class="w-full">${this.brutalLabel()}<div class="brutal-nav-box p-4 text-sm">${this.gMsg.empty}</div></div>
      `;
    }

    const activeValue = x.getActiveValue(tabs);
    const activeTab = tabs.find((t) => t.value === activeValue) || null;
    const labelId = this.hasSlot('Label') ? `${x.uid}-label` : undefined;

    return html`
      <div class="w-full">
        ${this.brutalLabel()}
        <div class="${this.brutalTabListClasses()}" role="tablist" aria-labelledby="${labelId || nothing}" @keydown="${(e: KeyboardEvent) => x.handleKeyDown(e)}">
          ${tabs.map((tab) => {
            const isActive = tab.value === activeValue;
            const isDisabled = this.disabled || this.loading || tab.disabled;
            const tabId = `${x.uid}-tab-${x.toSafeId(tab.value)}`;
            const panelId = `${x.uid}-panel-${x.toSafeId(tab.value)}`;
            return html`
              <button
                id="${tabId}"
                data-tab-button
                data-value="${tab.value}"
                class="${this.brutalTabClasses(isActive, isDisabled)}"
                role="tab"
                type="button"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-disabled="${isDisabled ? 'true' : 'false'}"
                aria-controls="${panelId}"
                tabindex="${isActive ? '0' : '-1'}"
                @click="${() => x.handleTabClick(tab, activeValue)}"
              >
                ${tab.icon ? html`<span class="text-base">${unsafeHTML(tab.icon)}</span>` : nothing}
                <span>${unsafeHTML(tab.title)}</span>
              </button>
            `;
          })}
        </div>

        ${activeTab
          ? html`
              <div
                id="${x.uid}-panel-${x.toSafeId(activeTab.value)}"
                class="${this.brutalPanelClasses()}"
                role="tabpanel"
                aria-labelledby="${x.uid}-tab-${x.toSafeId(activeTab.value)}"
              >
                ${unsafeHTML(activeTab.content)}
              </div>
            `
          : html``}
        ${this.brutalError()}
      </div>
    `;
  }
}
