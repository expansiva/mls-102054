/// <mls fileReference="_102054_/l2/molecules/groupsearchcontent/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupsearchcontent/ml-search-bar-brutal';

@customElement('molecules--groupsearchcontent--index-102054')
export class GroupSearchContentIndex extends StateLitElement {
  @state() private query: string | null = null;
  @state() private lastSearch = '';

  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSearchContent · brutalism · 102054</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Search Content</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupsearchcontent--ml-search-bar-brutal
              .value=${this.query}
              @change=${(e: CustomEvent) => { this.query = e.detail.value; }}
              @search=${(e: CustomEvent) => { this.lastSearch = e.detail.query; }}
              @clear=${() => { this.query = null; this.lastSearch = ''; }}
            >
              <Label>Buscar</Label>
              <Helper>Última busca: ${this.lastSearch || '—'}</Helper>
              <Suggestion value="lit">Lit</Suggestion>
              <Suggestion value="ts">TypeScript</Suggestion>
              <Suggestion value="less">LESS</Suggestion>
              <Suggestion value="brutal">Brutalism</Suggestion>
            </groupsearchcontent--ml-search-bar-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
