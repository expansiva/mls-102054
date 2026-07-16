/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/ml-reveal-overlay-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// REVEAL OVERLAY — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de RevealOverlayMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { RevealOverlayMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-reveal-overlay.js';

@customElement('groupexpandcontent--ml-reveal-overlay-brutal')
export class RevealOverlayBrutal extends RevealOverlayMolecule {}
