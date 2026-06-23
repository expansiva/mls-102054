/// <mls fileReference="_102054_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// FILE UPLOAD DROPZONE — BRUTALISM por HERANÇA (mls-102054)
// =============================================================================
// Skill Group: groupSelectFileForUpload
// Herda MlFileUploadDropzoneMolecule (mls-102040): drag-and-drop, validação por
// type/size/count, eventos reject, value (File[]), estado (isDragging).
// Sobrescreve apenas render() + helpers presentacionais com classes brutal.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlFileUploadDropzoneMolecule } from '/_102040_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone.js';

/// **collab_i18n_start**
const message_en = {
  defaultTriggerTitle: 'Drag and drop files here',
  defaultTriggerSubtitle: 'or click to select files',
  loading: 'Uploading...',
  remove: 'Remove',
  noFiles: 'No files selected',
  ariaZone: 'File upload drop zone',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    defaultTriggerTitle: 'Arraste e solte arquivos aqui',
    defaultTriggerSubtitle: 'ou clique para selecionar arquivos',
    loading: 'Enviando...',
    remove: 'Remover',
    noFiles: 'Nenhum arquivo selecionado',
    ariaZone: 'Área de upload de arquivos',
  },
};
/// **collab_i18n_end**

interface FileUploadDropzoneInternals {
  isDragging: boolean;
  handleZoneClick(): void;
  handleZoneKeydown(e: KeyboardEvent): void;
  handleDragOver(e: DragEvent): void;
  handleDragLeave(): void;
  handleDrop(e: DragEvent): void;
  handleInputChange(e: Event): void;
  handleRemoveFile(index: number): void;
  formatFileSize(size: number): string;
  inputId: string;
}

@customElement('groupselectfileforupload--ml-file-upload-dropzone-brutal')
export class MlFileUploadDropzoneBrutal extends MlFileUploadDropzoneMolecule {
  private gMsg: MessageType = messages.en;
  private gLabelId = `file-upload-brutal-label-${Math.random().toString(36).slice(2)}`;
  private gErrorId = `file-upload-brutal-error-${Math.random().toString(36).slice(2)}`;

  private get x(): FileUploadDropzoneInternals {
    return this as unknown as FileUploadDropzoneInternals;
  }

  // ===========================================================================
  // RENDER HELPERS (brutal)
  // ===========================================================================
  private brutalTriggerContent(): TemplateResult {
    if (this.hasSlot('Trigger')) {
      return html`<div class="brutal-dz-trigger-slot text-sm">${unsafeHTML(this.getSlotContent('Trigger'))}</div>`;
    }

    return html`
      <div class="flex flex-col items-center gap-2 text-center">
        <div class="brutal-dz-icon flex h-12 w-12 items-center justify-center">
          <svg viewBox="0 0 24 24" class="h-6 w-6" aria-hidden="true">
            ${svg`<path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L11 12.59V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1Z"/>`}
          </svg>
        </div>
        <div class="brutal-dz-title text-sm font-bold">${this.gMsg.defaultTriggerTitle}</div>
        <div class="brutal-dz-subtitle text-xs">${this.gMsg.defaultTriggerSubtitle}</div>
      </div>
    `;
  }

  private brutalFileList(): TemplateResult {
    const x = this.x;
    if (!this.value || this.value.length === 0) {
      return html``;
    }

    return html`
      <ul class="space-y-2">
        ${this.value.map(
          (file, index) => html`
            <li class="brutal-dz-file flex items-center justify-between px-3 py-2">
              <div class="min-w-0">
                <div class="brutal-dz-file-name truncate text-sm">${file.name}</div>
                <div class="brutal-dz-file-size text-xs">${x.formatFileSize(file.size)}</div>
              </div>
              <button
                type="button"
                class="brutal-dz-remove text-xs"
                @click=${() => x.handleRemoveFile(index)}
                ?disabled=${this.disabled || this.loading}
              >
                ${this.gMsg.remove}
              </button>
            </li>
          `
        )}
      </ul>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    const hasError = !!this.error;
    const hasLabel = this.hasSlot('Label');
    const hasHelper = this.hasSlot('Helper');

    const containerClasses = ['w-full', 'space-y-2'].join(' ');

    const dropzoneClasses = [
      'brutal-dz-zone w-full p-6',
      hasError ? 'is-error' : '',
      x.isDragging ? 'is-dragging' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class=${containerClasses}>
        ${hasLabel
          ? html`<label id=${this.gLabelId} class="brutal-dz-label text-sm font-bold">
              ${unsafeHTML(this.getSlotContent('Label'))}
            </label>`
          : html``}

        <div
          class=${dropzoneClasses}
          role="button"
          tabindex=${this.disabled || this.loading ? '-1' : '0'}
          aria-labelledby=${hasLabel ? this.gLabelId : ''}
          aria-label=${hasLabel ? '' : this.gMsg.ariaZone}
          aria-invalid=${hasError ? 'true' : 'false'}
          aria-describedby=${hasError ? this.gErrorId : ''}
          @click=${() => x.handleZoneClick()}
          @keydown=${(e: KeyboardEvent) => x.handleZoneKeydown(e)}
          @dragover=${(e: DragEvent) => x.handleDragOver(e)}
          @dragleave=${() => x.handleDragLeave()}
          @drop=${(e: DragEvent) => x.handleDrop(e)}
        >
          ${this.brutalTriggerContent()}
          <input
            id=${x.inputId}
            type="file"
            class="hidden"
            ?multiple=${this.multiple}
            accept=${this.accept}
            @change=${(e: Event) => x.handleInputChange(e)}
          />
        </div>

        ${this.brutalFileList()}

        ${this.loading
          ? html`<div class="brutal-dz-loading text-xs">${this.gMsg.loading}</div>`
          : html``}

        ${hasError
          ? html`<p id=${this.gErrorId} class="brutal-error-text text-xs">
              ${unsafeHTML(String(this.error))}
            </p>`
          : hasHelper
          ? html`<p class="brutal-helper text-xs">
              ${unsafeHTML(this.getSlotContent('Helper'))}
            </p>`
          : html``}
      </div>
    `;
  }
}
