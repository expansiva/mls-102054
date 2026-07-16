/// <mls fileReference="_102054_/l2/molecules/groupviewcard/ml-vertical-card-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// VERTICAL CARD — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlVerticalCardMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlVerticalCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

@customElement('groupviewcard--ml-vertical-card-brutal')
export class MlVerticalCardBrutal extends MlVerticalCardMolecule {}
