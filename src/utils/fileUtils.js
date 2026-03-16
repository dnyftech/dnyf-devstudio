// Language and File Type Detection
export const languageMap = {
  js: { name: 'JavaScript', monaco: 'javascript', icon: '📜', color: '#f7df1e' },
  jsx: { name: 'React JSX', monaco: 'javascript', icon: '⚛️', color: '#61dafb' },
  ts: { name: 'TypeScript', monaco: 'typescript', icon: '📘', color: '#3178c6' },
  tsx: { name: 'React TSX', monaco: 'typescript', icon: '⚛️', color: '#3178c6' },
  py: { name: 'Python', monaco: 'python', icon: '🐍', color: '#3776ab' },
  html: { name: 'HTML', monaco: 'html', icon: '🌐', color: '#e34c26' },
  css: { name: 'CSS', monaco: 'css', icon: '🎨', color: '#1572b6' },
  scss: { name: 'SCSS', monaco: 'scss', icon: '🎨', color: '#cc6699' },
  json: { name: 'JSON', monaco: 'json', icon: '📋', color: '#000000' },
  md: { name: 'Markdown', monaco: 'markdown', icon: '📝', color: '#083fa1' },
  xml: { name: 'XML', monaco: 'xml', icon: '📄', color: '#0060ac' },
  yaml: { name: 'YAML', monaco: 'yaml', icon: '📄', color: '#cb171e' },
  sql: { name: 'SQL', monaco: 'sql', icon: '🗄️', color: '#00758f' },
  php: { name: 'PHP', monaco: 'php', icon: '🐘', color: '#777bb4' },
  java: { name: 'Java', monaco: 'java', icon: '☕', color: '#007396' },
  c: { name: 'C', monaco: 'c', icon: '©️', color: '#a8b9cc' },
  cpp: { name: 'C++', monaco: 'cpp', icon: '©️', color: '#00599c' },
  go: { name: 'Go', monaco: 'go', icon: '🐹', color: '#00add8' },
  rs: { name: 'Rust', monaco: 'rust', icon: '🦀', color: '#dea584' },
  rb: { name: 'Ruby', monaco: 'ruby', icon: '💎', color: '#cc342d' },
  swift: { name: 'Swift', monaco: 'swift', icon: '🦅', color: '#ffac45' },
  kt: { name: 'Kotlin', monaco: 'kotlin', icon: '🎯', color: '#7f52ff' },
  sh: { name: 'Shell', monaco: 'shell', icon: '🐚', color: '#89e051' },
  txt: { name: 'Plain Text', monaco: 'plaintext', icon: '📄', color: '#ffffff' },
};

export function getFileExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : 'txt';
}

export function getLanguageInfo(filename) {
  const ext = getFileExtension(filename);
  return languageMap[ext] || languageMap.txt;
}

export function getMonacoLanguage(filename) {
  return getLanguageInfo(filename).monaco;
}

// File Templates
export const fileTemplates = {
  javascript: `// JavaScript File
console.log('Hello from DNYF DevStudio!');

function main() {
  // Your code here
}

main();`,
  
  typescript: `// TypeScript File
function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

greet('Developer');`,
  
  react: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Hello from DNYF DevStudio!</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;`,
  
  python: `# Python File
def main():
    print("Hello from DNYF DevStudio!")
    
if __name__ == "__main__":
    main()`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DNYF DevStudio</title>
</head>
<body>
  <h1>Hello from DNYF DevStudio!</h1>
</body>
</html>`,
  
  css: `/* CSS Stylesheet */
:root {
  --primary-color: #00ffff;
  --bg-color: #0a0a0f;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: var(--bg-color);
  color: white;
}`,
  
  json: `{
  "name": "project",
  "version": "1.0.0",
  "description": "Created with DNYF DevStudio"
}`,
  
  markdown: `# Welcome to DNYF DevStudio

This is a **markdown** file created in DNYF DevStudio.

## Features

- Multi-language support
- Live preview
- Offline capabilities
- File management

Happy coding! 🚀`,
};

export function getTemplate(language) {
  return fileTemplates[language] || '// New file\n';
}

// File System Helpers
export function createNewFile(name, type = 'javascript') {
  return {
    name,
    type,
    content: getTemplate(type),
    language: type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function validateFileName(name) {
  const validNameRegex = /^[a-zA-Z0-9._-]+$/;
  if (!name || name.trim() === '') {
    return { valid: false, error: 'File name cannot be empty' };
  }
  if (!validNameRegex.test(name)) {
    return { valid: false, error: 'File name contains invalid characters' };
  }
  return { valid: true };
}

// File Size Helpers
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function getFileSize(content) {
  return new Blob([content]).size;
}

// Code Execution (Sandboxed)
export function executeJavaScript(code, consoleCallback) {
  const logs = [];
  
  const sandboxConsole = {
    log: (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push({ type: 'log', message });
      consoleCallback?.({ type: 'log', message });
    },
    error: (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      logs.push({ type: 'error', message });
      consoleCallback?.({ type: 'error', message });
    },
    warn: (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      logs.push({ type: 'warn', message });
      consoleCallback?.({ type: 'warn', message });
    },
  };
  
  try {
    // Create sandboxed function
    const func = new Function('console', code);
    func(sandboxConsole);
    return { success: true, logs };
  } catch (error) {
    const errorMessage = error.message;
    logs.push({ type: 'error', message: errorMessage });
    consoleCallback?.({ type: 'error', message: errorMessage });
    return { success: false, error: errorMessage, logs };
  }
}

// HTML Preview Generator
export function generateHTMLPreview(html, css = '', js = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    ${js}
  </script>
</body>
</html>`;
}

// File Download Helper
export function downloadFile(filename, content, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// File Upload Helper
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Clipboard Helpers (Android compatible)
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return { success: true };
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return { success };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function pasteFromClipboard() {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      return { success: true, text };
    } else {
      return { success: false, error: 'Clipboard API not supported' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Project Templates
export const projectTemplates = {
  'vanilla-js': {
    name: 'Vanilla JavaScript',
    description: 'HTML, CSS, and JavaScript project',
    files: [
      { name: 'index.html', type: 'html' },
      { name: 'style.css', type: 'css' },
      { name: 'script.js', type: 'javascript' },
    ],
  },
  'react': {
    name: 'React App',
    description: 'React with JSX',
    files: [
      { name: 'App.jsx', type: 'react' },
      { name: 'index.html', type: 'html' },
      { name: 'style.css', type: 'css' },
    ],
  },
  'python': {
    name: 'Python Script',
    description: 'Python development',
    files: [
      { name: 'main.py', type: 'python' },
    ],
  },
};
