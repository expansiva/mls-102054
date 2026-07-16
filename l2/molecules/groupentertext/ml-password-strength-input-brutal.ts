/// <mls fileReference="_102054_/l2/molecules/groupentertext/ml-password-strength-input-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// PASSWORD STRENGTH INPUT — BRUTALISM (mls-102054) — Strategy D
// =============================================================================
// Shell: herda tudo de PasswordStrengthInputMolecule (mls-102040).
// O render() herdado emite classes ml-*; toda a aparência vive no .less.
import { customElement } from 'lit/decorators.js';
import { PasswordStrengthInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-password-strength-input.js';

@customElement('groupentertext--ml-password-strength-input-brutal')
export class PasswordStrengthInputBrutal extends PasswordStrengthInputMolecule {}
