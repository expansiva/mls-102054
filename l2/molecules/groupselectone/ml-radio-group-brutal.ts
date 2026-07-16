/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-radio-group-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RADIO GROUP — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlRadioGroupMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlRadioGroupMolecule } from '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';

@customElement('groupselectone--ml-radio-group-brutal')
export class MlRadioGroupBrutal extends MlRadioGroupMolecule {}
