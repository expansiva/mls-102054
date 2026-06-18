/// <mls fileReference="_102054_/l2/molecules/groupviewcard/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupviewcard/ml-profile-card';
import '/_102054_/l2/molecules/groupviewcard/ml-vertical-card';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('molecules--groupviewcard--index-102054')
export class GroupViewCardIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupViewCard · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">View Card</h1>
        </header>
        <section style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.5rem; max-width:48rem; margin:0 auto;">
          <groupviewcard--ml-profile-card clickable="true">
            <CardTitle>Ada Lovelace</CardTitle>
            <CardDescription>Engenheira de software</CardDescription>
            <CardContent>Card de perfil clicável em vidro.</CardContent>
          </groupviewcard--ml-profile-card>

          <groupviewcard--ml-vertical-card>
            <CardTitle>Plano Pro</CardTitle>
            <CardDescription>R$ 49/mês</CardDescription>
            <CardContent>Card vertical com ação.</CardContent>
            <CardAction>
              <grouptriggeraction--ml-button-standard data-variant="primary"><Label>Assinar</Label></grouptriggeraction--ml-button-standard>
            </CardAction>
          </groupviewcard--ml-vertical-card>
        </section>
      </div>
    `;
  }
}
