import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Copy, Trash2, Search } from 'lucide-react';
import { snippetOperations } from '../utils/db';
import { copyToClipboard } from '../utils/fileUtils';
import '../styles/SnippetsPanel.css';

function SnippetsPanel() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewSnippet, setShowNewSnippet] = useState(false);
  const [newSnippet, setNewSnippet] = useState({ title: '', code: '', language: 'javascript' });
  
  useEffect(() => {
    loadSnippets();
  }, []);
  
  const loadSnippets = async () => {
    const loaded = await snippetOperations.getAllSnippets();
    setSnippets(loaded);
  };
  
  const handleCreateSnippet = async () => {
    if (!newSnippet.title || !newSnippet.code) return;
    
    await snippetOperations.createSnippet(newSnippet);
    await loadSnippets();
    setNewSnippet({ title: '', code: '', language: 'javascript' });
    setShowNewSnippet(false);
  };
  
  const handleCopySnippet = (code) => {
    copyToClipboard(code);
  };
  
  const handleDeleteSnippet = async (id) => {
    if (confirm('Delete this snippet?')) {
      await snippetOperations.deleteSnippet(id);
      await loadSnippets();
    }
  };
  
  const filteredSnippets = searchQuery
    ? snippets.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.language.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : snippets;
  
  return (
    <div className="snippets-panel-container">
      <div className="snippets-header">
        <div className="header-left">
          <BookOpen size={16} />
          <span>Code Snippets</span>
        </div>
        <button className="add-btn" onClick={() => setShowNewSnippet(true)}>
          <Plus size={14} />
          New
        </button>
      </div>
      
      <div className="snippets-search">
        <Search size={14} />
        <input
          type="text"
          placeholder="Search snippets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="snippets-list">
        {filteredSnippets.map(snippet => (
          <div key={snippet.id} className="snippet-item">
            <div className="snippet-header">
              <span className="snippet-title">{snippet.title}</span>
              <span className="snippet-language">{snippet.language}</span>
            </div>
            <pre className="snippet-code">{snippet.code}</pre>
            <div className="snippet-actions">
              <button onClick={() => handleCopySnippet(snippet.code)}>
                <Copy size={12} />
                Copy
              </button>
              <button onClick={() => handleDeleteSnippet(snippet.id)}>
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showNewSnippet && (
        <div className="modal-overlay" onClick={() => setShowNewSnippet(false)}>
          <div className="modal glass-effect" onClick={(e) => e.stopPropagation()}>
            <h3>New Snippet</h3>
            <input
              type="text"
              placeholder="Snippet title"
              value={newSnippet.title}
              onChange={(e) => setNewSnippet({...newSnippet, title: e.target.value})}
            />
            <select
              value={newSnippet.language}
              onChange={(e) => setNewSnippet({...newSnippet, language: e.target.value})}
            >
              <option>javascript</option>
              <option>typescript</option>
              <option>python</option>
              <option>html</option>
              <option>css</option>
            </select>
            <textarea
              placeholder="Paste your code here..."
              value={newSnippet.code}
              onChange={(e) => setNewSnippet({...newSnippet, code: e.target.value})}
              rows={10}
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowNewSnippet(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleCreateSnippet}>
                Save Snippet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SnippetsPanel;
