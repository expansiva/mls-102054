/// <mls fileReference="_102054_/l2/molecules/groupenterboolean/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch-brutal';

@customElement('molecules--groupenterboolean--index-102054')
export class GroupEnterBooleanIndex extends StateLitElement {
  @state() private notif = false;
  @state() private news = true;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterBoolean · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Enter Boolean</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupenterboolean--ml-toggle-switch-brutal
              .value=${this.notif}
              .isEditing=${true}
              @change=${(e: CustomEvent) => {
                this.notif = e.detail.value;
              }}
            >
              <Label>Notificações (${this.notif ? 'on' : 'off'})</Label>
              <Helper>Receber alertas por e-mail</Helper>
            </groupenterboolean--ml-toggle-switch-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupenterboolean--ml-toggle-switch-brutal
              .value=${this.news}
              .isEditing=${true}
              @change=${(e: CustomEvent) => {
                this.news = e.detail.value;
              }}
            >
              <Label>Newsletter (${this.news ? 'on' : 'off'})</Label>
            </groupenterboolean--ml-toggle-switch-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
