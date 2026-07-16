/// <mls fileReference="_102054_/l2/molecules/groupentertime/ml-clock-time-picker-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CLOCK TIME PICKER — BRUTALISM (mls-102054)
// =============================================================================
// Skill Group: enter + time
// Casca (estratégia D): herda tudo de ClockTimePickerMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// brutal vem do .less irmão, escopado sob esta tag. Sem portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { ClockTimePickerMolecule } from '/_102040_/l2/molecules/groupentertime/ml-clock-time-picker.js';

@customElement('groupentertime--ml-clock-time-picker-brutal')
export class ClockTimePickerBrutal extends ClockTimePickerMolecule {}
