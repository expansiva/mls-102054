/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupshowprogress/ml-linear-progress-brutal';
import '/_102054_/l2/molecules/groupshowprogress/ml-circular-progress-brutal';

@customElement('molecules--groupshowprogress--index-102054')
export class GroupShowProgressIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupShowProgress · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Show Progress</h1>
        </header>

        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <div
            style="display:flex; flex-direction:column; gap:1.5rem; background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;"
          >
            <groupshowprogress--ml-linear-progress-brutal value="72" show-value label="Upload"></groupshowprogress--ml-linear-progress-brutal>
            <groupshowprogress--ml-linear-progress-brutal value="40" variant="success" size="sm" show-value></groupshowprogress--ml-linear-progress-brutal>
            <groupshowprogress--ml-linear-progress-brutal value="88" variant="warning" size="lg" show-value></groupshowprogress--ml-linear-progress-brutal>
            <groupshowprogress--ml-linear-progress-brutal variant="danger" label="Indeterminado"></groupshowprogress--ml-linear-progress-brutal>
          </div>

          <div
            style="display:flex; align-items:center; gap:2rem; justify-content:center; background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:2rem;"
          >
            <groupshowprogress--ml-circular-progress-brutal value="68" size="lg" show-value label="Carregamento"></groupshowprogress--ml-circular-progress-brutal>
            <groupshowprogress--ml-circular-progress-brutal value="33" size="lg" show-value></groupshowprogress--ml-circular-progress-brutal>
            <groupshowprogress--ml-circular-progress-brutal size="lg" label="Indeterminado"></groupshowprogress--ml-circular-progress-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
