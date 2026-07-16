/// <mls fileReference="_102054_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// HORIZONTAL STEPPER — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlHorizontalStepperMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlHorizontalStepperMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper.js';

@customElement('groupnavigatesteps--ml-horizontal-stepper-brutal')
export class MlHorizontalStepperBrutal extends MlHorizontalStepperMolecule {}
