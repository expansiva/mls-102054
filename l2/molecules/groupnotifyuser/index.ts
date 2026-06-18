/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupnotifyuser/ml-notify-banner';
import '/_102054_/l2/molecules/groupnotifyuser/ml-toast-notification';
import '/_102054_/l2/molecules/groupnotifyuser/ml-alert-modal';
import '/_102054_/l2/molecules/grouptriggeraction/ml-button-standard';

@customElement('molecules--groupnotifyuser--index-102054')
export class GroupNotifyUserIndex extends StateLitElement {
  @state() private modalOpen = false;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:2.5rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNotifyUser · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Notify User</h1>
        </header>

        <section style="max-width:32rem; margin:0 auto; display:flex; flex-direction:column; gap:1rem;">
          <groupnotifyuser--ml-notify-banner type="success" visible="true">
            <Title>Tudo certo</Title>
            <Message>Banner de sucesso translúcido.</Message>
          </groupnotifyuser--ml-notify-banner>

          <groupnotifyuser--ml-toast-notification type="info" visible="true">
            <Title>Toast</Title>
            <Message>Notificação curta em vidro.</Message>
          </groupnotifyuser--ml-toast-notification>

          <div style="display:flex; justify-content:center; margin-top:0.5rem;">
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              @action=${() => {
                this.modalOpen = true;
              }}
            >
              <Label>Abrir modal</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </section>

        <groupnotifyuser--ml-alert-modal
          type="warning"
          .visible=${this.modalOpen}
          @dismiss=${() => {
            this.modalOpen = false;
          }}
        >
          <Title>Atenção</Title>
          <Message>Modal de vidro com scrim desfocado.</Message>
          <Action>
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              @action=${() => {
                this.modalOpen = false;
              }}
            >
              <Label>Entendi</Label>
            </grouptriggeraction--ml-button-standard>
          </Action>
        </groupnotifyuser--ml-alert-modal>
      </div>
    `;
  }
}
