/// <mls fileReference="_102054_/l2/molecules/groupviewcard/ml-profile-card-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// PROFILE CARD — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlProfileCardMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlProfileCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';

@customElement('groupviewcard--ml-profile-card-brutal')
export class MlProfileCardBrutal extends MlProfileCardMolecule {}
