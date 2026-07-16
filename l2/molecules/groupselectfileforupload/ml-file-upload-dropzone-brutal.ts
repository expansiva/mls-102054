/// <mls fileReference="_102054_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone-brutal.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// FILE UPLOAD DROPZONE — BRUTALISM (mls-102054)
// =============================================================================
// Casca (estratégia D): herda tudo de MlFileUploadDropzoneMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência brutal vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlFileUploadDropzoneMolecule } from '/_102040_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone.js';

@customElement('groupselectfileforupload--ml-file-upload-dropzone-brutal')
export class MlFileUploadDropzoneBrutal extends MlFileUploadDropzoneMolecule {}
