/// <mls fileReference="_102054_/l2/molecules/groupenternumberinterval/ml-number-range-slider-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NUMBER RANGE SLIDER — BRUTALISM (mls-102054)
// =============================================================================
// Skill Group: groupEnterNumberInterval
// Shell (Strategy D): inherits everything from MlNumberRangeSliderMolecule (mls-102040),
// including render() — the base markup emits semantic ml-* classes; the appearance
// comes from the sibling .less, scoped under this tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlNumberRangeSliderMolecule } from '/_102040_/l2/molecules/groupenternumberinterval/ml-number-range-slider.js';

@customElement('groupenternumberinterval--ml-number-range-slider-brutal')
export class MlNumberRangeSliderMoleculeBrutal extends MlNumberRangeSliderMolecule {}
