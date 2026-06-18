/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper';
import '/_102054_/l2/molecules/groupnavigatesteps/ml-wizard-steps';

@customElement('molecules--groupnavigatesteps--index-102054')
export class GroupNavigateStepsIndex extends StateLitElement {
  @state() private step = 1;
  @state() private wiz = 1;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNavigateSteps · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Navigate Steps</h1>
        </header>
        <section style="max-width:42rem; margin:0 auto; display:flex; flex-direction:column; gap:2.5rem;">
          <groupnavigatesteps--ml-horizontal-stepper
            .value=${this.step}
            @change=${(e: CustomEvent) => {
              this.step = e.detail.value;
            }}
          >
            <Label>Cadastro (etapa ${this.step + 1})</Label>
            <Step title="Conta" description="Acesso"></Step>
            <Step title="Perfil" description="Dados"></Step>
            <Step title="Pagamento" description="Plano"></Step>
            <Step title="Pronto" description="Revisão"></Step>
          </groupnavigatesteps--ml-horizontal-stepper>

          <groupnavigatesteps--ml-wizard-steps
            .value=${this.wiz}
            linear="false"
            @change=${(e: CustomEvent) => {
              this.wiz = e.detail.value;
            }}
          >
            <Label>Onboarding (etapa ${this.wiz + 1})</Label>
            <Step title="Conta" description="Acesso" completed></Step>
            <Step title="Perfil" description="Dados pessoais"></Step>
            <Step title="Plano" description="Escolha"></Step>
          </groupnavigatesteps--ml-wizard-steps>
        </section>
      </div>
    `;
  }
}
