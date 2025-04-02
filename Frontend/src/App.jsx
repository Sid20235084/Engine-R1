import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ code, setCode ] = useState(`Project Name: [Your Project Name]
Description: [Brief description of your project]

Tech Stack:
- Frontend: [e.g., React, Vue, Angular]
- Backend: [e.g., Node.js, Python, Java]
- Database: [e.g., MongoDB, PostgreSQL]
- Additional Tools: [e.g., Docker, Redis]

Features:
[Describe key features, one per line]
- Feature 1
- Feature 2
- Feature 3

Security Requirements:
[List security requirements]
- Authentication method
- Data protection
- API security

Code Quality Requirements:
[List code quality requirements]
- Testing coverage
- Code style
- Documentation requirements`)
  const [ review, setReview ] = useState(``)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function generateCode() {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/ai/generate-code', { Instructions: code })
      setReview(response.data)
    } catch (error) {
      console.error('Error generating code:', error)
      setReview('Error: Failed to generate code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="editor-container">
            <div className="editor-header">
              <h2>Project Requirements</h2>
            </div>
            <div className="code">
              <Editor
                value={code}
                onValueChange={newCode => setCode(newCode)}
                highlight={code => prism.highlight(code, prism.languages.plaintext, "plaintext")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  border: "1px solid #444",
                  borderRadius: "5px",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#1e1e1e",
                  color: "#fff"
                }}
              />
            </div>
          </div>
          <button
            onClick={generateCode}
            className={`generate-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Code'}
          </button>
        </div>
        <div className="right">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Generating code...</p>
            </div>
          ) : (
            <div className="review-content">
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({node, ...props}) => <h1 className="review-heading" {...props} />,
                  h2: ({node, ...props}) => <h2 className="review-subheading" {...props} />,
                  h3: ({node, ...props}) => <h3 className="review-subheading" {...props} />,
                  p: ({node, ...props}) => <p className="review-paragraph" {...props} />,
                  ul: ({node, ...props}) => <ul className="review-list" {...props} />,
                  li: ({node, ...props}) => <li className="review-list-item" {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline ? 
                      <code className="review-inline-code" {...props} /> : 
                      <code className="review-code-block" {...props} />,
                  pre: ({node, ...props}) => <pre className="review-pre" {...props} />
                }}
              >
                {review}
              </Markdown>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
