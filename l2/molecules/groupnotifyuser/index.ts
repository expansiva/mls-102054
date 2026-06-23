/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupnotifyuser/ml-alert-modal-brutal';
import '/_102054_/l2/molecules/groupnotifyuser/ml-notify-banner-brutal';
import '/_102054_/l2/molecules/groupnotifyuser/ml-toast-notification-brutal';

@customElement('molecules--groupnotifyuser--index-102054')
export class GroupNotifyUserIndex extends StateLitElement {
  @state() private bannerVisible = true;
  @state() private toastVisible = true;
  @state() private modalOpen = false;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:2.5rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNotifyUser · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Notify User</h1>
        </header>

        <section style="max-width:32rem; margin:0 auto; display:flex; flex-direction:column; gap:1rem;">
          <groupnotifyuser--ml-notify-banner-brutal
            type="success"
            .visible=${this.bannerVisible}
            @dismiss=${() => {
              this.bannerVisible = false;
            }}
          >
            <Title>Tudo certo</Title>
            <Message>Banner de sucesso brutal.</Message>
          </groupnotifyuser--ml-notify-banner-brutal>

          <groupnotifyuser--ml-toast-notification-brutal
            type="info"
            .visible=${this.toastVisible}
            @dismiss=${() => {
              this.toastVisible = false;
            }}
          >
            <Title>Toast</Title>
            <Message>Notificação curta brutal.</Message>
          </groupnotifyuser--ml-toast-notification-brutal>

          <div style="display:flex; justify-content:center; margin-top:0.5rem;">
            <button
              style="padding:0.5rem 1rem; border:3px solid #000; background:#fff; color:#000; cursor:pointer; font-family:'JetBrains Mono',monospace; font-weight:700; text-transform:uppercase; box-shadow:4px 4px 0 #000;"
              @click=${() => {
                this.modalOpen = true;
              }}
            >
              Abrir modal
            </button>
          </div>
        </section>

        <groupnotifyuser--ml-alert-modal-brutal
          type="warning"
          .visible=${this.modalOpen}
          @dismiss=${() => {
            this.modalOpen = false;
          }}
        >
          <Title>Atenção</Title>
          <Message>Modal brutal com borda sólida.</Message>
        </groupnotifyuser--ml-alert-modal-brutal>
      </div>
    `;
  }
}
