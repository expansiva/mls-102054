/// <mls fileReference="_102054_/l2/molecules/groupshowprogress/ml-linear-progress-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// LINEAR PROGRESS — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de LinearProgressMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { LinearProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-linear-progress.js';

@customElement('groupshowprogress--ml-linear-progress-brutal')
export class LinearProgressBrutal extends LinearProgressMolecule {}
