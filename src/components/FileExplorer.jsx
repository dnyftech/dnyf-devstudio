import React, { useState, useEffect } from 'react';
import { File, Folder, Plus, Trash2, Search, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { fileOperations } from '../utils/db';
import { getLanguageInfo, createNewFile, downloadFile } from '../utils/fileUtils';
import '../styles/FileExplorer.css';

function FileExplorer() {
  const { files, setFiles, setActiveFile, addFile, deleteFile, activeFile } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  
  useEffect(() => {
    loadFiles();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      setFilteredFiles(files.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredFiles(files);
    }
  }, [files, searchQuery]);
  
  const loadFiles = async () => {
    const loadedFiles = await fileOperations.getAllFiles();
    setFiles(loadedFiles);
  };
  
  const handleCreateFile = async () => {
    if (!newFileName.trim()) return;
    
    const file = createNewFile(newFileName, 'javascript');
    const created = await fileOperations.createFile(file);
    addFile(created);
    setNewFileName('');
    setShowNewFileDialog(false);
    setActiveFile(created);
  };
  
  const handleDeleteFile = async (fileId, e) => {
    e.stopPropagation();
    if (confirm('Delete this file?')) {
      await fileOperations.deleteFile(fileId);
      deleteFile(fileId);
    }
  };
  
  const handleDownloadFile = (file, e) => {
    e.stopPropagation();
    downloadFile(file.name, file.content || '', 'text/plain');
  };
  
  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h3>Files</h3>
        <button 
          className="icon-btn-small"
          onClick={() => setShowNewFileDialog(true)}
          title="New File"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="search-box">
        <Search size={14} />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="files-list">
        {filteredFiles.length === 0 ? (
          <div className="empty-state">
            <Folder size={48} opacity={0.3} />
            <p>No files yet</p>
            <button 
              className="create-file-btn"
              onClick={() => setShowNewFileDialog(true)}
            >
              <Plus size={16} />
              Create File
            </button>
          </div>
        ) : (
          filteredFiles.map(file => {
            const langInfo = getLanguageInfo(file.name);
            return (
              <div
                key={file.id}
                className={`file-item ${activeFile?.id === file.id ? 'active' : ''}`}
                onClick={() => setActiveFile(file)}
              >
                <span className="file-icon" style={{ color: langInfo.color }}>
                  {langInfo.icon}
                </span>
                <span className="file-name">{file.name}</span>
                <div className="file-actions">
                  <button
                    className="action-btn"
                    onClick={(e) => handleDownloadFile(file, e)}
                    title="Download"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={(e) => handleDeleteFile(file.id, e)}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {showNewFileDialog && (
        <div className="modal-overlay" onClick={() => setShowNewFileDialog(false)}>
          <div className="modal glass-effect" onClick={(e) => e.stopPropagation()}>
            <h3>Create New File</h3>
            <input
              type="text"
              placeholder="filename.js"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFile()}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowNewFileDialog(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleCreateFile}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
