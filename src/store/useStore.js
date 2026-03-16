import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // File System State
      files: [],
      activeFile: null,
      currentProject: null,
      
      // UI State
      panels: {
        fileExplorer: true,
        preview: true,
        console: false,
        apiTester: false,
        snippets: false,
      },
      
      // Editor Settings
      editorSettings: {
        theme: 'vs-dark',
        fontSize: 14,
        tabSize: 2,
        wordWrap: 'on',
        minimap: true,
        lineNumbers: 'on',
        formatOnPaste: true,
        formatOnSave: true,
      },
      
      // Console State
      consoleOutput: [],
      
      // API Tester State
      apiRequests: [],
      
      // Snippets State
      snippets: [],
      
      // Actions
      setFiles: (files) => set({ files }),
      
      addFile: (file) => set((state) => ({
        files: [...state.files, { ...file, id: Date.now(), createdAt: new Date() }]
      })),
      
      updateFile: (fileId, updates) => set((state) => ({
        files: state.files.map(f => f.id === fileId ? { ...f, ...updates, updatedAt: new Date() } : f)
      })),
      
      deleteFile: (fileId) => set((state) => ({
        files: state.files.filter(f => f.id !== fileId),
        activeFile: state.activeFile?.id === fileId ? null : state.activeFile
      })),
      
      setActiveFile: (file) => set({ activeFile: file }),
      
      togglePanel: (panelName) => set((state) => ({
        panels: {
          ...state.panels,
          [panelName]: !state.panels[panelName]
        }
      })),
      
      updateEditorSettings: (settings) => set((state) => ({
        editorSettings: { ...state.editorSettings, ...settings }
      })),
      
      addConsoleOutput: (output) => set((state) => ({
        consoleOutput: [...state.consoleOutput, { ...output, timestamp: Date.now() }]
      })),
      
      clearConsole: () => set({ consoleOutput: [] }),
      
      addApiRequest: (request) => set((state) => ({
        apiRequests: [...state.apiRequests, { ...request, id: Date.now() }]
      })),
      
      addSnippet: (snippet) => set((state) => ({
        snippets: [...state.snippets, { ...snippet, id: Date.now() }]
      })),
      
      deleteSnippet: (snippetId) => set((state) => ({
        snippets: state.snippets.filter(s => s.id !== snippetId)
      })),
      
      setCurrentProject: (project) => set({ currentProject: project }),
    }),
    {
      name: 'devstudio-storage',
      partialize: (state) => ({
        editorSettings: state.editorSettings,
        snippets: state.snippets,
        panels: state.panels,
      }),
    }
  )
);
