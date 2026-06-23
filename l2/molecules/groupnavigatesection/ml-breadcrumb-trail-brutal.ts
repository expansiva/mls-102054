/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BREADCRUMB TRAIL — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSection
// Herda BreadcrumbTrailMolecule (mls-102040): parse de slots Tab, valor ativo,
// overflow no mobile, click/keyboard e estado (isOverflowOpen). Sobrescreve apenas
// render() e os helpers de aparência (brutal-prefix).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BreadcrumbTrailMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
  overflow: 'More levels',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
    overflow: 'Mais níveis',
  },
};
/// **collab_i18n_end**

type ParsedTab = {
  value: string;
  title: string;
  icon: string;
  disabled: boolean;
  content: string;
  index: number;
  isLast: boolean;
};

interface BreadcrumbInternals {
  isOverflowOpen: boolean;
  getTabs(): ParsedTab[];
  getActiveValue(tabs: ParsedTab[]): string | null;
  handleTabClick(tab: ParsedTab, closeOverflow?: boolean): void;
  handleOverflowToggle(): void;
}

@customElement('groupnavigatesection--ml-breadcrumb-trail-brutal')
export class BreadcrumbTrailBrutal extends BreadcrumbTrailMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): BreadcrumbInternals {
    return this as unknown as BreadcrumbInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalTabClasses(isActive: boolean, disabled: boolean, interactive: boolean): string {
    return ['brutal-bc-item', 'inline-flex items-center gap-1 px-1.5 py-0.5 text-sm whitespace-nowrap', isActive ? 'is-active' : '', interactive ? 'is-interactive' : '', disabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private brutalDelimiterClasses(): string {
    return 'brutal-bc-sep mx-1 select-none';
  }

  private brutalOverflowButtonClasses(): string {
    return ['brutal-bc-overflow-btn', 'inline-flex items-center px-1.5 py-0.5 text-sm whitespace-nowrap', this.disabled || this.loading ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private brutalPanelClasses(): string {
    return 'brutal-bc-panel pt-2 text-sm';
  }

  private brutalLabelClasses(): string {
    return 'brutal-bc-label block text-xs font-bold mb-1';
  }

  private brutalErrorClasses(): string {
    return 'brutal-error-text pt-1 text-xs';
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalRenderTab(tab: ParsedTab, activeValue: string | null): TemplateResult {
    const isActive = tab.value === activeValue;
    const interactive = !tab.isLast && !tab.disabled && !this.disabled && !this.loading;
    if (tab.isLast) {
      return html`
        <span class="${this.brutalTabClasses(isActive, tab.disabled, false)}" role="tab" aria-selected="${isActive}" aria-disabled="true">
          ${tab.icon ? html`<span class="text-base">${tab.icon}</span>` : ''}
          <span>${tab.title}</span>
        </span>
      `;
    }
    return html`
      <button
        class="${this.brutalTabClasses(isActive, tab.disabled || this.disabled || this.loading, interactive)}"
        role="tab"
        aria-selected="${isActive}"
        aria-disabled="${tab.disabled || this.disabled || this.loading}"
        ?disabled=${tab.disabled || this.disabled || this.loading}
        data-tab-button="true"
        @click=${() => this.x.handleTabClick(tab)}
      >
        ${tab.icon ? html`<span class="text-base">${tab.icon}</span>` : ''}
        <span>${tab.title}</span>
      </button>
    `;
  }

  private brutalRenderOverflowMenu(hiddenTabs: ParsedTab[], activeValue: string | null): TemplateResult {
    if (!hiddenTabs.length) return html``;
    return html`
      <div class="relative inline-flex items-center">
        <button
          class="${this.brutalOverflowButtonClasses()}"
          aria-label="${this.gMsg.overflow}"
          ?disabled=${this.disabled || this.loading}
          @click=${() => this.x.handleOverflowToggle()}
        >
          ...
        </button>
        ${this.x.isOverflowOpen
          ? html`
              <div class="brutal-bc-menu absolute left-0 top-full mt-1 w-48 z-10">
                <div class="p-1">
                  ${hiddenTabs.map(
                    (tab) => html`
                      <button
                        class="${this.brutalTabClasses(tab.value === activeValue, tab.disabled || this.disabled || this.loading, !tab.disabled)} w-full justify-start"
                        role="tab"
                        aria-selected="${tab.value === activeValue}"
                        aria-disabled="${tab.disabled || this.disabled || this.loading}"
                        ?disabled=${tab.disabled || this.disabled || this.loading}
                        data-tab-button="true"
                        @click=${() => this.x.handleTabClick(tab, true)}
                      >
                        ${tab.icon ? html`<span class="text-base">${tab.icon}</span>` : ''}
                        <span>${tab.title}</span>
                      </button>
                    `
                  )}
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private brutalRenderTrail(tabs: ParsedTab[], activeValue: string | null): TemplateResult {
    if (!tabs.length) return html``;
    const first = tabs[0];
    const last = tabs[tabs.length - 1];
    const middle = tabs.slice(1, tabs.length - 1);
    return html`
      <div class="flex items-center whitespace-nowrap" role="tablist">
        <div class="flex items-center sm:hidden">
          ${this.brutalRenderTab(first, activeValue)}
          <span class="${this.brutalDelimiterClasses()}">/</span>
          ${this.brutalRenderOverflowMenu(middle, activeValue)}
          <span class="${this.brutalDelimiterClasses()}">/</span>
          ${this.brutalRenderTab(last, activeValue)}
        </div>
        <div class="hidden sm:flex items-center">
          ${tabs.map(
            (tab, index) => html`
              ${index > 0 ? html`<span class="${this.brutalDelimiterClasses()}">/</span>` : ''} ${this.brutalRenderTab(tab, activeValue)}
            `
          )}
        </div>
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
    const tabs = x.getTabs();
    const activeValue = x.getActiveValue(tabs);
    const activeTab = tabs.find((tab) => tab.value === activeValue) || tabs[0];
    const labelContent = this.hasSlot('Label') ? this.getSlotContent('Label') : '';
    const activeContent = activeTab ? activeTab.content : '';
    return html`
      <div class="w-full">
        ${labelContent ? html`<span class="${this.brutalLabelClasses()}">${unsafeHTML(labelContent)}</span>` : ''}
        <div class="relative">
          ${this.loading ? html`<div class="brutal-bc-muted text-sm">${this.gMsg.loading}</div>` : this.brutalRenderTrail(tabs, activeValue)}
        </div>
        <div class="${this.brutalPanelClasses()}" role="tabpanel">${activeContent ? unsafeHTML(activeContent) : ''}</div>
        ${this.error ? html`<div class="${this.brutalErrorClasses()}">${unsafeHTML(this.error)}</div>` : ''}
      </div>
    `;
  }
}
