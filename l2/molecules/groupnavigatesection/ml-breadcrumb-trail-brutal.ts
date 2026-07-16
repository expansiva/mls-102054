/// <mls fileReference="_102054_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BREADCRUMB TRAIL — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de BreadcrumbTrailMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { BreadcrumbTrailMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail.js';

@customElement('groupnavigatesection--ml-breadcrumb-trail-brutal')
export class BreadcrumbTrailBrutal extends BreadcrumbTrailMolecule {}
