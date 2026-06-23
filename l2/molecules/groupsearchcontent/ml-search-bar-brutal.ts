/// <mls fileReference="_102054_/l2/molecules/groupsearchcontent/ml-search-bar-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML SEARCH BAR — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupSearchContent
// Herda MlSearchBarMolecule (mls-102040): debounce, eventos search/change/clear,
// navegacao por teclado, estado (query/isOpen/highlightIndex), sugestoes via slot.
// Sobrescreve apenas render() + helpers presentacionais com classes brutal.
// Adds portal for suggestions panel (base class has no portal infrastructure).
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult, render as litRender } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlSearchBarMolecule } from '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Search',
  loading: 'Loading...',
  noResults: 'No results found',
  clear: 'Clear search',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

type SuggestionItem = {
  value: string;
  labelHtml: string;
  labelText: string;
};

interface SearchBarInternals {
  query: string;
  isOpen: boolean;
  highlightIndex: number;
  handleInput(e: Event): void;
  handleFocus(): void;
  handleBlur(): void;
  handleKeyDown(e: KeyboardEvent): void;
  handleClearClick(): void;
  handleSuggestionClick(index: number): void;
  getSuggestions(): SuggestionItem[];
}

@customElement('groupsearchcontent--ml-search-bar-brutal')
export class MlSearchBarBrutal extends MlSearchBarMolecule {
  protected portalClassName = 'brutal-sb-portal';
  private bMsg: MessageType = messages.en;
  private bComponentId = `brutal-sb-${Math.random().toString(36).slice(2)}`;

  // --- Portal state ---
  private portalContainer: HTMLDivElement | null = null;

  private get x(): SearchBarInternals {
    return this as unknown as SearchBarInternals;
  }

  // ===========================================================================
  // PORTAL LIFECYCLE
  // ===========================================================================
  private createPortal(): void {
    if (this.portalContainer) return;
    this.portalContainer = document.createElement('div');
    if (this.portalClassName) {
      this.portalContainer.classList.add(this.portalClassName);
    }
    document.body.appendChild(this.portalContainer);
  }

  private destroyPortal(): void {
    if (!this.portalContainer) return;
    litRender(html``, this.portalContainer);
    this.portalContainer.remove();
    this.portalContainer = null;
  }

  private positionPortal(): void {
    if (!this.portalContainer) return;
    const rect = this.getBoundingClientRect();
    Object.assign(this.portalContainer.style, {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.bottom + 4}px`,
      width: `${rect.width}px`,
      zIndex: '99999',
    });
  }

  private renderPortal(): void {
    if (!this.portalContainer) return;
    litRender(this.getPortalTemplate(), this.portalContainer);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.destroyPortal();
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalInputClasses(): string {
    return [
      'brutal-sb-input w-full pl-10 pr-10 py-2 text-sm',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalSuggestionClasses(isActive: boolean): string {
    return [
      'brutal-sb-option w-full text-left px-3 py-2 text-sm',
      isActive ? 'is-active' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelId = `${this.bComponentId}-label`;
    return html`
      <label id=${labelId} class="brutal-sb-label block mb-1 text-sm">
        ${unsafeHTML(this.getSlotContent('Label'))}
      </label>
    `;
  }

  private brutalHelperOrError(): TemplateResult {
    if (this.error) {
      const errorId = `${this.bComponentId}-error`;
      return html`<p id=${errorId} class="brutal-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      const helperId = `${this.bComponentId}-helper`;
      return html`<p id=${helperId} class="brutal-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }

  protected getPortalTemplate(): TemplateResult {
    const x = this.x;
    const suggestions = x.getSuggestions();
    const hasSuggestions = suggestions.length > 0;
    const showEmpty = !this.loading && !hasSuggestions && x.query;

    return html`
      <div id=${`${this.bComponentId}-list`} class="brutal-sb-panel p-2 space-y-1" role="listbox">
        ${this.loading ? html`
          <div class="brutal-sb-muted px-3 py-2 text-sm">
            ${this.bMsg.loading}
          </div>
        ` : html``}
        ${hasSuggestions ? suggestions.map((item, index) => html`
          <button
            class=${this.brutalSuggestionClasses(index === x.highlightIndex)}
            role="option"
            aria-selected=${index === x.highlightIndex}
            ?disabled=${this.disabled}
            @mousedown=${(e: Event) => e.preventDefault()}
            @click=${() => x.handleSuggestionClick(index)}
          >
            ${unsafeHTML(item.labelHtml)}
          </button>
        `) : html``}
        ${showEmpty ? html`
          <div class="brutal-sb-muted px-3 py-2 text-sm">
            ${unsafeHTML(this.getSlotContent('Empty') || this.bMsg.noResults)}
          </div>
        ` : html``}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.bMsg = messages[lang];
    const x = this.x;

    // Manage portal lifecycle based on isOpen state
    if (x.isOpen) {
      this.createPortal();
      this.positionPortal();
      this.renderPortal();
    } else {
      this.destroyPortal();
    }

    const labelId = this.hasSlot('Label') ? `${this.bComponentId}-label` : undefined;
    const errorId = this.error ? `${this.bComponentId}-error` : undefined;
    const helperId = !this.error && this.hasSlot('Helper') ? `${this.bComponentId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
    const inputPlaceholder = this.placeholder || this.bMsg.placeholder;
    const showClear = !!x.query && !this.disabled;

    return html`
      <div class="w-full">
        ${this.brutalLabel()}
        <div class="relative">
          <span class="brutal-sb-icon absolute left-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              ${svg`<path d="M10.5 3a7.5 7.5 0 1 1-4.24 13.68l-3.97 3.97a1 1 0 1 1-1.42-1.42l3.97-3.97A7.5 7.5 0 0 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" fill="currentColor" />`}
            </svg>
          </span>
          <input
            class=${this.brutalInputClasses()}
            type="text"
            name=${this.name}
            .placeholder=${inputPlaceholder}
            .value=${x.query}
            ?disabled=${this.disabled}
            role="combobox"
            aria-expanded=${x.isOpen}
            aria-autocomplete="list"
            aria-controls=${`${this.bComponentId}-list`}
            aria-labelledby=${labelId || ''}
            aria-describedby=${describedBy || ''}
            aria-invalid=${this.error ? 'true' : 'false'}
            @input=${(e: Event) => x.handleInput(e)}
            @focus=${() => x.handleFocus()}
            @blur=${() => x.handleBlur()}
            @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e)}
          />
          ${showClear ? html`
            <button
              class="brutal-sb-clear absolute right-3 top-1/2 -translate-y-1/2"
              aria-label=${this.bMsg.clear}
              @mousedown=${(e: Event) => e.preventDefault()}
              @click=${() => x.handleClearClick()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                ${svg`<path d="M6.7 5.3a1 1 0 0 1 1.4 0L12 9.17l3.9-3.88a1 1 0 1 1 1.4 1.42L13.42 10.6l3.88 3.9a1 1 0 0 1-1.42 1.4L12 12.02l-3.9 3.88a1 1 0 1 1-1.4-1.42l3.88-3.9-3.88-3.88a1 1 0 0 1 0-1.4z" fill="currentColor" />`}
              </svg>
            </button>
          ` : html``}
        </div>
        ${this.brutalHelperOrError()}
      </div>
    `;
  }
}
