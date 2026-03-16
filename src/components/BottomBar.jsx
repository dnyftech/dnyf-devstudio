import React from 'react';
import { Wifi, HardDrive, Zap, Github } from 'lucide-react';
import { useStore } from '../store/useStore';
import '../styles/BottomBar.css';

function BottomBar() {
  const { files } = useStore();
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div className="bottom-bar">
      <div className="status-left">
        <div className={`status-item ${isOnline ? 'online' : 'offline'}`}>
          <Wifi size={14} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        
        <div className="status-item">
          <HardDrive size={14} />
          <span>{files.length} files</span>
        </div>
        
        <div className="status-item">
          <Zap size={14} />
          <span>PWA Active</span>
        </div>
      </div>
      
      <div className="status-right">
        <a 
          href="https://github.com/DNYFTECH" 
          target="_blank" 
          rel="noopener noreferrer"
          className="status-item link"
        >
          <Github size={14} />
          <span>DNYFTECH</span>
        </a>
        
        <div className="status-item">
          <span className="glow-text">DNYF DevStudio v1.0</span>
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
