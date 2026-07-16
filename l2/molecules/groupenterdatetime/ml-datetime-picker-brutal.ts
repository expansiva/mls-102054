/// <mls fileReference="_102054_/l2/molecules/groupenterdatetime/ml-datetime-picker-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DATETIME PICKER — BRUTALISM (mls-102054)
// =============================================================================
// Skill Group: enter + datetime
// Casca (estratégia D): herda tudo de MlDatetimePickerMolecule (mls-102040),
// inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlDatetimePickerMolecule } from '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';

@customElement('groupenterdatetime--ml-datetime-picker-brutal')
export class DatetimePickerBrutal extends MlDatetimePickerMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o painel por div[data-widget="...-brutal"].
  protected portalWidgetName = 'groupenterdatetime--ml-datetime-picker-brutal';
}
