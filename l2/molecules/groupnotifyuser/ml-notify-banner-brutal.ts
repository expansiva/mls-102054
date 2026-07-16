/// <mls fileReference="_102054_/l2/molecules/groupnotifyuser/ml-notify-banner-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NOTIFY BANNER — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de NotifyBannerMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { NotifyBannerMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';

@customElement('groupnotifyuser--ml-notify-banner-brutal')
export class NotifyBannerBrutal extends NotifyBannerMolecule {}
