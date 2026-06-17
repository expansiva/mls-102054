/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupexpandcontent/ml-accordion';

@customElement('molecules--groupexpandcontent--index-102054')
export class GroupExpandContentIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#3b1d60 45%,#9d174d 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupExpandContent · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Expand Content</h1>
        </header>
        <section style="max-width:40rem; margin:0 auto;">
          <groupexpandcontent--ml-accordion multiple="true">
            <Label>Project details</Label>
            <Section title="Overview" expanded>Share the project scope and expected outcomes.</Section>
            <Section title="Timeline">Milestones are due every Friday.</Section>
            <Section title="Risks">Track vendor delays closely.</Section>
          </groupexpandcontent--ml-accordion>
        </section>
      </div>
    `;
  }
}
