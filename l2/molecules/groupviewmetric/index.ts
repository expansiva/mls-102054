/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupviewmetric/ml-metric-card-brutal';
import '/_102054_/l2/molecules/groupviewmetric/ml-metric-big-number-brutal';

@customElement('molecules--groupviewmetric--index-102054')
export class GroupViewMetricIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupViewMetric · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">View Metric</h1>
        </header>
        <section style="max-width:48rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:1.5rem;">
            <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
              <groupviewmetric--ml-metric-card-brutal>
                <Icon>📈</Icon>
                <Label>Receita mensal</Label>
                <Value>R$ 128.430</Value>
                <Trend direction="up">+12,5%</Trend>
                <Helper>vs. mês anterior</Helper>
              </groupviewmetric--ml-metric-card-brutal>
            </div>

            <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
              <groupviewmetric--ml-metric-card-brutal>
                <Icon>👥</Icon>
                <Label>Churn</Label>
                <Value>3,2%</Value>
                <Trend direction="down">-0,8%</Trend>
                <Helper>últimos 30 dias</Helper>
              </groupviewmetric--ml-metric-card-brutal>
            </div>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupviewmetric--ml-metric-big-number-brutal>
              <Label>Usuários ativos</Label>
              <Value>24.918</Value>
              <Trend direction="up">▲ 8,1% esta semana</Trend>
              <Helper>Atualizado há 5 min</Helper>
            </groupviewmetric--ml-metric-big-number-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
