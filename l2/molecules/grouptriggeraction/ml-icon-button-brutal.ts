/// <mls fileReference="_102054_/l2/molecules/grouptriggeraction/ml-icon-button-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ICON BUTTON — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de IconButtonMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { IconButtonMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-icon-button.js';

@customElement('grouptriggeraction--ml-icon-button-brutal')
export class IconButtonBrutal extends IconButtonMolecule {}
