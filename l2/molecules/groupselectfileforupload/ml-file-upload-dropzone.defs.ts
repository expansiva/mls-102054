/// <mls fileReference="_102054_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectFileForUpload';
export const skill = `# Metadata
- TagName: groupselectfileforupload--ml-file-upload-dropzone

# Objective
A drag-and-drop (and click-to-browse) file selection zone. Holds the selected File[] in value, validates by type/size/count, lists selected files with remove buttons, and supports single or multiple selection.

# Responsibilities
- Open the native file picker on click/Enter/Space; accept files via drag-and-drop with a dragging highlight.
- Validate files against accept, max-size-kb and max-files; dispatch 'reject' with the rejected files and reason.
- Update value with valid files (replace in single mode, append in multiple mode) and allow removing files.
- Render label, helper or error, loading state and the selected-file list.

# Constraints
- No interaction while disabled or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102054). Translucent dashed dropzone and frosted file cards. Assumes a rich/dark background (container contract).`;
