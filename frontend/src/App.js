"use client";
import axios from "axios";
import React, { useState } from "react";
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";

// Configure marked to use react-syntax-highlighter for code blocks
marked.setOptions({
  highlight: (code, language) => {
    return SyntaxHighlighter.highlight(code, { language, style: dracula });
  },
});

function App() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  const [error, setError] = useState(false);

  const generate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(false);
      const response = await axios.post(
        "http://localhost:8080/api/generate-ai-readme",
        {
          githublink: link,
        }
      );
      if (response.data.success) {
        let text = response.data.data;
        // typeof response.data.data === "string"
        //   ? response.data.data
        //   : JSON.stringify(response.data.data);
        const replaceTripleBackticks = text.replace(/\\\`\\\`\\\`/g, "```");
        const formattedInput = replaceTripleBackticks.replace(/\\n/g, "\n");
        const parsedHtml = marked.parse(formattedInput);
        const sanitizedHtml = DOMPurify.sanitize(parsedHtml);
        setHtml(sanitizedHtml);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error", error);
      setError(true);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <>
      {/* Conditionally render the input form only if html is empty */}
      {!html && (
        <div className="input" style={{ padding: "20px" }}>
          <form onSubmit={generate}>
            <input
              type="text"
              placeholder="Enter GitHub README link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
            <button
              type="submit"
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              Generate
            </button>
          </form>
        </div>
      )}

      {loading && (
        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
      )}
      {error && (
        <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
          An error occurred while generating the README. Please try again.
        </div>
      )}

      {!loading && html && (
        <div className="App" style={{ padding: "20px" }}>
          {/* Render the parsed markdown */}
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </>
  );
}

export default App;
