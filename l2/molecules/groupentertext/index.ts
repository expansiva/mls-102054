/// <mls fileReference="_102054_/l2/molecules/groupentertext/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input';

@customElement('molecules--groupentertext--index-102054')
export class GroupEnterTextIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterText · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Text</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <groupentertext--ml-floating-text-input value="">
            <Label>Full name</Label>
            <Helper>As shown on your document</Helper>
          </groupentertext--ml-floating-text-input>
          <groupentertext--ml-floating-text-input value="ada" error="Username already taken">
            <Label>Username</Label>
          </groupentertext--ml-floating-text-input>
        </section>
      </div>
    `;
  }
}
