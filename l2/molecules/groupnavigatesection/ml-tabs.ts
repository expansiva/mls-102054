/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-tabs.ts" enhancement="_102020_/l2/enhancementAura" />


// =============================================================================
// GROUP NAVIGATE SECTION — TABS MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSection
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, state } from 'lit/decorators.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

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

@customElement('groupnavigatesection--ml-tabs')
export class MlTabsMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;

  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Label', 'Tab'];

  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: String })
  value: string | null = null;

  @propertyDataSource({ type: String })
  error: string = '';

  @propertyDataSource({ type: Boolean })
  disabled = false;

  @propertyDataSource({ type: Boolean })
  loading = false;

  // ===========================================================================
  // INTERNAL STATE
  // ===========================================================================
  @state()
  private uid = `tabs-${Math.random().toString(36).slice(2, 10)}`;

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleTabClick(tab: TabItem, activeValue: string | null) {
    if (this.disabled || this.loading || tab.disabled) return;
    if (activeValue === tab.value) return;
    this.value = tab.value;
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, composed: true, detail: { value: tab.value, title: tab.title } })
    );
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.loading) return;
    const tabs = this.parseTabs();
    if (tabs.length === 0) return;

    const activeValue = this.getActiveValue(tabs);
    const enabledTabs = tabs.filter((t) => !t.disabled);
    if (enabledTabs.length === 0) return;

    const buttons = Array.from(this.querySelectorAll('[data-tab-button]')) as HTMLButtonElement[];
    const enabledButtons = buttons.filter((btn) => btn.getAttribute('aria-disabled') !== 'true');

    const currentIndexByFocus = enabledButtons.indexOf(document.activeElement as HTMLButtonElement);
    const currentIndexByActive = enabledTabs.findIndex((t) => t.value === activeValue);
    const currentIndex = currentIndexByFocus >= 0 ? currentIndexByFocus : currentIndexByActive;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1 + enabledButtons.length) % enabledButtons.length;
      enabledButtons[nextIndex]?.focus();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + enabledButtons.length) % enabledButtons.length;
      enabledButtons[prevIndex]?.focus();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const focused = document.activeElement as HTMLButtonElement | null;
      if (!focused) return;
      const tabValue = focused.getAttribute('data-value');
      const tab = tabs.find((t) => t.value === tabValue);
      if (tab) this.handleTabClick(tab, activeValue);
    }
  }

  // ===========================================================================
  // HELPERS
  // ===========================================================================
  private parseTabs(): TabItem[] {
    return this.getSlots('Tab').map((el) => ({
      value: el.getAttribute('value') || '',
      title: el.getAttribute('title') || '',
      icon: el.getAttribute('icon') || '',
      disabled: el.hasAttribute('disabled'),
      content: el.innerHTML,
    }));
  }

  private getActiveValue(tabs: TabItem[]): string | null {
    if (tabs.length === 0) return null;
    const found = tabs.find((t) => t.value === this.value);
    if (found && !found.disabled) return found.value;
    const firstEnabled = tabs.find((t) => !t.disabled);
    return firstEnabled ? firstEnabled.value : null;
  }

  private toSafeId(value: string): string {
    return value.replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  // aparência = classes glass; layout = Tailwind
  private getTabClasses(isActive: boolean, isDisabled: boolean): string {
    return [
      'glass-tab',
      'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium',
      isActive ? 'is-active' : '',
      isDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getTabListClasses(): string {
    return 'glass-tablist flex flex-wrap gap-2';
  }

  private getPanelClasses(): string {
    return 'glass-tab-panel mt-4 p-4';
  }

  private renderLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div id="${this.uid}-label" class="glass-nav-label mb-2 text-sm font-semibold">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private renderLoading(): TemplateResult {
    return html`<div class="glass-nav-box p-4 text-sm">${this.msg.loading}</div>`;
  }

  private renderError(): TemplateResult {
    if (!this.error) return html``;
    return html`<p class="glass-error-text mt-2 text-xs">${unsafeHTML(String(this.error))}</p>`;
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    if (this.loading) {
      return html`<div class="w-full">${this.renderLabel()} ${this.renderLoading()}</div>`;
    }

    const tabs = this.parseTabs();
    if (tabs.length === 0) {
      return html`
        <div class="w-full">${this.renderLabel()}<div class="glass-nav-box p-4 text-sm">${this.msg.empty}</div></div>
      `;
    }

    const activeValue = this.getActiveValue(tabs);
    const activeTab = tabs.find((t) => t.value === activeValue) || null;
    const labelId = this.hasSlot('Label') ? `${this.uid}-label` : undefined;

    return html`
      <div class="w-full">
        ${this.renderLabel()}
        <div class="${this.getTabListClasses()}" role="tablist" aria-labelledby="${labelId || nothing}" @keydown="${this.handleKeyDown}">
          ${tabs.map((tab) => {
            const isActive = tab.value === activeValue;
            const isDisabled = this.disabled || this.loading || tab.disabled;
            const tabId = `${this.uid}-tab-${this.toSafeId(tab.value)}`;
            const panelId = `${this.uid}-panel-${this.toSafeId(tab.value)}`;
            return html`
              <button
                id="${tabId}"
                data-tab-button
                data-value="${tab.value}"
                class="${this.getTabClasses(isActive, isDisabled)}"
                role="tab"
                type="button"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-disabled="${isDisabled ? 'true' : 'false'}"
                aria-controls="${panelId}"
                tabindex="${isActive ? '0' : '-1'}"
                @click="${() => this.handleTabClick(tab, activeValue)}"
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
                id="${this.uid}-panel-${this.toSafeId(activeTab.value)}"
                class="${this.getPanelClasses()}"
                role="tabpanel"
                aria-labelledby="${this.uid}-tab-${this.toSafeId(activeTab.value)}"
              >
                ${unsafeHTML(activeTab.content)}
              </div>
            `
          : html``}
        ${this.renderError()}
      </div>
    `;
  }
}
