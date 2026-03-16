import React from 'react';
import { FileCode, Folder, BookOpen, Rocket } from 'lucide-react';
import { useStore } from '../store/useStore';
import { projectTemplates } from '../utils/fileUtils';
import { fileOperations } from '../utils/db';
import '../styles/WelcomeScreen.css';

function WelcomeScreen() {
  const { addFile, setActiveFile } = useStore();
  
  const handleCreateProject = async (templateKey) => {
    const template = projectTemplates[templateKey];
    
    for (const fileTemplate of template.files) {
      const file = {
        name: fileTemplate.name,
        type: fileTemplate.type,
        content: '',
      };
      
      const created = await fileOperations.createFile(file);
      addFile(created);
      
      if (fileTemplate === template.files[0]) {
        setActiveFile(created);
      }
    }
  };
  
  return (
    <div className="welcome-screen">
      <div className="welcome-hero">
        <FileCode className="hero-icon" size={80} />
        <h1 className="hero-title glow-text">DNYF DevStudio</h1>
        <p className="hero-subtitle">Professional Web-Based IDE</p>
      </div>
      
      <div className="welcome-features">
        <div className="feature-card glass-effect">
          <Rocket className="feature-icon" />
          <h3>Multi-Language Support</h3>
          <p>JavaScript, Python, HTML, CSS, and more</p>
        </div>
        
        <div className="feature-card glass-effect">
          <Folder className="feature-icon" />
          <h3>File Management</h3>
          <p>Create, edit, and organize your projects</p>
        </div>
        
        <div className="feature-card glass-effect">
          <BookOpen className="feature-icon" />
          <h3>Code Snippets</h3>
          <p>Save and reuse your favorite code</p>
        </div>
      </div>
      
      <div className="welcome-templates">
        <h2>Quick Start Templates</h2>
        <div className="template-grid">
          {Object.entries(projectTemplates).map(([key, template]) => (
            <button
              key={key}
              className="template-card glass-effect"
              onClick={() => handleCreateProject(key)}
            >
              <h4>{template.name}</h4>
              <p>{template.description}</p>
              <span className="file-count">{template.files.length} files</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
