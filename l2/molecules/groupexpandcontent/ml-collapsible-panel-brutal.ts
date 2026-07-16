/// <mls fileReference="_102054_/l2/molecules/groupexpandcontent/ml-collapsible-panel-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COLLAPSIBLE PANEL — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlCollapsiblePanelMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlCollapsiblePanelMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-collapsible-panel.js';

@customElement('groupexpandcontent--ml-collapsible-panel-brutal')
export class MlCollapsiblePanelBrutal extends MlCollapsiblePanelMolecule {}
