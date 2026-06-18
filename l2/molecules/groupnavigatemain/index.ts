/// <mls fileReference="_102054_/l2/molecules/groupnavigatemain/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupnavigatemain/ml-sidebar-nav';

@customElement('molecules--groupnavigatemain--index-102054')
export class GroupNavigateMainIndex extends StateLitElement {
  @state() private active = 'dashboard';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:2rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNavigateMain · glassmorphism</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Navigate Main</h1>
        </header>
        <div style="height:28rem; max-width:48rem; margin:0 auto; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,0.15); display:flex;">
          <groupnavigatemain--ml-sidebar-nav
            .value=${this.active}
            @change=${(e: CustomEvent) => {
              this.active = e.detail.value;
            }}
          >
            <Label>Aurora</Label>
            <Item value="dashboard" icon="▦">Dashboard</Item>
            <Item value="projects" icon="▤" badge="3">Projetos</Item>
            <Group label="Workspace">
              <Item value="tasks" icon="✓">Tarefas</Item>
              <Item value="calendar" icon="▣">Calendário</Item>
            </Group>
            <Footer>
              <Item value="settings" icon="⚙">Configurações</Item>
            </Footer>
          </groupnavigatemain--ml-sidebar-nav>
          <div style="flex:1; padding:1.5rem; color:rgba(255,255,255,0.85); background:rgba(255,255,255,0.04);">
            Selecionado: <strong style="color:#fff;">${this.active}</strong>
          </div>
        </div>
      </div>
    `;
  }
}
