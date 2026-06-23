/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper-brutal';
import '/_102054_/l2/molecules/groupnavigatesteps/ml-wizard-steps-brutal';

@customElement('molecules--groupnavigatesteps--index-102054')
export class GroupNavigateStepsIndex extends StateLitElement {
  @state() private stepperValue = 1;
  @state() private wizardValue = 1;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNavigateSteps · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Navigate Steps</h1>
        </header>
        <section style="max-width:48rem; margin:0 auto; display:flex; flex-direction:column; gap:2.5rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupnavigatesteps--ml-horizontal-stepper-brutal
              .value=${this.stepperValue}
              @change=${(e: CustomEvent) => {
                this.stepperValue = e.detail.value;
              }}
            >
              <Label>Cadastro</Label>
              <Step title="Conta" description="Dados de acesso"></Step>
              <Step title="Perfil" description="Informações pessoais"></Step>
              <Step title="Pagamento" description="Plano e cobrança"></Step>
              <Step title="Pronto" description="Revisão final"></Step>
            </groupnavigatesteps--ml-horizontal-stepper-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupnavigatesteps--ml-wizard-steps-brutal
              .value=${this.wizardValue}
              .linear=${false}
              @change=${(e: CustomEvent) => {
                this.wizardValue = e.detail.value;
              }}
            >
              <Label>Onboarding</Label>
              <Step title="Conta" description="Acesso" completed></Step>
              <Step title="Perfil" description="Dados pessoais"></Step>
              <Step title="Plano" description="Escolha do plano"></Step>
            </groupnavigatesteps--ml-wizard-steps-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
