/// <mls fileReference="_102054_/l2/molecules/groupnavigatemain/ml-sidebar-nav-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SIDEBAR NAV — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlSidebarNavMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlSidebarNavMolecule } from '/_102040_/l2/molecules/groupnavigatemain/ml-sidebar-nav.js';

@customElement('groupnavigatemain--ml-sidebar-nav-brutal')
export class MlSidebarNavBrutal extends MlSidebarNavMolecule {}
