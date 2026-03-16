import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, ExternalLink, Monitor } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateHTMLPreview } from '../utils/fileUtils';
import '../styles/PreviewPanel.css';

function PreviewPanel() {
  const { files, activeFile } = useStore();
  const [previewContent, setPreviewContent] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef(null);
  
  useEffect(() => {
    generatePreview();
  }, [files, activeFile]);
  
  const generatePreview = () => {
    const htmlFile = files.find(f => f.name.endsWith('.html'));
    const cssFile = files.find(f => f.name.endsWith('.css'));
    const jsFile = files.find(f => f.name.endsWith('.js') || f.name.endsWith('.jsx'));
    
    if (htmlFile || cssFile || jsFile) {
      const html = htmlFile?.content || '<div id="root"></div>';
      const css = cssFile?.content || '';
      const js = jsFile?.content || '';
      
      const preview = generateHTMLPreview(html, css, js);
      setPreviewContent(preview);
    } else {
      setPreviewContent('<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:sans-serif;color:#6b7280;"><div style="text-align:center;"><div style="font-size:3rem;margin-bottom:1rem;">👁️</div><p>Create HTML, CSS, or JS files to see preview</p></div></div>');
    }
  };
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    generatePreview();
  };
  
  const handleOpenExternal = () => {
    const blob = new Blob([previewContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };
  
  return (
    <div className="preview-panel-container">
      <div className="preview-header">
        <div className="header-left">
          <Monitor size={16} />
          <span>Live Preview</span>
        </div>
        <div className="header-right">
          <button className="preview-btn" onClick={handleRefresh} title="Refresh">
            <RefreshCw size={16} />
          </button>
          <button className="preview-btn" onClick={handleOpenExternal} title="Open in new tab">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        <iframe
          key={refreshKey}
          ref={iframeRef}
          srcDoc={previewContent}
          title="Preview"
          sandbox="allow-scripts allow-same-origin allow-modals"
          className="preview-iframe"
        />
      </div>
    </div>
  );
}

export default PreviewPanel;
