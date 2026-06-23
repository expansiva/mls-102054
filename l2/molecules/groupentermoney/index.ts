/// <mls fileReference="_102054_/l2/molecules/groupentermoney/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupentermoney/ml-currency-input-brutal';

@customElement('molecules--groupentermoney--index-102054')
export class GroupEnterMoneyIndex extends StateLitElement {
  @state() private price = 129.9;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterMoney · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Enter Money</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupentermoney--ml-currency-input-brutal
              .value=${this.price}
              currency="BRL"
              locale="pt-BR"
              .isEditing=${true}
              @input=${(e: CustomEvent) => {
                this.price = e.detail.value;
              }}
            >
              <Label>Preço</Label>
              <Helper>Digite o valor em centavos</Helper>
            </groupentermoney--ml-currency-input-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
