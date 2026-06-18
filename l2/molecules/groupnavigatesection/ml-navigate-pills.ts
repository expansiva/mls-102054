/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-navigate-pills.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NAVIGATE PILLS MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSection
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators.js';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

interface NavigateTab {
  value: string;
  title: string;
  icon: string;
  disabled: boolean;
  content: string;
}

@customElement('groupnavigatesection--ml-navigate-pills')
export class NavigatePillsMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;
  private instanceId = `nav-${Math.random().toString(36).slice(2, 8)}`;

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
  private lastActiveIndex = -1;

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleTabClick(tab: NavigateTab) {
    if (this.disabled || this.loading || tab.disabled) return;
    this.value = tab.value;
    this.dispatchChange(tab);
  }

  private handleKeyDown(e: KeyboardEvent, index: number, tabs: NavigateTab[]) {
    if (this.disabled || this.loading) return;
    const key = e.key;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Enter' && key !== ' ') return;

    const enabledIndices = tabs
      .map((t, i) => ({ t, i }))
      .filter(({ t }) => !t.disabled)
      .map(({ i }) => i);

    if (enabledIndices.length === 0) return;

    if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      const tab = tabs[index];
      if (tab && !tab.disabled) {
        this.value = tab.value;
        this.dispatchChange(tab);
      }
      return;
    }

    e.preventDefault();
    const currentPos = enabledIndices.indexOf(index);
    if (currentPos === -1) return;
    let nextIndex = index;
    if (key === 'ArrowRight') {
      nextIndex = enabledIndices[(currentPos + 1) % enabledIndices.length];
    } else if (key === 'ArrowLeft') {
      nextIndex = enabledIndices[(currentPos - 1 + enabledIndices.length) % enabledIndices.length];
    }
    this.focusTabButton(nextIndex);
  }

  private focusTabButton(index: number) {
    const button = this.querySelector<HTMLButtonElement>(`[data-tab-index="${index}"]`);
    if (button) button.focus();
  }

  private dispatchChange(tab: NavigateTab) {
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, composed: true, detail: { value: tab.value, title: tab.title } })
    );
  }

  // ===========================================================================
  // HELPERS
  // ===========================================================================
  private getTabs(): NavigateTab[] {
    return this.getSlots('Tab')
      .map((el) => ({
        value: el.getAttribute('value') || '',
        title: el.getAttribute('title') || '',
        icon: el.getAttribute('icon') || '',
        disabled: el.hasAttribute('disabled'),
        content: el.innerHTML || '',
      }))
      .filter((tab) => tab.value && tab.title);
  }

  private getActiveIndex(tabs: NavigateTab[]): number {
    if (tabs.length === 0) return -1;
    const explicitIndex = this.value ? tabs.findIndex((t) => t.value === this.value && !t.disabled) : -1;
    if (explicitIndex !== -1) return explicitIndex;
    const firstAvailable = tabs.findIndex((t) => !t.disabled);
    return firstAvailable;
  }

  private getTabClasses(isActive: boolean, isDisabled: boolean): string {
    return [
      'glass-pill',
      'flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap',
      isActive ? 'is-active' : '',
      isDisabled || this.disabled || this.loading ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private renderLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelContent = this.getSlotContent('Label');
    return html`<div class="glass-nav-label mb-2 text-sm font-semibold">${unsafeHTML(labelContent)}</div>`;
  }

  private renderLoading(): TemplateResult {
    return html`
      <div class="space-y-2">
        ${this.renderLabel()}
        <div class="glass-nav-loading flex items-center gap-2 px-4 py-3 text-sm">${this.msg.loading}</div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];

    if (this.loading) {
      return this.renderLoading();
    }

    const tabs = this.getTabs();
    const activeIndex = this.getActiveIndex(tabs);
    this.lastActiveIndex = activeIndex;
    const activeTab = activeIndex >= 0 ? tabs[activeIndex] : null;

    return html`
      <div class="w-full">
        ${this.renderLabel()}
        <div
          class="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="${this.hasSlot('Label') ? this.getSlotContent('Label') : 'Navigation'}"
        >
          ${tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const isDisabled = tab.disabled;
            const tabId = `${this.instanceId}-tab-${index}`;
            const panelId = `${this.instanceId}-panel-${index}`;
            return html`
              <button
                class="${this.getTabClasses(isActive, isDisabled)}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-disabled="${isDisabled || this.disabled || this.loading ? 'true' : 'false'}"
                aria-controls="${panelId}"
                id="${tabId}"
                data-tab-index="${index}"
                ?disabled=${isDisabled || this.disabled || this.loading}
                @click=${() => this.handleTabClick(tab)}
                @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, index, tabs)}
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
                class="glass-pill-panel mt-4 p-4"
                role="tabpanel"
                id="${this.instanceId}-panel-${activeIndex}"
                aria-labelledby="${this.instanceId}-tab-${activeIndex}"
              >
                ${unsafeHTML(activeTab.content)}
              </div>
            `
          : html``}
        ${this.error ? html`<p class="glass-error-text mt-2 text-xs">${unsafeHTML(this.error)}</p>` : html``}
      </div>
    `;
  }
}
