/// <mls fileReference="_102054_/l2/molecules/grouptriggeraction/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra as moléculas do grupo (side-effect import)
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard-brutal';
import '/_102054_/l2/molecules/grouptriggeraction/ml-icon-button-brutal';
import '/_102054_/l2/molecules/grouptriggeraction/ml-split-button-brutal';

@customElement('molecules--grouptriggeraction--index-102054')
export class GroupTriggerActionIndex extends StateLitElement {
  @state() private lastAction = '—';

  private onAction(label: string, e: CustomEvent) {
    const detail = e.detail as { value?: string };
    this.lastAction = detail && detail.value ? `${label}: ${detail.value}` : label;
  }

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupTriggerAction · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Trigger Action</h1>
          <p style="color:#333; font-size:0.875rem;">Última ação: ${this.lastAction}</p>
        </header>

        <section style="max-width:40rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem; display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center;">
            <grouptriggeraction--ml-button-standard-brutal
              data-variant="primary"
              @action=${(e: CustomEvent) => this.onAction('Primary', e)}
            >
              <Label>Primary</Label>
            </grouptriggeraction--ml-button-standard-brutal>
            <grouptriggeraction--ml-button-standard-brutal
              data-variant="secondary"
              @action=${(e: CustomEvent) => this.onAction('Secondary', e)}
            >
              <Label>Secondary</Label>
            </grouptriggeraction--ml-button-standard-brutal>
            <grouptriggeraction--ml-button-standard-brutal
              data-variant="danger"
              @action=${(e: CustomEvent) => this.onAction('Danger', e)}
            >
              <Label>Danger</Label>
            </grouptriggeraction--ml-button-standard-brutal>
            <grouptriggeraction--ml-button-standard-brutal
              data-variant="ghost"
              @action=${(e: CustomEvent) => this.onAction('Ghost', e)}
            >
              <Label>Ghost</Label>
            </grouptriggeraction--ml-button-standard-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem; display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
            <grouptriggeraction--ml-icon-button-brutal
              size="md"
              @action=${(e: CustomEvent) => this.onAction('IconAdd', e)}
            >
              <Label>Adicionar</Label>
              <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M12 5v14M5 12h14"/></svg></Icon>
            </grouptriggeraction--ml-icon-button-brutal>
            <grouptriggeraction--ml-icon-button-brutal size="md" loading="true"><Label>Carregando</Label></grouptriggeraction--ml-icon-button-brutal>

            <grouptriggeraction--ml-split-button-brutal @action=${(e: CustomEvent) => this.onAction('Split', e)}>
              <Label value="save">Salvar</Label>
              <span value="save-new">Salvar e criar novo</span>
              <span value="save-copy">Salvar como cópia</span>
            </grouptriggeraction--ml-split-button-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
