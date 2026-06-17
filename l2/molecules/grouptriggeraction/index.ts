/// <mls fileReference="_102054_/l2/molecules/grouptriggeraction/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('molecules--grouptriggeraction--index-102054')
export class GroupTriggerActionIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0f172a 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupTriggerAction · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Trigger Action</h1>
        </header>
        <section
          style="background:rgba(255,255,255,0.08); backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.15); border-radius:16px; padding:2rem; max-width:48rem; margin:0 auto; display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; justify-content:center;"
        >
          <grouptriggeraction--ml-button-standard data-variant="primary"><Label>Primary</Label></grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="secondary"><Label>Secondary</Label></grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="danger"><Label>Danger</Label></grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="ghost"><Label>Ghost</Label></grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="link"><Label>Link</Label></grouptriggeraction--ml-button-standard>
        </section>
      </div>
    `;
  }
}
