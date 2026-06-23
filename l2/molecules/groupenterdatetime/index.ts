/// <mls fileReference="_102054_/l2/molecules/groupenterdatetime/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupenterdatetime/ml-datetime-picker-brutal';

@customElement('molecules--groupenterdatetime--index-102054')
export class GroupEnterDatetimeIndex extends StateLitElement {
  @state() private dt: string | null = '2026-06-18T14:30:00';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterDatetime · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Enter Datetime</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupenterdatetime--ml-datetime-picker-brutal
              .value=${this.dt}
              .isEditing=${true}
              locale="pt-BR"
              minute-step="15"
              @change=${(e: CustomEvent) => {
                this.dt = e.detail.value;
              }}
            >
              <Label>Agendamento</Label>
              <Helper>Selecionado: ${this.dt ?? '—'}</Helper>
            </groupenterdatetime--ml-datetime-picker-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
