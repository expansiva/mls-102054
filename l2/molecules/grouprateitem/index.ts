/// <mls fileReference="_102054_/l2/molecules/grouprateitem/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/grouprateitem/ml-star-rating';
import '/_102054_/l2/molecules/grouprateitem/ml-emoji-mood-scale';

@customElement('molecules--grouprateitem--index-102054')
export class GroupRateItemIndex extends StateLitElement {
  @state() private stars = 3;
  @state() private mood = 4;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupRateItem · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Rate Item</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <grouprateitem--ml-star-rating
            .value=${this.stars}
            min="1"
            max="5"
            @change=${(e: CustomEvent) => {
              this.stars = e.detail.value;
            }}
          >
            <Label>Avaliação (${this.stars} ★)</Label>
            <Helper>Clique ou use as setas</Helper>
          </grouprateitem--ml-star-rating>

          <grouprateitem--ml-emoji-mood-scale
            .value=${this.mood}
            @change=${(e: CustomEvent) => {
              this.mood = e.detail.value;
            }}
          >
            <Label>Como foi sua experiência? (${this.mood})</Label>
            <Item value="1">😡</Item>
            <Item value="2">🙁</Item>
            <Item value="3">😐</Item>
            <Item value="4">🙂</Item>
            <Item value="5">😍</Item>
          </grouprateitem--ml-emoji-mood-scale>
        </section>
      </div>
    `;
  }
}
