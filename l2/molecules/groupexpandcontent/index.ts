/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupexpandcontent/ml-accordion-brutal';
import '/_102054_/l2/molecules/groupexpandcontent/ml-collapsible-panel-brutal';
import '/_102054_/l2/molecules/groupexpandcontent/ml-reveal-overlay-brutal';

@customElement('molecules--groupexpandcontent--index-102054')
export class GroupExpandContentIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupExpandContent · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Expand Content</h1>
        </header>
        <section style="max-width:40rem; margin:0 auto;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupexpandcontent--ml-accordion-brutal multiple="true">
              <Label>Project details</Label>
              <Section title="Overview" expanded>Share the project scope and expected outcomes.</Section>
              <Section title="Timeline">Milestones are due every Friday.</Section>
              <Section title="Risks">Track vendor delays closely.</Section>
            </groupexpandcontent--ml-accordion-brutal>
          </div>

          <div style="margin-top:1.5rem; background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupexpandcontent--ml-collapsible-panel-brutal>
              <Label>Perguntas frequentes</Label>
              <Section title="Como começar?" subtitle="Primeiros passos" icon="🚀" expanded>
                Crie a conta e siga o onboarding.
              </Section>
              <Section title="Posso cancelar?" subtitle="Assinatura">Sim, a qualquer momento.</Section>
            </groupexpandcontent--ml-collapsible-panel-brutal>
          </div>

          <div style="margin-top:1.5rem; background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupexpandcontent--ml-reveal-overlay-brutal multiple="true">
              <Label>Conteúdo oculto até revelar</Label>
              <Section title="Chave de API">sk-live-9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c</Section>
            </groupexpandcontent--ml-reveal-overlay-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
