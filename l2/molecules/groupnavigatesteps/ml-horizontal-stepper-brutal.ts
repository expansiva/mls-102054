/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// HORIZONTAL STEPPER — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupNavigateSteps
// Herda MlHorizontalStepperMolecule (mls-102040): parsing de Step slots, lógica
// de navegação linear, completed/active, teclado (Arrow/Enter/Space), estado
// reativo (focusedIndex) e dispatch de change. Sobrescreve apenas render() +
// helpers presentacionais brutal.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlHorizontalStepperMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper.js';

/// **collab_i18n_start**
const message_en = {
  completed: 'completed',
  loading: 'Loading steps...',
  stepperLabel: 'Progress steps',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    completed: 'concluído',
    loading: 'Carregando etapas...',
    stepperLabel: 'Etapas de progresso',
  },
};
/// **collab_i18n_end**

type ParsedStep = {
  title: string;
  description: string;
  disabled: boolean;
  completed: boolean;
  iconHtml: string;
};

interface HorizontalStepperInternals {
  focusedIndex: number;
  getSteps(): ParsedStep[];
  getLabelText(): string;
  isStepCompleted(index: number, step: ParsedStep): boolean;
  canNavigateTo(index: number, step: ParsedStep, steps: ParsedStep[]): boolean;
  handleStepClick(index: number, step: ParsedStep, steps: ParsedStep[]): void;
  handleKeyDown(event: KeyboardEvent, steps: ParsedStep[]): void;
  handleFocus(index: number): void;
}

@customElement('groupnavigatesteps--ml-horizontal-stepper-brutal')
export class MlHorizontalStepperBrutal extends MlHorizontalStepperMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): HorizontalStepperInternals {
    return this as unknown as HorizontalStepperInternals;
  }

  // ===========================================================================
  // CLASSES (brutal)
  // ===========================================================================
  private brutalIndicatorClasses(isActive: boolean, isCompleted: boolean, isDisabled: boolean): string {
    return [
      'brutal-hs-dot flex items-center justify-center text-sm font-bold w-9 h-9',
      isActive ? 'is-active' : isCompleted ? 'is-completed' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalTitleClasses(isActive: boolean, isDisabled: boolean): string {
    return [
      'brutal-hs-title mt-2 text-xs font-bold text-center',
      isActive ? 'is-active' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private brutalDescriptionClasses(isDisabled: boolean): string {
    return ['brutal-hs-desc mt-1 text-[11px] text-center', isDisabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }

  private brutalContainerClasses(): string {
    return ['w-full', this.loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalLoading(): TemplateResult {
    return html`
      <div class="brutal-hs-loading flex items-center gap-2 text-sm">
        <span class="brutal-hs-loading-dot h-2 w-2"></span>
        <span>${this.gMsg.loading}</span>
      </div>
    `;
  }

  private brutalStep(step: ParsedStep, index: number, steps: ParsedStep[]): TemplateResult {
    const x = this.x;
    const isActive = index === this.value;
    const isCompleted = x.isStepCompleted(index, step);
    const isDisabled = this.disabled || this.loading || step.disabled || !x.canNavigateTo(index, step, steps);
    const indicatorClasses = this.brutalIndicatorClasses(isActive, isCompleted, isDisabled);
    const titleClasses = this.brutalTitleClasses(isActive, isDisabled);
    const descriptionClasses = this.brutalDescriptionClasses(isDisabled);
    const ariaLabel = isCompleted ? `${step.title} ${this.gMsg.completed}` : step.title;

    return html`
      <div class="flex flex-col items-center flex-none">
        <button
          class="${indicatorClasses}"
          type="button"
          role="tab"
          aria-selected="${isActive ? 'true' : 'false'}"
          aria-disabled="${isDisabled ? 'true' : 'false'}"
          aria-label="${ariaLabel}"
          tabindex="${x.focusedIndex === index ? '0' : '-1'}"
          @click=${() => x.handleStepClick(index, step, steps)}
          @focus=${() => x.handleFocus(index)}
        >
          ${step.iconHtml ? unsafeHTML(step.iconHtml) : html`<span>${index + 1}</span>`}
        </button>
        <div class="${titleClasses}">${step.title}</div>
        ${step.description ? html`<div class="${descriptionClasses}">${step.description}</div>` : html``}
      </div>
    `;
  }

  private brutalConnector(afterIndex: number): TemplateResult {
    const isCompleted = afterIndex < this.value;
    return html`
      <div class="flex-1 flex items-start pt-[18px] px-2">
        <div class="brutal-hs-connector h-0.5 w-full ${isCompleted ? 'is-completed' : ''}"></div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;
    const steps = x.getSteps();
    const labelText = x.getLabelText();
    const ariaLabel = labelText || this.gMsg.stepperLabel;

    return html`
      <div class="${this.brutalContainerClasses()}">
        ${labelText
          ? html`<div class="brutal-hs-label mb-3 text-sm font-bold">${unsafeHTML(this.getSlotContent('Label'))}</div>`
          : html``}
        <div
          class="flex items-start"
          role="tablist"
          aria-label="${ariaLabel}"
          aria-busy="${this.loading ? 'true' : 'false'}"
          @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e, steps)}
        >
          ${steps.map((step, index) => html`
            ${this.brutalStep(step, index, steps)}
            ${index < steps.length - 1 ? this.brutalConnector(index) : html``}
          `)}
        </div>
        ${this.loading ? html`<div class="mt-3">${this.brutalLoading()}</div>` : html``}
      </div>
    `;
  }
}
