/// <mls fileReference="_102054_/l2/molecules/groupviewcard/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra as moléculas do grupo (side-effect import)
import '/_102054_/l2/molecules/groupviewcard/ml-profile-card-brutal';
import '/_102054_/l2/molecules/groupviewcard/ml-vertical-card-brutal';
// Botão usado dentro do CardAction
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard-brutal';

@customElement('molecules--groupviewcard--index-102054')
export class GroupViewCardIndex extends StateLitElement {
  @state() private selectedPlan: 'pro' | 'enterprise' | null = 'pro';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupViewCard · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">View Card</h1>
        </header>

        <section style="max-width:48rem; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.5rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupviewcard--ml-profile-card-brutal>
              <CardTitle>Ada Lovelace</CardTitle>
              <CardDescription>Engenheira de software</CardDescription>
              <CardContent>Primeira programadora da história, pioneira da computação.</CardContent>
              <CardFooter>Membro desde 2021</CardFooter>
            </groupviewcard--ml-profile-card-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupviewcard--ml-vertical-card-brutal
              clickable="true"
              .selected=${this.selectedPlan === 'pro'}
              @cardClick=${() => {
                this.selectedPlan = 'pro';
              }}
            >
              <CardTitle>Plano Pro</CardTitle>
              <CardDescription>R$ 49/mês</CardDescription>
              <CardContent>Card vertical clicável (selecionável).</CardContent>
              <CardAction>
                <grouptriggeraction--ml-button-standard-brutal data-variant="primary"><Label>Assinar</Label></grouptriggeraction--ml-button-standard-brutal>
              </CardAction>
            </groupviewcard--ml-vertical-card-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupviewcard--ml-vertical-card-brutal
              clickable="true"
              .selected=${this.selectedPlan === 'enterprise'}
              @cardClick=${() => {
                this.selectedPlan = 'enterprise';
              }}
            >
              <CardTitle>Plano Enterprise</CardTitle>
              <CardDescription>Sob consulta</CardDescription>
              <CardContent>Recursos dedicados, SLA e onboarding assistido.</CardContent>
              <CardAction>
                <grouptriggeraction--ml-button-standard-brutal data-variant="secondary"><Label>Falar com vendas</Label></grouptriggeraction--ml-button-standard-brutal>
              </CardAction>
            </groupviewcard--ml-vertical-card-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
