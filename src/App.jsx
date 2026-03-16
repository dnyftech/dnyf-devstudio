import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './components/TopBar';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';
import PreviewPanel from './components/PreviewPanel';
import ConsolePanel from './components/ConsolePanel';
import ApiTester from './components/ApiTester';
import SnippetsPanel from './components/SnippetsPanel';
import BottomBar from './components/BottomBar';
import WelcomeScreen from './components/WelcomeScreen';
import { useStore } from './store/useStore';
import './styles/App.css';

function App({ onReady }) {
  const { panels, activeFile } = useStore();
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    // Call onReady after mount
    setTimeout(() => {
      onReady?.();
      // Hide welcome screen after showing the app
      setTimeout(() => setShowWelcome(false), 1500);
    }, 100);
  }, [onReady]);
  
  return (
    <div className="app-container grid-bg">
      <TopBar />
      
      <div className="main-content">
        <AnimatePresence>
          {panels.fileExplorer && (
            <motion.div
              className="panel file-explorer-panel"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <FileExplorer />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="editor-area">
          {activeFile ? (
            <CodeEditor />
          ) : (
            !showWelcome && <WelcomeScreen />
          )}
        </div>
        
        <AnimatePresence>
          {panels.preview && (
            <motion.div
              className="panel preview-panel"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <PreviewPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {panels.console && (
          <motion.div
            className="bottom-panel console-panel"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ConsolePanel />
          </motion.div>
        )}
        
        {panels.apiTester && (
          <motion.div
            className="bottom-panel api-tester-panel"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ApiTester />
          </motion.div>
        )}
        
        {panels.snippets && (
          <motion.div
            className="bottom-panel snippets-panel"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <SnippetsPanel />
          </motion.div>
        )}
      </AnimatePresence>
      
      <BottomBar />
      
      {showWelcome && (
        <div className="welcome-overlay">
          <motion.div
            className="welcome-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="welcome-logo glow-text">DNYF DevStudio</div>
            <div className="welcome-tagline">Professional Web IDE</div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
