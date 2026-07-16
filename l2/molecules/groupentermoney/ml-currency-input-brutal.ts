/// <mls fileReference="_102054_/l2/molecules/groupentermoney/ml-currency-input-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CURRENCY INPUT — BRUTALISM (mls-102054) — Strategy D shell
// =============================================================================
// Herda tudo de GroupEnterMoneyMlCurrencyInputMolecule (mls-102040): render(),
// parsing BigInt, clamp min/max, formatação Intl. Toda a aparência vive no
// .less homônimo, escopado na tag -brutal.
import { customElement } from 'lit/decorators.js';
import { GroupEnterMoneyMlCurrencyInputMolecule } from '/_102040_/l2/molecules/groupentermoney/ml-currency-input.js';

@customElement('groupentermoney--ml-currency-input-brutal')
export class CurrencyInputBrutal extends GroupEnterMoneyMlCurrencyInputMolecule {}
