/// <mls fileReference="_102054_/l2/molecules/groupenternumber/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupenternumber/ml-number-stepper-brutal';
import '/_102054_/l2/molecules/groupenternumber/ml-range-slider-brutal';

@customElement('molecules--groupenternumber--index-102054')
export class GroupEnterNumberIndex extends StateLitElement {
  @state() private qty = 2;
  @state() private priceLow = 200;
  @state() private priceHigh = 800;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterNumber · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Enter Number</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupenternumber--ml-number-stepper-brutal
              .value=${this.qty}
              min="0"
              max="10"
              step="1"
              .isEditing=${true}
              @input=${(e: CustomEvent) => {
                this.qty = e.detail.value;
              }}
            >
              <Label>Quantidade</Label>
              <Helper>Selecionado: ${this.qty}</Helper>
            </groupenternumber--ml-number-stepper-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupenternumber--ml-range-slider-brutal
              .value=${this.priceLow}
              .valueHigh=${this.priceHigh}
              min="0"
              max="1000"
              step="50"
              locale="pt-BR"
              .isEditing=${true}
              @input=${(e: CustomEvent) => {
                this.priceLow = e.detail.value.min;
                this.priceHigh = e.detail.value.max;
              }}
            >
              <Label>Faixa de preço</Label>
              <Helper>${this.priceLow} – ${this.priceHigh}</Helper>
              <Prefix>R$</Prefix>
            </groupenternumber--ml-range-slider-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
