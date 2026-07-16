/// <mls fileReference="_102054_/l2/molecules/groupviewmetric/ml-metric-card-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC CARD — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MetricCardMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MetricCardMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';

@customElement('groupviewmetric--ml-metric-card-brutal')
export class MetricCardBrutal extends MetricCardMolecule {}
