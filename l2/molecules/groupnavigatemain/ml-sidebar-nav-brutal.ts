/// <mls fileReference="_102054_/l2/molecules/groupnavigatemain/ml-sidebar-nav-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML SIDEBAR NAV — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNavigateMain
// Herda toda a lógica de MlSidebarNavMolecule (mls-102040): parse de slots
// (Item/Group/Footer), estado de grupos colapsados, handlers de clique/colapso e
// classes de item/ícone. Sobrescreve apenas render() + helpers presentacionais
// (prefixados brutal). This molecule does NOT contain business logic.
import { html, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlSidebarNavMolecule } from '/_102040_/l2/molecules/groupnavigatemain/ml-sidebar-nav.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
  collapse: 'Collapse sidebar',
  expand: 'Expand sidebar',
  navigation: 'Sidebar navigation',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
    collapse: 'Recolher menu',
    expand: 'Expandir menu',
    navigation: 'Menu lateral',
  },
};
/// **collab_i18n_end**

interface NavItem {
  value: string;
  label: string;
  icon: string;
  badge: string | null;
  disabled: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface SidebarNavInternals {
  collapsedGroups: Set<string>;
  parseTopItems(): NavItem[];
  parseGroups(): NavGroup[];
  parseFooterItems(): NavItem[];
  handleItemClick(item: NavItem): void;
  handleToggleCollapse(): void;
  handleToggleGroup(groupLabel: string): void;
}

@customElement('groupnavigatemain--ml-sidebar-nav-brutal')
export class MlSidebarNavBrutal extends MlSidebarNavMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): SidebarNavInternals {
    return this as unknown as SidebarNavInternals;
  }

  // ===========================================================================
  // CLASS HELPERS (brutal)
  // ===========================================================================
  private brutalItemClasses(item: NavItem): string {
    const isActive = this.value === item.value;
    const isDisabled = this.disabled || item.disabled;
    return [
      'brutal-nav-item',
      'group relative flex w-full items-center gap-3 px-3 py-2 text-sm font-bold',
      isActive ? 'is-active' : '',
      isDisabled ? 'is-disabled' : '',
      this.collapsed ? 'justify-center' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalIconClasses(item: NavItem): string {
    const isActive = this.value === item.value;
    return ['brutal-nav-icon flex h-5 w-5 flex-shrink-0 items-center justify-center', isActive ? 'is-active' : '']
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalItemIcon(item: NavItem): TemplateResult {
    if (item.icon) {
      return html`<span class=${this.brutalIconClasses(item)}>${unsafeHTML(item.icon)}</span>`;
    }
    const initials = item.label.trim().slice(0, 2).toUpperCase();
    return html`<span class="${this.brutalIconClasses(item)} brutal-nav-initials text-xs font-bold">${initials}</span>`;
  }

  private brutalNavItem(item: NavItem): TemplateResult {
    const x = this.x;
    const isActive = this.value === item.value;
    const isDisabled = this.disabled || item.disabled;

    return html`
      <button
        class=${this.brutalItemClasses(item)}
        type="button"
        title=${this.collapsed ? item.label : ''}
        aria-current=${isActive ? 'page' : nothing}
        aria-disabled=${isDisabled ? 'true' : 'false'}
        @click=${() => x.handleItemClick(item)}
      >
        ${this.brutalItemIcon(item)}
        ${!this.collapsed
          ? html`
              <span class="flex-1 truncate text-left">${item.label}</span>
              ${item.badge ? html`<span class="brutal-nav-badge ml-auto inline-flex items-center px-2 py-0.5 text-xs font-bold">${item.badge}</span>` : nothing}
            `
          : html`${item.badge ? html`<span class="brutal-nav-dot absolute right-1.5 top-1.5 h-2 w-2"></span>` : nothing}`}
      </button>
    `;
  }

  private brutalGroup(group: NavGroup): TemplateResult {
    const x = this.x;
    if (this.collapsed) {
      return html`
        <div class="space-y-1">
          <div class="brutal-sidebar-divider mx-3 my-2 h-px"></div>
          ${group.items.map((item) => this.brutalNavItem(item))}
        </div>
      `;
    }

    const isGroupCollapsed = x.collapsedGroups.has(group.label);

    return html`
      <div class="space-y-1">
        ${group.label
          ? html`
              <button class="brutal-group-label flex w-full items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider" type="button" @click=${() => x.handleToggleGroup(group.label)}>
                <span class="truncate">${group.label}</span>
                <svg class="ml-2 h-3 w-3 flex-shrink-0 ${isGroupCollapsed ? '' : 'rotate-90'}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </button>
              ${!isGroupCollapsed ? html`<div class="space-y-1">${group.items.map((item) => this.brutalNavItem(item))}</div>` : nothing}
            `
          : html`<div class="space-y-1">${group.items.map((item) => this.brutalNavItem(item))}</div>`}
      </div>
    `;
  }

  private brutalCollapseToggle(): TemplateResult {
    const x = this.x;
    return html`
      <button class="brutal-collapse-btn flex items-center justify-center p-1.5" type="button" aria-label=${this.collapsed ? this.gMsg.expand : this.gMsg.collapse} @click=${() => x.handleToggleCollapse()}>
        <svg class="h-4 w-4 ${this.collapsed ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    `;
  }

  private brutalLoading(): TemplateResult {
    return html`
      <div class="space-y-1">
        ${[1, 2, 3, 4].map(
          () => html`
            <div class="flex items-center gap-3 px-3 py-2">
              <div class="brutal-skeleton h-5 w-5 flex-shrink-0"></div>
              ${!this.collapsed ? html`<div class="brutal-skeleton h-3 w-28"></div>` : nothing}
            </div>
          `
        )}
        <div class="brutal-sidebar-divider mx-3 my-3 h-px"></div>
        ${[1, 2].map(
          () => html`
            <div class="flex items-center gap-3 px-3 py-2">
              <div class="brutal-skeleton h-5 w-5 flex-shrink-0"></div>
              ${!this.collapsed ? html`<div class="brutal-skeleton h-3 w-20"></div>` : nothing}
            </div>
          `
        )}
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

    const labelContent = this.hasSlot('Label') ? this.getSlotContent('Label') : '';
    const topItems = x.parseTopItems();
    const groups = x.parseGroups();
    const footerItems = x.parseFooterItems();

    const sidebarWidth = this.collapsed ? 'w-16' : 'w-64';

    return html`
      <nav class="brutal-sidebar ${sidebarWidth} flex h-full flex-col overflow-hidden" aria-label=${labelContent || this.gMsg.navigation}>
        <div class="brutal-sidebar-header flex min-h-[56px] items-center justify-between px-3 py-3">
          ${!this.collapsed && labelContent ? html`<span class="brutal-sidebar-title truncate text-sm font-bold">${unsafeHTML(labelContent)}</span>` : html`<span></span>`}
          ${this.brutalCollapseToggle()}
        </div>

        <div class="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          ${this.loading ? this.brutalLoading() : html` ${topItems.map((item) => this.brutalNavItem(item))} ${groups.map((group) => this.brutalGroup(group))} `}
        </div>

        ${footerItems.length > 0
          ? html`<div class="brutal-sidebar-footer px-2 py-3 space-y-1">${footerItems.map((item) => this.brutalNavItem(item))}</div>`
          : nothing}
      </nav>
    `;
  }
}
