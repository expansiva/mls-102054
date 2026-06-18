/// <mls fileReference="_102054_/l2/molecules/groupenterdatetime/ml-datetime-picker.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DATETIME PICKER MOLECULE — GLASSMORPHISM (mls-102054)
// =============================================================================
// Skill Group: enter + datetime
// Mesma molécula/contrato do mls-102040. Lógica intacta. Aparência (vidro) no .less.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, state } from 'lit/decorators.js';
import { propertyDataSource } from '/_102029_/l2/collabDecorators';
import { MoleculeAuraElement } from '/_102033_/l2/moleculeBase.js';
/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select date and time',
  loading: 'Loading...',
  confirm: 'Confirm',
  clear: 'Clear',
  empty: '—',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione data e hora',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    clear: 'Limpar',
    empty: '—',
  },
  de: {
    placeholder: 'Datum und Uhrzeit wählen',
    loading: 'Laden...',
    confirm: 'Bestätigen',
    clear: 'Löschen',
    empty: '—',
  },
};
/// **collab_i18n_end**
@customElement('groupenterdatetime--ml-datetime-picker')
export class MlDatetimePickerMolecule extends MoleculeAuraElement {
  private msg: MessageType = messages.en;
  // ===========================================================================
  // SLOT TAGS
  // ===========================================================================
  slotTags = ['Label', 'Helper'];
  // ===========================================================================
  // PROPERTIES — From Contract
  // ===========================================================================
  @propertyDataSource({ type: String })
  value: string | null = null;
  @propertyDataSource({ type: String })
  error: string = '';
  @propertyDataSource({ type: String })
  name: string = '';
  @propertyDataSource({ type: String })
  locale: string = '';
  @propertyDataSource({ type: String })
  timezone: string = '';
  @propertyDataSource({ type: String, attribute: 'min-datetime' })
  minDatetime: string = '';
  @propertyDataSource({ type: String, attribute: 'max-datetime' })
  maxDatetime: string = '';
  @propertyDataSource({ type: Number, attribute: 'minute-step' })
  minuteStep: number = 1;
  @propertyDataSource({ type: String })
  placeholder: string = '';
  @propertyDataSource({ type: Boolean, attribute: 'is-editing' })
  isEditing: boolean = true;
  @propertyDataSource({ type: Boolean })
  disabled: boolean = false;
  @propertyDataSource({ type: Boolean })
  readonly: boolean = false;
  @propertyDataSource({ type: Boolean })
  required: boolean = false;
  @propertyDataSource({ type: Boolean })
  loading: boolean = false;
  // ===========================================================================
  // INTERNAL STATE
  // ===========================================================================
  @state()
  private isOpen = false;
  @state()
  private isFocused = false;
  @state()
  private displayValue = '';
  @state()
  private selectedDate: string | null = null; // YYYY-MM-DD
  @state()
  private selectedHour: number | null = null;
  @state()
  private selectedMinute: number | null = null;
  @state()
  private currentMonth: Date = new Date();

  private labelId = `ml-dt-label-${Math.random().toString(36).slice(2)}`;
  private helperId = `ml-dt-helper-${Math.random().toString(36).slice(2)}`;
  private errorId = `ml-dt-error-${Math.random().toString(36).slice(2)}`;
  private documentClickBound = false;

  createRenderRoot() {
    return this;
  }
  // ===========================================================================
  // STATE CHANGE HANDLER
  // ===========================================================================
  handleIcaStateChange(key: string, value: any) {
    const valueAttr = this.getAttribute('value');
    const localeAttr = this.getAttribute('locale');
    const timezoneAttr = this.getAttribute('timezone');
    if (valueAttr === `{{${key}}}`) {
      this.updateFromValue(value as string | null);
      this.updateDisplay(value as string | null);
    }
    if (localeAttr === `{{${key}}}` || timezoneAttr === `{{${key}}}`) {
      this.updateDisplay(this.value);
    }
    this.requestUpdate();
  }
  // ===========================================================================
  // LIFECYCLE
  // ===========================================================================
  disconnectedCallback() {
    this.removeDocumentListener();
    super.disconnectedCallback();
  }
  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  private handleTriggerClick() {
    if (!this.isEditing || this.disabled || this.readonly || this.loading) return;
    if (this.isOpen) {
      this.closePicker();
    } else {
      this.openPicker();
    }
  }
  private handleFocus() {
    if (this.disabled || this.readonly || this.loading || !this.isEditing) return;
    this.isFocused = true;
    this.dispatchEvent(new CustomEvent('focus', { bubbles: true, composed: true }));
  }
  private handleBlur() {
    this.isFocused = false;
    this.dispatchEvent(new CustomEvent('blur', { bubbles: true, composed: true }));
  }
  private handleDaySelect(dateStr: string, disabled: boolean) {
    if (disabled) return;
    this.selectedDate = dateStr;
    const validTime = this.getFirstValidTime();
    if (this.selectedHour === null || this.selectedMinute === null || this.isTimeDisabled(this.selectedHour, this.selectedMinute)) {
      this.selectedHour = validTime ? validTime.hour : null;
      this.selectedMinute = validTime ? validTime.minute : null;
    }
  }
  private handleHourSelect(hour: number, disabled: boolean) {
    if (disabled) return;
    this.selectedHour = hour;
    if (this.selectedMinute === null || this.isTimeDisabled(hour, this.selectedMinute)) {
      const firstMinute = this.getFirstValidMinute(hour);
      this.selectedMinute = firstMinute;
    }
  }
  private handleMinuteSelect(minute: number, disabled: boolean) {
    if (disabled) return;
    this.selectedMinute = minute;
  }
  private handleConfirm() {
    if (!this.selectedDate) return;
    if (this.selectedHour === null || this.selectedMinute === null) {
      const valid = this.getFirstValidTime();
      if (!valid) return;
      this.selectedHour = valid.hour;
      this.selectedMinute = valid.minute;
    }
    if (this.isTimeDisabled(this.selectedHour!, this.selectedMinute!)) return;
    const value = `${this.selectedDate}T${this.pad(this.selectedHour!)}:${this.pad(this.selectedMinute!)}:00`;
    this.value = value;
    this.updateDisplay(value);
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
    this.closePicker();
  }
  private handleClear() {
    this.value = null;
    this.selectedDate = null;
    this.selectedHour = null;
    this.selectedMinute = null;
    this.updateDisplay(null);
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
    this.closePicker();
  }
  private handlePrevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
  }
  private handleNextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }
  // ===========================================================================
  // PICKER OPEN/CLOSE
  // ===========================================================================
  private openPicker() {
    this.isOpen = true;
    this.prepareOpenState();
    this.addDocumentListener();
  }
  private closePicker() {
    this.isOpen = false;
    this.removeDocumentListener();
  }
  private addDocumentListener() {
    if (this.documentClickBound) return;
    this.documentClickBound = true;
    document.addEventListener('click', this.handleDocumentClick);
  }
  private removeDocumentListener() {
    if (!this.documentClickBound) return;
    this.documentClickBound = false;
    document.removeEventListener('click', this.handleDocumentClick);
  }
  private handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!this.contains(target)) {
      this.closePicker();
    }
  };
  private prepareOpenState() {
    this.updateFromValue(this.value);
    if (this.selectedDate) {
      const parsed = this.parseIso(this.value || '');
      if (parsed) {
        this.currentMonth = new Date(parsed.year, parsed.month - 1, 1);
      }
    } else {
      const today = new Date();
      this.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    }
  }
  // ===========================================================================
  // VALUE AND FORMAT HELPERS
  // ===========================================================================
  private updateFromValue(value: string | null) {
    if (!value) {
      this.selectedDate = null;
      this.selectedHour = null;
      this.selectedMinute = null;
      return;
    }
    const parsed = this.parseIso(value);
    if (!parsed) return;
    this.selectedDate = `${parsed.year}-${this.pad(parsed.month)}-${this.pad(parsed.day)}`;
    this.selectedHour = parsed.hour;
    this.selectedMinute = parsed.minute;
  }
  private updateDisplay(value: string | null) {
    this.displayValue = this.formatDisplay(value);
  }
  private formatDisplay(value: string | null): string {
    if (!value) return '';
    const parsed = this.parseIso(value);
    if (!parsed) return '';
    const date = this.timezone
      ? new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute, parsed.second))
      : new Date(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute, parsed.second);
    const formatter = new Intl.DateTimeFormat(this.locale || undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: this.timezone || undefined,
    });
    return formatter.format(date);
  }
  private parseIso(value: string): { year: number; month: number; day: number; hour: number; minute: number; second: number } | null {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
    if (!match) return null;
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
      hour: Number(match[4]),
      minute: Number(match[5]),
      second: Number(match[6] || '0'),
    };
  }
  private pad(value: number): string {
    return String(value).padStart(2, '0');
  }
  private getMinuteOptions(): number[] {
    const step = Math.max(1, Math.min(60, this.minuteStep || 1));
    const result: number[] = [];
    for (let m = 0; m < 60; m += step) result.push(m);
    return result;
  }
  private parseMinMax(value: string): Date | null {
    const parsed = this.parseIso(value);
    if (!parsed) return null;
    return new Date(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute, parsed.second);
  }
  private getMinDate(): Date | null {
    return this.minDatetime ? this.parseMinMax(this.minDatetime) : null;
  }
  private getMaxDate(): Date | null {
    return this.maxDatetime ? this.parseMinMax(this.maxDatetime) : null;
  }
  private isDateDisabled(year: number, month: number, day: number): boolean {
    const min = this.getMinDate();
    const max = this.getMaxDate();
    const date = new Date(year, month, day, 0, 0, 0);
    if (min) {
      const minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate(), 0, 0, 0);
      if (date < minDate) return true;
    }
    if (max) {
      const maxDate = new Date(max.getFullYear(), max.getMonth(), max.getDate(), 0, 0, 0);
      if (date > maxDate) return true;
    }
    return false;
  }
  private isTimeDisabled(hour: number, minute: number): boolean {
    if (!this.selectedDate) return true;
    const min = this.getMinDate();
    const max = this.getMaxDate();
    const [y, m, d] = this.selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d, hour, minute, 0);
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }
  private getFirstValidTime(): { hour: number; minute: number } | null {
    if (!this.selectedDate) return null;
    const minutes = this.getMinuteOptions();
    for (let h = 0; h < 24; h += 1) {
      for (const m of minutes) {
        if (!this.isTimeDisabled(h, m)) return { hour: h, minute: m };
      }
    }
    return null;
  }
  private getFirstValidMinute(hour: number): number | null {
    const minutes = this.getMinuteOptions();
    for (const m of minutes) {
      if (!this.isTimeDisabled(hour, m)) return m;
    }
    return null;
  }
  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private getTriggerClasses(): string {
    return [
      'glass-dtp-trigger w-full flex items-center justify-between gap-3 px-3 py-2 text-sm',
      this.isFocused ? 'is-focused' : '',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }
  private getLabelClasses(): string {
    return ['glass-dtp-label text-sm font-medium', this.disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private getPanelClasses(): string {
    return 'glass-dtp-panel absolute z-20 mt-2 w-full p-4';
  }
  private getDayButtonClasses(selected: boolean, disabled: boolean, today: boolean): string {
    return [
      'glass-dtp-day h-8 w-8 text-xs',
      selected ? 'is-selected' : '',
      today && !selected ? 'is-today' : '',
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }
  private getTimeButtonClasses(selected: boolean, disabled: boolean): string {
    return [
      'glass-dtp-time w-full px-2 py-1 text-xs text-left',
      selected ? 'is-selected' : '',
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }
  private getAriaDescribedBy(): string | undefined {
    if (this.error) return this.errorId;
    if (this.hasSlot('Helper')) return this.helperId;
    return undefined;
  }
  private getWeekdays(): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale || undefined, { weekday: 'short' });
    const base = new Date(2021, 7, 1); // Sunday
    return Array.from({ length: 7 }).map((_, i) => formatter.format(new Date(base.getTime() + i * 86400000)));
  }
  private renderLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id=${this.labelId} class=${this.getLabelClasses()}>
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-dtp-req ml-1">*</span>` : nothing}
      </label>
    `;
  }
  private renderHiddenInput(): TemplateResult {
    if (!this.name) return html``;
    return html`<input type="hidden" name=${this.name} .value=${this.value || ''} />`;
  }
  private renderHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id=${this.errorId} class="glass-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id=${this.helperId} class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private renderTrigger(): TemplateResult {
    const placeholder = this.placeholder || this.msg.placeholder;
    const display = this.displayValue || this.formatDisplay(this.value);
    const text = display || placeholder;
    return html`
      <button
        class=${this.getTriggerClasses()}
        type="button"
        aria-labelledby=${ifDefined(this.hasSlot('Label') ? this.labelId : undefined)}
        aria-describedby=${ifDefined(this.getAriaDescribedBy())}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-required=${this.required ? 'true' : 'false'}
        aria-label=${text}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @click=${this.handleTriggerClick}
        ?disabled=${this.disabled || this.loading}
      >
        <span class="glass-dtp-value flex-1 text-left truncate ${this.value ? 'has-value' : ''}">${text}</span>
        <span class="glass-dtp-icon flex items-center gap-2">
          ${this.loading
            ? html`<span class="glass-dtp-spinner h-4 w-4 animate-spin rounded-full"></span>`
            : html`
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${svg`<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>`}
                  ${svg`<line x1="16" y1="2" x2="16" y2="6"></line>`}
                  ${svg`<line x1="8" y1="2" x2="8" y2="6"></line>`}
                  ${svg`<line x1="3" y1="10" x2="21" y2="10"></line>`}
                </svg>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${svg`<circle cx="12" cy="12" r="9"></circle>`}
                  ${svg`<polyline points="12 7 12 12 15 15"></polyline>`}
                </svg>
              `}
        </span>
      </button>
    `;
  }
  private renderCalendar(): TemplateResult {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: TemplateResult[] = [];
    for (let i = 0; i < firstDay; i += 1) {
      cells.push(html`<div></div>`);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateStr = `${year}-${this.pad(month + 1)}-${this.pad(day)}`;
      const disabled = this.isDateDisabled(year, month, day);
      const selected = this.selectedDate === dateStr;
      const today = (() => {
        const t = new Date();
        return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
      })();
      cells.push(html`
        <button
          class=${this.getDayButtonClasses(selected, disabled, today)}
          role="gridcell"
          aria-selected=${selected ? 'true' : 'false'}
          aria-disabled=${disabled ? 'true' : 'false'}
          @click=${() => this.handleDaySelect(dateStr, disabled)}
          ?disabled=${disabled}
        >
          ${day}
        </button>
      `);
    }
    const weekdayNames = this.getWeekdays();
    return html`
      <div class="flex items-center justify-between mb-2">
        <button type="button" class="glass-dtp-nav px-2 py-1 text-xs" @click=${this.handlePrevMonth}>‹</button>
        <div class="glass-dtp-month text-sm font-medium">
          ${new Intl.DateTimeFormat(this.locale || undefined, { month: 'long', year: 'numeric' }).format(this.currentMonth)}
        </div>
        <button type="button" class="glass-dtp-nav px-2 py-1 text-xs" @click=${this.handleNextMonth}>›</button>
      </div>
      <div class="grid grid-cols-7 gap-1 mb-2 text-[10px] glass-dtp-weekday">
        ${weekdayNames.map((d) => html`<div class="text-center">${d}</div>`)}
      </div>
      <div class="grid grid-cols-7 gap-1">
        ${cells}
      </div>
    `;
  }
  private renderTime(): TemplateResult {
    const minutes = this.getMinuteOptions();
    return html`
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1 max-h-40 overflow-auto">
          ${Array.from({ length: 24 }).map((_, hour) => {
            const disabled = this.isTimeDisabled(hour, this.selectedMinute ?? 0) || !this.selectedDate;
            const selected = this.selectedHour === hour;
            return html`
              <button class=${this.getTimeButtonClasses(selected, disabled)} @click=${() => this.handleHourSelect(hour, disabled)} ?disabled=${disabled}>
                ${this.pad(hour)}
              </button>
            `;
          })}
        </div>
        <div class="flex flex-col gap-1 max-h-40 overflow-auto">
          ${minutes.map((minute) => {
            const disabled = this.selectedHour === null || this.isTimeDisabled(this.selectedHour, minute) || !this.selectedDate;
            const selected = this.selectedMinute === minute;
            return html`
              <button class=${this.getTimeButtonClasses(selected, disabled)} @click=${() => this.handleMinuteSelect(minute, disabled)} ?disabled=${disabled}>
                ${this.pad(minute)}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
  private renderPanel(): TemplateResult {
    if (!this.isOpen) return html``;
    return html`
      <div class=${this.getPanelClasses()} role="dialog" aria-modal="true">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>${this.renderCalendar()}</div>
          <div>${this.renderTime()}</div>
        </div>
        <div class="mt-4 flex items-center justify-end gap-2">
          <button type="button" class="glass-dtp-clear px-3 py-1 text-xs" @click=${this.handleClear}>${this.msg.clear}</button>
          <button type="button" class="glass-dtp-confirm px-3 py-1 text-xs" @click=${this.handleConfirm}>${this.msg.confirm}</button>
        </div>
      </div>
    `;
  }
  // ===========================================================================
  // RENDER
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.msg = messages[lang];
    if (!this.isEditing) {
      const display = this.displayValue || this.formatDisplay(this.value) || this.msg.empty;
      return html`
        <div class="flex flex-col gap-1">
          ${this.renderHiddenInput()}
          ${this.renderLabel()}
          <div class="glass-dtp-view text-sm">${display}</div>
        </div>
      `;
    }
    return html`
      <div class="relative flex flex-col gap-1">
        ${this.renderHiddenInput()}
        ${this.renderLabel()}
        ${this.renderTrigger()}
        ${this.renderPanel()}
        ${this.renderHelperOrError()}
      </div>
    `;
  }
}
