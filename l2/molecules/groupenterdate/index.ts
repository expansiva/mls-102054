/// <mls fileReference="_102054_/l2/molecules/groupenterdate/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupenterdate/ml-date-picker-brutal';

@customElement('molecules--groupenterdate--index-102054')
export class GroupEnterDateIndex extends StateLitElement {
  @state() private date: string | null = '2026-06-18';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterDate · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Enter Date</h1>
        </header>
        <section style="max-width:24rem; margin:0 auto;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupenterdate--ml-date-picker-brutal
              .value=${this.date}
              locale="pt-BR"
              first-day-of-week="1"
              .isEditing=${true}
              @change=${(e: CustomEvent) => {
                this.date = e.detail.value;
              }}
            >
              <Label>Data de início</Label>
              <Helper>Selecionada: ${this.date ?? '—'}</Helper>
            </groupenterdate--ml-date-picker-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
