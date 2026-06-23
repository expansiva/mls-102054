/// <mls fileReference="_102054_/l2/molecules/groupviewcard/ml-vertical-card-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML VERTICAL CARD — BRUTALISM por HERANCA (mls-102054)
// =============================================================================
// Skill Group: groupViewCard
// Herda MlVerticalCardMolecule (mls-102040): estados (clickable/selected/disabled/
// loading), evento 'cardClick', modo de edicao propagado a filhos (lifecycle).
// Sobrescreve so render() + helpers presentacionais brutal.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlVerticalCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

// Membros private (TS) do pai usados pelo render() brutal.
interface VerticalCardInternals {
  isInteractive(): boolean;
  handleCardClick(): void;
  handleKeyDown(e: KeyboardEvent): void;
}

@customElement('groupviewcard--ml-vertical-card-brutal')
export class MlVerticalCardBrutal extends MlVerticalCardMolecule {
  private get x(): VerticalCardInternals {
    return this as unknown as VerticalCardInternals;
  }

  // ---- helpers presentacionais (brutal) ----
  private brutalRootClasses(): string {
    return [
      'brutal-card',
      'w-full p-4 flex flex-col gap-4',
      this.selected ? 'is-selected' : '',
      this.x.isInteractive() ? 'is-interactive' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private brutalHeader(): TemplateResult {
    const hasHeader = this.hasSlot('CardHeader');
    const hasTitle = this.hasSlot('CardTitle');
    const hasDescription = this.hasSlot('CardDescription');

    if (!hasHeader && !hasTitle && !hasDescription) {
      return html``;
    }

    if (hasHeader) {
      return html`<div class="flex flex-col gap-1 brutal-card-text">${unsafeHTML(this.getSlotContent('CardHeader'))}</div>`;
    }

    return html`
      <div class="flex flex-col gap-1">
        ${hasTitle ? html`<div class="brutal-card-title text-base font-bold">${unsafeHTML(this.getSlotContent('CardTitle'))}</div>` : html``}
        ${hasDescription ? html`<div class="brutal-card-desc text-sm">${unsafeHTML(this.getSlotContent('CardDescription'))}</div>` : html``}
      </div>
    `;
  }

  private brutalContent(): TemplateResult {
    if (!this.hasSlot('CardContent')) return html``;
    return html`<div class="brutal-card-content text-sm">${unsafeHTML(this.getSlotContent('CardContent'))}</div>`;
  }

  private brutalFooter(): TemplateResult {
    if (!this.hasSlot('CardFooter')) return html``;
    return html`<div class="brutal-card-footer text-xs">${unsafeHTML(this.getSlotContent('CardFooter'))}</div>`;
  }

  private brutalAction(): TemplateResult {
    if (!this.hasSlot('CardAction')) return html``;
    return html`<div class="brutal-card-action pt-3">${unsafeHTML(this.getSlotContent('CardAction'))}</div>`;
  }

  private brutalLoading(): TemplateResult {
    return html`
      <div class="flex flex-col gap-4">
        <div class="brutal-skeleton h-4 w-2/3"></div>
        <div class="brutal-skeleton h-3 w-1/2"></div>
        <div class="brutal-skeleton h-20 w-full"></div>
        <div class="brutal-skeleton h-3 w-1/3"></div>
        <div class="brutal-skeleton h-9 w-28"></div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — logica/estado herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const interactive = x.isInteractive();
    return html`
      <div
        class=${this.brutalRootClasses()}
        role=${ifDefined(interactive ? 'button' : undefined)}
        tabindex=${ifDefined(interactive ? '0' : undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-selected=${ifDefined(this.selected ? 'true' : undefined)}
        @click=${() => x.handleCardClick()}
        @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e)}
      >
        ${this.loading
          ? this.brutalLoading()
          : html` ${this.brutalHeader()} ${this.brutalContent()} ${this.brutalFooter()} ${this.brutalAction()} `}
      </div>
    `;
  }
}
