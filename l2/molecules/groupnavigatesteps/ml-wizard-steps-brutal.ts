/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/ml-wizard-steps-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// WIZARD STEPS — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlWizardStepsMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlWizardStepsMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-wizard-steps.js';

@customElement('groupnavigatesteps--ml-wizard-steps-brutal')
export class MlWizardStepsBrutal extends MlWizardStepsMolecule {}
