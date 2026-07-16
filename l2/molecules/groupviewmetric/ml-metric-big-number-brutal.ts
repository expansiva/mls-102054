/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-big-number-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC BIG NUMBER — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlMetricBigNumberMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlMetricBigNumberMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

@customElement('groupviewmetric--ml-metric-big-number-brutal')
export class MlMetricBigNumberBrutal extends MlMetricBigNumberMolecule {}
