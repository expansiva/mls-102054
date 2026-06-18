/// <mls fileReference="_102054_/l2/molecules/groupenterboolean/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupenterboolean/ml-toggle-switch';

@customElement('molecules--groupenterboolean--index-102054')
export class GroupEnterBooleanIndex extends StateLitElement {
  // Estado controlado: o toggle reporta 'change' e o index realimenta .value
  @state() private cardOff = false;
  @state() private cardOn = true;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 45%,#be185d 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterBoolean · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Boolean</h1>
        </header>
        <section
          style="display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:1.5rem; max-width:48rem; margin:0 auto;"
        >
          <article
            style="background:rgba(255,255,255,0.08); backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.15); border-radius:16px; padding:1.5rem; display:flex; flex-direction:column; gap:1.5rem;"
          >
            <groupenterboolean--ml-toggle-switch
              name="demo-off"
              .value=${this.cardOff}
              .isEditing=${true}
              @change=${(e: CustomEvent) => {
                this.cardOff = e.detail.value;
              }}
            >
              <Label>Starts off</Label>
            </groupenterboolean--ml-toggle-switch>
            <groupenterboolean--ml-toggle-switch
              name="demo-on"
              .value=${this.cardOn}
              .isEditing=${true}
              @change=${(e: CustomEvent) => {
                this.cardOn = e.detail.value;
              }}
            >
              <Label>Starts on</Label>
            </groupenterboolean--ml-toggle-switch>
          </article>
        </section>
      </div>
    `;
  }
}
