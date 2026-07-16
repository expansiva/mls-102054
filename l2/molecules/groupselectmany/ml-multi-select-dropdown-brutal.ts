/// <mls fileReference="_102054_/l2/molecules/groupselectmany/ml-multi-select-dropdown-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// MULTI SELECT DROPDOWN — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MultiSelectDropdownMolecule (mls-102040), inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MultiSelectDropdownMolecule } from '/_102040_/l2/molecules/groupselectmany/ml-multi-select-dropdown.js';

@customElement('groupselectmany--ml-multi-select-dropdown-brutal')
export class MultiSelectDropdownBrutal extends MultiSelectDropdownMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o conteúdo por div[data-widget="...-brutal"].
  protected portalWidgetName = 'groupselectmany--ml-multi-select-dropdown-brutal';
}
