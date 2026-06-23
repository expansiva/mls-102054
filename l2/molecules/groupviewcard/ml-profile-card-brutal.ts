/// <mls fileReference="_102054_/l2/molecules/groupviewcard/ml-profile-card-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML PROFILE CARD — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupViewCard
// Herda MlProfileCardMolecule (mls-102040): estados (clickable/selected/disabled/
// loading), evento 'cardClick', modo de edicao propagado a filhos (lifecycle).
// Sobrescreve so render() + helpers presentacionais brutal.
// This molecule does NOT contain business logic.
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlProfileCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';

// Membros private (TS) do pai usados pelo render() brutal.
interface ProfileCardInternals {
  isInteractive(): boolean;
  handleCardClick(): void;
  handleCardKeydown(event: KeyboardEvent): void;
}

@customElement('groupviewcard--ml-profile-card-brutal')
export class MlProfileCardBrutal extends MlProfileCardMolecule {
  private get x(): ProfileCardInternals {
    return this as unknown as ProfileCardInternals;
  }

  // ---- helpers presentacionais (brutal) ----
  private brutalCardClasses(): string {
    return [
      'brutal-card',
      'w-full p-4',
      this.selected ? 'is-selected' : '',
      this.x.isInteractive() ? 'is-interactive' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalHeader() {
    const hasHeader = this.hasSlot('CardHeader');
    const hasTitle = this.hasSlot('CardTitle');
    const hasDescription = this.hasSlot('CardDescription');
    if (!hasHeader && !hasTitle && !hasDescription) return nothing;

    if (hasHeader) {
      return html`<div class="card-header brutal-card-text">${unsafeHTML(this.getSlotContent('CardHeader'))}</div>`;
    }

    return html`
      <div class="card-header">
        ${hasTitle ? html`<div class="brutal-card-title text-lg font-bold">${unsafeHTML(this.getSlotContent('CardTitle'))}</div>` : nothing}
        ${hasDescription ? html`<div class="brutal-card-desc mt-1 text-sm">${unsafeHTML(this.getSlotContent('CardDescription'))}</div>` : nothing}
      </div>
    `;
  }

  private brutalContent() {
    if (!this.hasSlot('CardContent')) return nothing;
    return html`<div class="card-content brutal-card-content">${unsafeHTML(this.getSlotContent('CardContent'))}</div>`;
  }

  private brutalFooter() {
    if (!this.hasSlot('CardFooter')) return nothing;
    return html`<div class="card-footer brutal-card-footer">${unsafeHTML(this.getSlotContent('CardFooter'))}</div>`;
  }

  private brutalAction() {
    if (!this.hasSlot('CardAction')) return nothing;
    return html`<div class="card-action flex flex-wrap items-center gap-2">${unsafeHTML(this.getSlotContent('CardAction'))}</div>`;
  }

  private brutalLoadingSkeleton() {
    return html`
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="brutal-skeleton h-4 w-2/3"></div>
          <div class="brutal-skeleton h-3 w-1/2"></div>
        </div>
        <div class="brutal-skeleton h-16 w-full"></div>
        <div class="flex gap-2">
          <div class="brutal-skeleton h-8 w-24"></div>
          <div class="brutal-skeleton h-8 w-20"></div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — logica/estado herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const roleAttr = x.isInteractive() ? 'button' : nothing;
    const tabIndexAttr = x.isInteractive() ? 0 : nothing;
    const ariaDisabled = this.disabled || this.loading ? 'true' : nothing;
    const ariaSelected = this.selected ? 'true' : nothing;

    return html`
      <div
        class="${this.brutalCardClasses()}"
        role=${roleAttr}
        tabindex=${tabIndexAttr}
        aria-disabled=${ariaDisabled}
        aria-selected=${ariaSelected}
        @click=${() => x.handleCardClick()}
        @keydown=${(e: KeyboardEvent) => x.handleCardKeydown(e)}
      >
        ${this.loading
          ? this.brutalLoadingSkeleton()
          : html`
              <div class="space-y-4">
                ${this.brutalHeader()} ${this.brutalContent()} ${this.brutalFooter()} ${this.brutalAction()}
              </div>
            `}
      </div>
    `;
  }
}
