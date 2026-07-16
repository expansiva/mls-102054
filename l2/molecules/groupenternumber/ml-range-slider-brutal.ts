/// <mls fileReference="_102054_/l2/molecules/groupenternumber/ml-range-slider-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RANGE SLIDER — BRUTALISM (mls-102054)
// =============================================================================
// Skill Group: groupEnterNumber
// Casca (estratégia D): herda tudo de RangeSliderMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { RangeSliderMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-range-slider.js';

@customElement('groupenternumber--ml-range-slider-brutal')
export class RangeSliderBrutal extends RangeSliderMolecule {}
