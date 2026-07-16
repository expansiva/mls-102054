/// <mls fileReference="_102054_/l2/molecules/groupentertext/ml-tag-input-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TAG INPUT — BRUTALISM (mls-102054)
// =============================================================================
// Skill Group: groupEnterText
// Casca (estratégia D): herda tudo de MlTagInputMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlTagInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-tag-input.js';

@customElement('groupentertext--ml-tag-input-brutal')
export class MlTagInputBrutal extends MlTagInputMolecule {}
