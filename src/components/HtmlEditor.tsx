import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export type HtmlEditorHandle = {
  insertHtml: (html: string) => void;
};

type HtmlEditorProps = {
  label?: string;
  value: string;
  placeholder?: string;
  minHeight?: number;
  onChange: (value: string) => void;
  onRequestImage?: () => void;
};

function command(format: string, value?: string) {
  document.execCommand(format, false, value);
}

const HtmlEditor = forwardRef<HtmlEditorHandle, HtmlEditorProps>(function HtmlEditor(
  { label, value, placeholder, minHeight = 260, onChange, onRequestImage },
  ref
) {
  const editorRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<Range | null>(null);
  const lastHtmlRef = useRef(value);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value !== lastHtmlRef.current && el.innerHTML !== value) {
      el.innerHTML = value;
      lastHtmlRef.current = value;
    }
  }, [value]);

  const saveRange = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      rangeRef.current = range.cloneRange();
    }
  }, []);

  const restoreRange = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || !rangeRef.current) return;
    selection.removeAllRanges();
    selection.addRange(rangeRef.current);
  }, []);

  const updateValue = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? '';
    lastHtmlRef.current = html;
    onChange(html);
  }, [onChange]);

  const applyCommand = useCallback(
    (format: string, formatValue?: string) => {
      editorRef.current?.focus();
      restoreRange();
      command(format, formatValue);
      saveRange();
      updateValue();
    },
    [restoreRange, saveRange, updateValue]
  );

  useImperativeHandle(
    ref,
    () => ({
      insertHtml: (html: string) => {
        editorRef.current?.focus();
        restoreRange();
        command('insertHTML', html);
        saveRange();
        updateValue();
      },
    }),
    [restoreRange, saveRange, updateValue]
  );

  return (
    <div className="dashboard-editor">
      {label && <label className="dashboard-form-label">{label}</label>}
      <div
        className="dashboard-editor-toolbar"
        role="toolbar"
        aria-label={label || 'Rich text toolbar'}
      >
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('formatBlock', '<h1>')}
        >
          H1
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('formatBlock', '<h2>')}
        >
          H2
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('formatBlock', '<h3>')}
        >
          H3
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('formatBlock', '<p>')}
        >
          P
        </button>
        <button type="button" className="dashboard-editor-btn" onClick={() => applyCommand('bold')}>
          <strong>B</strong>
        </button>
        <button type="button" className="dashboard-editor-btn" onClick={() => applyCommand('italic')}>
          <em>I</em>
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('insertUnorderedList')}
        >
          • List
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('insertOrderedList')}
        >
          1. List
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => {
            const url = window.prompt('Enter a URL');
            if (url) applyCommand('createLink', url);
          }}
        >
          Link
        </button>
        <button
          type="button"
          className="dashboard-editor-btn"
          onClick={() => applyCommand('formatBlock', '<blockquote>')}
        >
          Quote
        </button>
        {onRequestImage && (
          <button type="button" className="dashboard-editor-btn" onClick={onRequestImage}>
            Image
          </button>
        )}
        <button type="button" className="dashboard-editor-btn" onClick={() => applyCommand('removeFormat')}>
          Clear
        </button>
      </div>
      <div
        ref={editorRef}
        className="dashboard-editor-surface"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder || ''}
        style={{ minHeight }}
        onInput={updateValue}
        onBlur={saveRange}
        onKeyUp={saveRange}
        onMouseUp={saveRange}
      />
    </div>
  );
});

export default HtmlEditor;

