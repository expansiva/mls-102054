/// <mls fileReference="_102054_/l2/molecules/grouprateitem/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/grouprateitem/ml-star-rating-brutal';
import '/_102054_/l2/molecules/grouprateitem/ml-emoji-mood-scale-brutal';

@customElement('molecules--grouprateitem--index-102054')
export class GroupRateItemIndex extends StateLitElement {
  @state() private rating = 3;
  @state() private mood = 3;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupRateItem · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Rate Item</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <grouprateitem--ml-star-rating-brutal
              .value=${this.rating}
              .isEditing=${true}
              min="1"
              max="5"
              @change=${(e: CustomEvent) => {
                this.rating = e.detail.value;
              }}
            >
              <Label>Sua avaliação</Label>
              <Helper>Clique ou use as setas</Helper>
            </grouprateitem--ml-star-rating-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <grouprateitem--ml-emoji-mood-scale-brutal
              .value=${this.mood}
              .isEditing=${true}
              @change=${(e: CustomEvent) => {
                this.mood = e.detail.value;
              }}
            >
              <Label>Como foi sua experiência?</Label>
              <Helper>Escolha um emoji</Helper>
              <Item value="1">😡</Item>
              <Item value="2">🙁</Item>
              <Item value="3">😐</Item>
              <Item value="4">🙂</Item>
              <Item value="5">😍</Item>
            </grouprateitem--ml-emoji-mood-scale-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
