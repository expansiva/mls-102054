/// <mls fileReference="_102054_/l2/molecules/groupentertext/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102054_/l2/molecules/groupentertext/ml-floating-text-input-brutal';
import '/_102054_/l2/molecules/groupentertext/ml-password-strength-input-brutal';
import '/_102054_/l2/molecules/groupentertext/ml-tag-input-brutal';

@customElement('molecules--groupentertext--index-102054')
export class GroupEnterTextIndex extends StateLitElement {
  @state() private fullName = '';
  @state() private password = 'Senha1!';
  @state() private tags = 'design, brutal, lit';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterText · brutalism · 102054</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Enter Text</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupentertext--ml-floating-text-input-brutal
              .value=${this.fullName}
              .isEditing=${true}
              @input=${(e: CustomEvent) => {
                this.fullName = e.detail.value;
              }}
            >
              <Label>Full name</Label>
              <Helper>As shown on your document</Helper>
            </groupentertext--ml-floating-text-input-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupentertext--ml-password-strength-input-brutal
              .value=${this.password}
              .isEditing=${true}
              min-length="8"
              required
              @input=${(e: CustomEvent) => {
                this.password = e.detail.value;
              }}
            >
              <Label>Senha</Label>
              <Helper>Use letras, números e símbolos</Helper>
            </groupentertext--ml-password-strength-input-brutal>
          </div>

          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupentertext--ml-tag-input-brutal
              .value=${this.tags}
              .isEditing=${true}
              @input=${(e: CustomEvent) => {
                this.tags = e.detail.value;
              }}
            >
              <Label>Tags</Label>
              <Helper>Enter ou vírgula para adicionar</Helper>
            </groupentertext--ml-tag-input-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
