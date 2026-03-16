import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Save, Copy, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { fileOperations } from '../utils/db';
import { getMonacoLanguage, copyToClipboard, downloadFile } from '../utils/fileUtils';
import '../styles/CodeEditor.css';

function CodeEditor() {
  const { activeFile, updateFile, editorSettings } = useStore();
  const editorRef = useRef(null);
  
  if (!activeFile) return null;
  
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure Monaco editor
    monaco.editor.defineTheme('devstudio-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00FFFF' },
        { token: 'string', foreground: '10B981' },
        { token: 'number', foreground: 'FF00FF' },
        { token: 'function', foreground: '3B82F6' },
      ],
      colors: {
        'editor.background': '#0a0a0f',
        'editor.foreground': '#e5e7eb',
        'editor.lineHighlightBackground': '#13131a',
        'editor.selectionBackground': '#00ffff33',
        'editorCursor.foreground': '#00ffff',
        'editorLineNumber.foreground': '#6b7280',
        'editorLineNumber.activeForeground': '#00ffff',
      }
    });
    
    monaco.editor.setTheme('devstudio-dark');
  };
  
  const handleEditorChange = async (value) => {
    if (activeFile) {
      const updated = await fileOperations.updateFile(activeFile.id, {
        content: value
      });
      updateFile(activeFile.id, updated);
    }
  };
  
  const handleSave = async () => {
    if (editorRef.current && activeFile) {
      const content = editorRef.current.getValue();
      await fileOperations.updateFile(activeFile.id, { content });
      // Show save indicator
      const indicator = document.querySelector('.save-indicator');
      if (indicator) {
        indicator.style.opacity = '1';
        setTimeout(() => indicator.style.opacity = '0', 2000);
      }
    }
  };
  
  const handleCopy = async () => {
    if (editorRef.current) {
      const selection = editorRef.current.getSelection();
      const selectedText = editorRef.current.getModel().getValueInRange(selection);
      const result = await copyToClipboard(selectedText || editorRef.current.getValue());
      console.log(result.success ? 'Copied!' : 'Copy failed');
    }
  };
  
  const handleDownload = () => {
    if (editorRef.current && activeFile) {
      const content = editorRef.current.getValue();
      downloadFile(activeFile.name, content, 'text/plain');
    }
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFile]);
  
  return (
    <div className="code-editor">
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <span className="file-label">{activeFile.name}</span>
          <span className="language-badge">
            {getMonacoLanguage(activeFile.name)}
          </span>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={handleCopy} title="Copy (Ctrl/Cmd+C)">
            <Copy size={16} />
            Copy
          </button>
          <button className="toolbar-btn" onClick={handleSave} title="Save (Ctrl/Cmd+S)">
            <Save size={16} />
            Save
          </button>
          <button className="toolbar-btn" onClick={handleDownload} title="Download">
            <Download size={16} />
            Download
          </button>
          <span className="save-indicator">Saved ✓</span>
        </div>
      </div>
      
      <div className="editor-container">
        <Editor
          height="100%"
          language={getMonacoLanguage(activeFile.name)}
          value={activeFile.content || ''}
          theme="devstudio-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: editorSettings.fontSize,
            tabSize: editorSettings.tabSize,
            wordWrap: editorSettings.wordWrap,
            minimap: { enabled: editorSettings.minimap },
            lineNumbers: editorSettings.lineNumbers,
            formatOnPaste: editorSettings.formatOnPaste,
            formatOnType: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true,
            fontFamily: "'Fira Code', monospace",
            fontLigatures: true,
            bracketPairColorization: {
              enabled: true
            },
            guides: {
              bracketPairs: true,
              indentation: true
            }
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
