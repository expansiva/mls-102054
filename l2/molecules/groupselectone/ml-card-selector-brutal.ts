/// <mls fileReference="_102054_/l2/molecules/groupselectone/ml-card-selector-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CARD SELECTOR — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlCardSelectorMolecule (mls-102040), inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlCardSelectorMolecule } from '/_102040_/l2/molecules/groupselectone/ml-card-selector.js';

@customElement('groupselectone--ml-card-selector-brutal')
export class MlCardSelectorBrutal extends MlCardSelectorMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o conteúdo por div[data-widget="...-brutal"].
  protected portalWidgetName = 'groupselectone--ml-card-selector-brutal';
}
