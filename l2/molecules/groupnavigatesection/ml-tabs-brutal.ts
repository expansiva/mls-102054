/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-tabs-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TABS — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlTabsMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlTabsMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-tabs.js';

@customElement('groupnavigatesection--ml-tabs-brutal')
export class MlTabsBrutal extends MlTabsMolecule {}
