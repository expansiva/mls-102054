/// <mls fileReference="_102054_/l2/molecules/groupselectfileforupload/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102054_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone-brutal';

@customElement('molecules--groupselectfileforupload--index-102054')
export class GroupSelectFileForUploadIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:#f5f5f5; font-family:'JetBrains Mono',monospace;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:#fff; color:#000; border:2px solid #000; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSelectFileForUpload · brutalism · 102054</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#000; text-transform:uppercase; margin-bottom:0.5rem;">Select File For Upload</h1>
        </header>
        <section style="max-width:32rem; margin:0 auto;">
          <div style="background:#fff; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.5rem;">
            <groupselectfileforupload--ml-file-upload-dropzone-brutal multiple accept="image/*" max-files="5" max-size-kb="2048">
              <Label>Imagens</Label>
              <Helper>Até 5 imagens, máx. 2 MB cada</Helper>
            </groupselectfileforupload--ml-file-upload-dropzone-brutal>
          </div>
        </section>
      </div>
    `;
  }
}
