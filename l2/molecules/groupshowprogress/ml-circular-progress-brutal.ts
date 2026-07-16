/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-circular-progress-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CIRCULAR PROGRESS — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de CircularProgressMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { CircularProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-circular-progress.js';

@customElement('groupshowprogress--ml-circular-progress-brutal')
export class CircularProgressBrutal extends CircularProgressMolecule {}
