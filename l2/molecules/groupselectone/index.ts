/// <mls fileReference="_102054_/l2/molecules/groupselectone/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupselectone/ml-card-selector-brutal';
import '/_102054_/l2/molecules/groupselectone/ml-select-dropdown-brutal';
import '/_102054_/l2/molecules/groupselectone/ml-combobox-brutal';
import '/_102054_/l2/molecules/groupselectone/ml-radio-group-brutal';
import '/_102054_/l2/molecules/groupselectone/ml-segmented-control-brutal';

@customElement('molecules--groupselectone--index-102054')
export class GroupSelectOneIndex extends StateLitElement {
  @state() private country = 'br';
  @state() private plan = 'pro';
  @state() private view = 'month';
  @state() private fruit = 'apple';
  @state() private tier = 'pro';

  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSelectOne · brutalism · 102054</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Select One</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupselectone--ml-select-dropdown-brutal searchable="true" .value=${this.country} .isEditing=${true} @change=${(e: CustomEvent) => { this.country = e.detail.value; }}>
              <Label>País</Label>
              <Helper>Selecionado: ${this.country}</Helper>
              <Item value="br">Brasil</Item>
              <Item value="us">Estados Unidos</Item>
              <Item value="pt">Portugal</Item>
              <Item value="jp">Japão</Item>
            </groupselectone--ml-select-dropdown-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupselectone--ml-radio-group-brutal .value=${this.plan} .isEditing=${true} @change=${(e: CustomEvent) => { this.plan = e.detail.value; }}>
              <Label>Plano</Label>
              <Item value="free">Gratuito</Item>
              <Item value="standard">Standard</Item>
              <Item value="pro">Pro</Item>
            </groupselectone--ml-radio-group-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupselectone--ml-segmented-control-brutal .value=${this.view} .isEditing=${true} @change=${(e: CustomEvent) => { this.view = e.detail.value; }}>
              <Label>Visualização</Label>
              <Item value="day">Dia</Item>
              <Item value="week">Semana</Item>
              <Item value="month">Mês</Item>
            </groupselectone--ml-segmented-control-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupselectone--ml-combobox-brutal .value=${this.fruit} clearable @change=${(e: CustomEvent) => { this.fruit = e.detail.value; }}>
              <Label>Fruta</Label>
              <Helper>Selecionado: ${this.fruit ?? '—'}</Helper>
              <Item value="apple">Maçã</Item>
              <Item value="banana">Banana</Item>
              <Item value="grape">Uva</Item>
              <Item value="orange">Laranja</Item>
            </groupselectone--ml-combobox-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupselectone--ml-card-selector-brutal .value=${this.tier} searchable @change=${(e: CustomEvent) => { this.tier = e.detail.value; }}>
              <Label>Tier</Label>
              <Helper>Selecionado: ${this.tier}</Helper>
              <Item value="free"><strong>Free</strong><br /><span style="opacity:.7">R$ 0/mês</span></Item>
              <Item value="pro"><strong>Pro</strong><br /><span style="opacity:.7">R$ 49/mês</span></Item>
              <Item value="business"><strong>Business</strong><br /><span style="opacity:.7">R$ 149/mês</span></Item>
            </groupselectone--ml-card-selector-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
