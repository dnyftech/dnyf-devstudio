import { useState, useEffect } from 'react';
import { fileOperations } from '../utils/db';

export function useDatabase() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    initDatabase();
  }, []);
  
  const initDatabase = async () => {
    try {
      // Test database connection
      await fileOperations.getAllFiles();
      setIsReady(true);
    } catch (err) {
      setError(err);
      console.error('Database initialization failed:', err);
    }
  };
  
  return { isReady, error };
}
