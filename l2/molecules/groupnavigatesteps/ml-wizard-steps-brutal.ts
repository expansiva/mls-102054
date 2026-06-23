/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/ml-wizard-steps-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// WIZARD STEPS — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSteps
// Herda MlWizardStepsMolecule (mls-102040): parsing de Step slots, regras de
// navegação linear, completed/active, teclado (Arrow/Enter/Space), estado
// reativo (focusedIndex) e dispatch de change. Sobrescreve apenas render() +
// helpers presentacionais brutal.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlWizardStepsMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-wizard-steps.js';

/// **collab_i18n_start**
const message_en = {
  labelFallback: 'Steps',
  loading: 'Loading steps...',
  completed: 'completed',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    labelFallback: 'Etapas',
    loading: 'Carregando etapas...',
    completed: 'concluída',
  },
};
/// **collab_i18n_end**

interface ParsedStep {
  index: number;
  title: string;
  description: string;
  completed: boolean;
  disabled: boolean;
}

interface WizardStepsInternals {
  focusedIndex: number;
  parseSteps(): ParsedStep[];
  getInitialFocusIndex(steps: ParsedStep[]): number;
  canNavigateTo(targetIndex: number): boolean;
  handleStepClick(step: ParsedStep): void;
  handleContainerKeyDown(event: KeyboardEvent): void;
}

@customElement('groupnavigatesteps--ml-wizard-steps-brutal')
export class MlWizardStepsBrutal extends MlWizardStepsMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): WizardStepsInternals {
    return this as unknown as WizardStepsInternals;
  }

  private brutalLabelText(): string {
    const raw = this.getSlotContent('Label');
    if (!raw) return this.gMsg.labelFallback;
    return raw.replace(/<[^>]*>/g, '').trim() || this.gMsg.labelFallback;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalStepClasses(step: ParsedStep, isActive: boolean): string {
    const isClickable = this.x.canNavigateTo(step.index);
    return [
      'brutal-wz-step flex-1 min-w-0 px-3 py-3 text-left',
      isActive ? 'is-active' : '',
      step.completed && !isActive ? 'is-completed' : '',
      step.disabled || !isClickable ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLoading(): TemplateResult {
    return html`
      <div class="brutal-wz-loading flex items-center gap-2 px-4 py-3 text-sm">
        <span class="inline-flex h-4 w-4 items-center justify-center">
          <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            ${svg`<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" opacity="0.3"></circle>`}
            ${svg`<path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>`}
          </svg>
        </span>
        <span>${this.gMsg.loading}</span>
      </div>
    `;
  }

  private brutalLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="brutal-wz-label mb-3 text-sm font-bold">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private brutalStep(step: ParsedStep, isActive: boolean, tabIndex: number): TemplateResult {
    const x = this.x;
    const isClickable = x.canNavigateTo(step.index);
    const ariaLabel = step.completed ? `${step.title} ${this.gMsg.completed}` : step.title;
    const dotClasses = [
      'brutal-wz-dot flex h-6 w-6 items-center justify-center text-xs font-bold',
      isActive ? 'is-active' : step.completed ? 'is-completed' : '',
    ].filter(Boolean).join(' ');
    return html`
      <button
        class="${this.brutalStepClasses(step, isActive)}"
        role="tab"
        aria-selected="${isActive ? 'true' : 'false'}"
        aria-disabled="${step.disabled ? 'true' : 'false'}"
        aria-label="${ariaLabel}"
        ?disabled=${this.disabled || this.loading || step.disabled || !isClickable}
        tabindex="${tabIndex}"
        @click=${() => x.handleStepClick(step)}
      >
        <div class="flex items-center gap-2">
          <span class="${dotClasses}">
            ${step.completed ? html`<span aria-hidden="true">&#10003;</span>` : html`${step.index + 1}`}
          </span>
          <div class="min-w-0">
            <div class="brutal-wz-title truncate text-sm font-bold">${step.title}</div>
            ${step.description ? html`<div class="brutal-wz-desc truncate text-xs">${step.description}</div>` : html``}
          </div>
        </div>
      </button>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;
    if (this.loading) {
      return html`${this.brutalLoading()}`;
    }
    const steps = x.parseSteps();
    const focusIndex = x.getInitialFocusIndex(steps);
    const ariaLabel = this.brutalLabelText();
    return html`
      <div class="w-full">
        ${this.brutalLabel()}
        <div
          class="flex items-start gap-2"
          role="tablist"
          aria-label="${ariaLabel}"
          @keydown=${(e: KeyboardEvent) => x.handleContainerKeyDown(e)}
        >
          ${steps.map((step, index) => this.brutalStep(step, index === this.value, index === focusIndex ? 0 : -1))}
        </div>
      </div>
    `;
  }
}
