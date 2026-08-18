/// <mls fileReference="_102054_/l2/molecules/groupenternumberinterval/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102054_/l2/molecules/groupenternumberinterval/ml-number-range-slider-brutal';

@customElement('molecules--groupenternumberinterval--index-102054')
export class GroupEnterNumberIntervalIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────
  @state() private cardBasicStartValue: number | null = 150;
  @state() private cardBasicEndValue: number | null = 850;
  @state() private cardDecimalStartValue: number | null = 62.5;
  @state() private cardDecimalEndValue: number | null = 87.5;

  // =========================================================================== RENDER
  render(): TemplateResult {
    return html`
      <div class="font-sans min-h-screen">
        ${this.renderHero()}
        ${this.renderShowcaseCards()}
        ${this.renderReferenceTable()}
      </div>
    `;
  }

  // =========================================================================== HERO
  private renderHero(): TemplateResult {
    return html`
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-20 text-center">
        <span class="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
          groupEnterNumberInterval
        </span>
        <h1 class="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-5 tracking-tight">
          Enter Number Interval
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Capture a numeric range with lower and upper values for price bands, age brackets, measurements, and bounded filters. The dual-handle range slider supports bounds, steps, decimals, locale formatting, and configurable gaps.
        </p>
      </header>
    `;
  }

  // =========================================================================== SHOWCASE CARDS
  private renderShowcaseCards(): TemplateResult {
    return html`
      <section class="bg-slate-50 dark:bg-slate-950 px-8 py-12 border-b border-slate-200 dark:border-slate-700">
        <div class="max-w-2xl mx-auto flex flex-col gap-5">
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="h-1 bg-violet-500 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-50">Price range slider</p>
                <code class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">ml-number-range-slider-brutal</code>
              </div>
              <p class="text-xs text-slate-400 mb-5">A bounded whole-number range for filtering products by price.</p>
              <groupenternumberinterval--ml-number-range-slider-brutal
                name="card-price-range"
                .startValue=${this.cardBasicStartValue}
                .endValue=${this.cardBasicEndValue}
                .min=${0}
                .max=${1000}
                .step=${50}
                .decimals=${0}
                .isEditing=${true}
                @change=${(e: CustomEvent<{ startValue: number | null; endValue: number | null }>) => {
                  this.cardBasicStartValue = e.detail.startValue;
                  this.cardBasicEndValue = e.detail.endValue;
                }}>
                <Label>Price range</Label>
                <LabelStart>From</LabelStart>
                <LabelEnd>To</LabelEnd>
                <Prefix>$</Prefix>
                <Suffix>USD</Suffix>
                <Helper>Choose a budget between $0 and $1,000.</Helper>
              </groupenternumberinterval--ml-number-range-slider-brutal>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="h-1 bg-emerald-500 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-50">Weight interval</p>
                <code class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">ml-number-range-slider-brutal</code>
              </div>
              <p class="text-xs text-slate-400 mb-5">A decimal range with a minimum distance between measurement limits.</p>
              <groupenternumberinterval--ml-number-range-slider-brutal
                name="card-weight-range"
                .startValue=${this.cardDecimalStartValue}
                .endValue=${this.cardDecimalEndValue}
                .min=${0}
                .max=${120}
                .step=${0.5}
                .decimals=${1}
                locale="en-US"
                .minGap=${5}
                .isEditing=${true}
                @change=${(e: CustomEvent<{ startValue: number | null; endValue: number | null }>) => {
                  this.cardDecimalStartValue = e.detail.startValue;
                  this.cardDecimalEndValue = e.detail.endValue;
                }}>
                <Label>Acceptable weight</Label>
                <LabelStart>Minimum</LabelStart>
                <LabelEnd>Maximum</LabelEnd>
                <Prefix></Prefix>
                <Suffix>kg</Suffix>
                <Helper>The selected limits must be at least 5 kg apart.</Helper>
              </groupenternumberinterval--ml-number-range-slider-brutal>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // =========================================================================== REFERENCE TABLE
  private renderReferenceTable(): TemplateResult {
    const rows: Array<{ scenario: string; mlNumberRangeSliderBrutal: boolean }> = [
      { scenario: 'Filter products or records by a continuous numeric range', mlNumberRangeSliderBrutal: true },
      { scenario: 'Set lower and upper values with bounded min/max limits', mlNumberRangeSliderBrutal: true },
      { scenario: 'Use decimal increments and locale-aware display formatting', mlNumberRangeSliderBrutal: true },
      { scenario: 'Enforce a minimum or maximum gap between interval values', mlNumberRangeSliderBrutal: true },
    ];
    const headers = [
      { label: 'Range slider', cls: 'text-violet-600 dark:text-violet-400' },
    ];

    return html`
      <section class="bg-slate-100 dark:bg-slate-950 px-8 py-20 border-t border-slate-200 dark:border-slate-700">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Quick reference</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8">Use the range slider when users benefit from adjusting both ends of a bounded numeric interval visually, with optional precision and gap constraints.</p>
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide w-3/4">Scenario</th>
                  ${headers.map(h => html`
                    <th class="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide ${h.cls}">${h.label}</th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr class="${i % 2 !== 0 ? 'bg-slate-50/60 dark:bg-slate-900/40' : ''} border-b border-slate-100 dark:border-slate-700/60 last:border-0">
                    <td class="px-5 py-3.5 text-slate-700 dark:text-slate-300">${row.scenario}</td>
                    ${([row.mlNumberRangeSliderBrutal] as boolean[]).map(ok => html`
                      <td class="px-4 py-3.5 text-center">
                        ${ok
                          ? html`<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓</span>`
                          : html`<span class="text-slate-200 dark:text-slate-700 text-sm">—</span>`}
                      </td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }
}
