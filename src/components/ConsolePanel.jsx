import React, { useEffect, useRef } from 'react';
import { Terminal, Trash2, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { downloadFile } from '../utils/fileUtils';
import '../styles/ConsolePanel.css';

function ConsolePanel() {
  const { consoleOutput, clearConsole } = useStore();
  const consoleEndRef = useRef(null);
  
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleOutput]);
  
  const handleExport = () => {
    const text = consoleOutput.map(o => `[${o.type.toUpperCase()}] ${o.message}`).join('\n');
    downloadFile('console-output.txt', text, 'text/plain');
  };
  
  return (
    <div className="console-panel-container">
      <div className="console-header">
        <div className="header-left">
          <Terminal size={16} />
          <span>Console Output</span>
          <span className="output-count">{consoleOutput.length} messages</span>
        </div>
        <div className="header-right">
          <button className="console-btn" onClick={handleExport} title="Export">
            <Download size={14} />
          </button>
          <button className="console-btn" onClick={clearConsole} title="Clear">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="console-content">
        {consoleOutput.length === 0 ? (
          <div className="console-empty">
            <Terminal size={32} opacity={0.3} />
            <p>Console output will appear here</p>
          </div>
        ) : (
          <div className="console-messages">
            {consoleOutput.map((output, index) => (
              <div key={index} className={`console-message ${output.type}`}>
                <span className="message-type">[{output.type.toUpperCase()}]</span>
                <span className="message-content">{output.message}</span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsolePanel;
