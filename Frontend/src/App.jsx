import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`Project Name: [Your Project Name]
Description: [Brief description of your project]

Tech Stack:
- Frontend: [e.g., React, Vue, Angular]
- Backend: [e.g., Node.js, Python, Java]
- Database: [e.g., MongoDB, PostgreSQL]
- Additional Tools: [e.g., Docker, Redis]

Features:
- Feature 1
- Feature 2
- Feature 3

Security Requirements:
- Authentication method
- Data protection
- API security

Code Quality Requirements:
- Testing coverage
- Code style
- Documentation requirements`);

  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function generateCode() {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/generate-code', { Instructions: code });
      setReview("✅ Files generated successfully. Check the `server/` and `client/` folders in your project.");
    } catch (error) {
      console.error('Error generating code:', error);
      setReview('❌ Error: Failed to generate code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ display: 'flex', height: '100vh', padding: '1rem', backgroundColor: '#121212', color: '#fff' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, marginRight: '1rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>📝 Project Requirements</h2>
        <div
          style={{
            flex: 1,
            border: '1px solid #444',
            borderRadius: '8px',
            backgroundColor: '#1e1e1e',
            overflow: 'auto',
            padding: '0.5rem'
          }}
        >
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.plaintext, "plaintext")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              backgroundColor: '#1e1e1e',
              color: '#fff',
              minHeight: '100%',
            }}
          />
        </div>
        <button
          onClick={generateCode}
          disabled={isLoading}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: isLoading ? '#555' : '#4caf50',
            border: 'none',
            borderRadius: '5px',
            color: '#fff',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {isLoading ? 'Generating...' : '🚀 Generate Files'}
        </button>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>📂 Output</h2>
        <div
          style={{
            flex: 1,
            border: '1px solid #444',
            borderRadius: '8px',
            backgroundColor: '#1e1e1e',
            padding: '1rem',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            fontFamily: '"Fira Code", monospace',
            fontSize: 14
          }}
        >
          {isLoading ? (
            <p style={{ color: '#ccc' }}>⏳ Generating code...</p>
          ) : (
            review || <p style={{ color: '#888' }}>Output will appear here after generation.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
