import React, { useState } from 'react';
import { Send, Clock, Copy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { apiHistoryOperations } from '../utils/db';
import { copyToClipboard } from '../utils/fileUtils';
import '../styles/ApiTester.css';

function ApiTester() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addApiRequest } = useStore();
  
  const handleSendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const options = {
        method,
        headers: JSON.parse(headers || '{}'),
      };
      
      if (method !== 'GET' && body) {
        options.body = body;
      }
      
      const res = await fetch(url, options);
      const data = await res.text();
      const duration = Date.now() - startTime;
      
      const result = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: data,
        duration,
      };
      
      setResponse(result);
      
      await apiHistoryOperations.addRequest({
        url,
        method,
        status: res.status,
        duration,
      });
      
      addApiRequest({ url, method, status: res.status });
    } catch (error) {
      setResponse({
        error: error.message,
        duration: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopyResponse = () => {
    if (response) {
      copyToClipboard(response.data || response.error);
    }
  };
  
  return (
    <div className="api-tester-container">
      <div className="api-header">
        <span>API Tester</span>
      </div>
      
      <div className="api-content">
        <div className="api-request">
          <div className="request-line">
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
            />
            <button 
              className="send-btn" 
              onClick={handleSendRequest}
              disabled={loading}
            >
              <Send size={16} />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
          
          <div className="request-details">
            <div className="detail-section">
              <label>Headers (JSON)</label>
              <textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
              />
            </div>
            
            {method !== 'GET' && (
              <div className="detail-section">
                <label>Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={4}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="api-response">
          <div className="response-header">
            <span>Response</span>
            {response && (
              <>
                <span className={`status-badge status-${Math.floor(response.status / 100)}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="duration">
                  <Clock size={12} />
                  {response.duration}ms
                </span>
                <button className="copy-btn" onClick={handleCopyResponse}>
                  <Copy size={12} />
                </button>
              </>
            )}
          </div>
          
          <div className="response-content">
            {response ? (
              <pre>{response.data || response.error}</pre>
            ) : (
              <div className="response-empty">Send a request to see response</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiTester;
