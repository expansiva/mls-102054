/// <mls fileReference="_102054_/l2/molecules/grouprateitem/ml-star-rating-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// STAR RATING — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlStarRatingMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlStarRatingMolecule } from '/_102040_/l2/molecules/grouprateitem/ml-star-rating.js';

@customElement('grouprateitem--ml-star-rating-brutal')
export class MlStarRatingBrutal extends MlStarRatingMolecule {}
