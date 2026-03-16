import React, { useState } from 'react';
import { 
  Menu, FileCode, Play, Download, Upload, Settings, 
  Folder, Terminal, Globe, BookOpen, X, Plus
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { downloadFile } from '../utils/fileUtils';
import { dataOperations } from '../utils/db';
import '../styles/TopBar.css';

function TopBar() {
  const { panels, togglePanel, activeFile, files } = useStore();
  const [showMenu, setShowMenu] = useState(false);
  
  const handleExportProject = async () => {
    const data = await dataOperations.exportAllData();
    const json = JSON.stringify(data, null, 2);
    downloadFile('devstudio-export.json', json, 'application/json');
  };
  
  const handleImportProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        const data = JSON.parse(text);
        await dataOperations.importData(data);
        window.location.reload();
      }
    };
    input.click();
  };
  
  return (
    <div className="topbar glass-effect">
      <div className="topbar-left">
        <div className="logo-section">
          <FileCode className="logo-icon" />
          <span className="logo-text glow-text">DNYF DevStudio</span>
          <span className="version-badge">v1.0</span>
        </div>
        
        <div className="menu-buttons">
          <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
            <Menu size={18} />
            <span>File</span>
          </button>
          
          {showMenu && (
            <div className="dropdown-menu glass-effect">
              <button onClick={handleExportProject}>
                <Download size={16} />
                Export Project
              </button>
              <button onClick={handleImportProject}>
                <Upload size={16} />
                Import Project
              </button>
              <div className="menu-divider" />
              <button onClick={() => window.location.reload()}>
                <X size={16} />
                Reset IDE
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="topbar-center">
        {activeFile && (
          <div className="active-file-indicator">
            <span className="file-icon">{activeFile.icon || '📄'}</span>
            <span className="file-name">{activeFile.name}</span>
            <div className="pulse-dot" />
          </div>
        )}
      </div>
      
      <div className="topbar-right">
        <button 
          className={`icon-btn ${panels.fileExplorer ? 'active' : ''}`}
          onClick={() => togglePanel('fileExplorer')}
          title="Toggle File Explorer"
        >
          <Folder size={18} />
        </button>
        
        <button 
          className={`icon-btn ${panels.preview ? 'active' : ''}`}
          onClick={() => togglePanel('preview')}
          title="Toggle Preview"
        >
          <Play size={18} />
        </button>
        
        <button 
          className={`icon-btn ${panels.console ? 'active' : ''}`}
          onClick={() => togglePanel('console')}
          title="Toggle Console"
        >
          <Terminal size={18} />
        </button>
        
        <button 
          className={`icon-btn ${panels.apiTester ? 'active' : ''}`}
          onClick={() => togglePanel('apiTester')}
          title="Toggle API Tester"
        >
          <Globe size={18} />
        </button>
        
        <button 
          className={`icon-btn ${panels.snippets ? 'active' : ''}`}
          onClick={() => togglePanel('snippets')}
          title="Toggle Snippets"
        >
          <BookOpen size={18} />
        </button>
        
        <div className="divider" />
        
        <button className="icon-btn" title="Settings">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
