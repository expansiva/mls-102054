/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupshowprogress/ml-linear-progress';
import '/_102054_/l2/molecules/groupshowprogress/ml-circular-progress';

@customElement('molecules--groupshowprogress--index-102054')
export class GroupShowProgressIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupShowProgress · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Show Progress</h1>
        </header>
        <section style="max-width:32rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            <groupshowprogress--ml-linear-progress value="72" show-value label="Upload"></groupshowprogress--ml-linear-progress>
            <groupshowprogress--ml-linear-progress value="40" variant="success" size="sm" show-value></groupshowprogress--ml-linear-progress>
            <groupshowprogress--ml-linear-progress value="88" variant="warning" size="lg" show-value></groupshowprogress--ml-linear-progress>
          </div>
          <div style="display:flex; align-items:center; gap:2rem; justify-content:center;">
            <groupshowprogress--ml-circular-progress value="68" size="lg" show-value></groupshowprogress--ml-circular-progress>
            <groupshowprogress--ml-circular-progress value="33" size="lg" show-value></groupshowprogress--ml-circular-progress>
            <groupshowprogress--ml-circular-progress size="lg"></groupshowprogress--ml-circular-progress>
          </div>
        </section>
      </div>
    `;
  }
}
