/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupnavigatesection/ml-tabs';
import '/_102054_/l2/molecules/groupnavigatesection/ml-navigate-pills';
import '/_102054_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail';

@customElement('molecules--groupnavigatesection--index-102054')
export class GroupNavigateSectionIndex extends StateLitElement {
  @state() private tab = 'details';
  @state() private pill = 'overview';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:2.5rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNavigateSection · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Navigate Section</h1>
        </header>
        <section style="max-width:40rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <groupnavigatesection--ml-tabs
            .value=${this.tab}
            @change=${(e: CustomEvent) => {
              this.tab = e.detail.value;
            }}
          >
            <Label>Produto</Label>
            <Tab value="details" title="Detalhes">Descrição do produto.</Tab>
            <Tab value="reviews" title="Avaliações">Comentários dos clientes.</Tab>
          </groupnavigatesection--ml-tabs>

          <groupnavigatesection--ml-navigate-pills
            .value=${this.pill}
            @change=${(e: CustomEvent) => {
              this.pill = e.detail.value;
            }}
          >
            <Label>Seções</Label>
            <Tab value="overview" title="Visão geral">Resumo.</Tab>
            <Tab value="team" title="Equipe">Pessoas.</Tab>
          </groupnavigatesection--ml-navigate-pills>

          <groupnavigatesection--ml-breadcrumb-trail value="produto">
            <Tab value="home" title="Início">Home.</Tab>
            <Tab value="catalogo" title="Catálogo">Catálogo.</Tab>
            <Tab value="produto" title="Notebook Pro">Produto atual.</Tab>
          </groupnavigatesection--ml-breadcrumb-trail>
        </section>
      </div>
    `;
  }
}
