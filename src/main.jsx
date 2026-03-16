import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Remove loader after app mounts
const removeLoader = () => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => loader.remove(), 300);
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App onReady={removeLoader} />
  </React.StrictMode>
);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      console.log('Service worker registration failed');
    });
  });
}

// Request persistent storage
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((granted) => {
    console.log('Persistent storage:', granted ? 'granted' : 'denied');
  });
}
