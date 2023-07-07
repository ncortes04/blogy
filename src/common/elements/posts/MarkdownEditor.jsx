import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactMarkdown = dynamic(() => import("react-markdown"));

const MarkdownEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previewContent, setPreviewContent] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [brief, setBrief] = useState("");

  const handleOptionToggle = (option) => {
    const lines = content.split("\n");
    const currentLineIndex = lineIndex;
    const updatedLines = lines.map((line, index) => {
      if (index === currentLineIndex) {
        let val = 0;
        if (line.startsWith("**") && line.endsWith("**")) {
          line = line.slice(2, -2);
        } else if(line.startsWith("*") && line.endsWith("*")){
          line = line.slice(1, -1);
        } else {
          for (const letter of line) {
            if (letter === " ") {
              break;
            } else {
              val++;
            }
          }
        }
        
        if (option === "*") {
          if (!line.startsWith("*") && !line.endsWith("*")) {
            return `${option}${line.substring(val).trim()}${option}`;
          } else if (line.startsWith("*") && line.endsWith("*")) {
            return line.slice(1, -1);
          }
        } else if (option === "**") {
          if (!line.startsWith("**") && !line.endsWith("**")) {
            return `${option}${line.substring(val).trim()}${option}`;
          } else if (line.startsWith("**") && line.endsWith("**")) {
            return line.slice(2, -2);
          }
        }
        return `${option} ${line.substring(val).trim()}`;
      } else {
        return line;
      }
    });
    setContent(updatedLines.join("\n"));
    setSelectedOption(option);
    setPreviewVisible(true);
  
    const updatedPreviewContent = updatedLines.join("\n");
    setPreviewContent(updatedPreviewContent);
  };
  
  const handleContentChange = (e) => {
    if (e.target.value.charAt(e.target.value.length - 1) === "\n") {
      return;
    }
    const lines = e.target.value.split("\n");
    const currentLineIndex = e.target.selectionStart;
    const currentLine = lines.findIndex(
      (_, index) => index <= currentLineIndex && index + 1 >= currentLineIndex
    );

    const updatedLines = lines.map((line, index) => {
      if (index === currentLine && line.trim() === "") {
        return `${selectedOption} `;
      }
      return line;
    });
    setContent(updatedLines.join("\n"));

    const updatedPreviewContent = updatedLines.join("\n");
    setPreviewContent(updatedPreviewContent);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const lines = content.split("\n");
      if (selectedOption === "*") {
        lines.push(`${selectedOption} `);
      } else if (selectedOption === "**") {
        lines.push(`${selectedOption} ${selectedOption}`);
      } else {
        lines.push(`${selectedOption} `);
      }
      let join = lines.join("\n");
      setContent(join);
      setLineIndex(lines.length - 1);
      setPreviewContent(join);
    }
  };

  const changeLineIndex = (e) => {
    let letter = e.target.selectionStart;
    let count = 0;
    for (let i = 0; i < letter; i++) {
      if (previewContent.charAt(i) === "\n") {
        count++;
      }
    }
    setLineIndex(count);
  };

  const handlePaste = (e) => {
    const pastedContent = e.clipboardData.getData("text/plain");
    const updatedContent = content + pastedContent;
    setContent(updatedContent);

    const updatedPreviewContent = updatedContent.split("\n").join("\n");
    setPreviewContent(updatedPreviewContent);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("id_token");
    try {
      const response = await fetch("http://localhost:3000/api/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: title,
          description: content,
          category,
          read_time: readTime,
          brief,
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="markdown-container">
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Design">Design</option>
          <option value="SEO">SEO</option>
          <option value="Travel">Travel</option>
          <option value="Research">Research</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div>
        <label>Read Time:</label>
        <select value={readTime} onChange={(e) => setReadTime(e.target.value)}>
          <option value="">Select Read Time</option>
          <option value="1 min">1 min</option>
          <option value="5 min">5 min</option>
          <option value="10 min">10 min</option>
          <option value="30 min">30 min</option>
        </select>
      </div>
      <div>
      <label>Brief:</label>
        <input
          type="text"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button
          onClick={() => handleOptionToggle("#")}
          className={selectedOption === "#" ? "active" : ""}
        >
          H1
        </button>
        <button
          onClick={() => handleOptionToggle("##")}
          className={selectedOption === "##" ? "active" : ""}
        >
          H2
        </button>
        <button
          onClick={() => handleOptionToggle("###")}
          className={selectedOption === "###" ? "active" : ""}
        >
          H3
        </button>
        <button
          onClick={() => handleOptionToggle("")}
          className={selectedOption === "" ? "active" : ""}
        >
          P
        </button>
        <button
          onClick={() => handleOptionToggle("*")}
          className={selectedOption === "*" ? "active" : ""}
        >
          *
        </button>
        <button
          onClick={() => handleOptionToggle("**")}
          className={selectedOption === "**" ? "active" : ""}
        >
          **
        </button>
      </div>
      <label>Body:</label>
      <textarea
        value={content}
        onClick={(e) => changeLineIndex(e)}
        onChange={(e) => handleContentChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        onPaste={(e) => handlePaste(e)}
      />

      {previewVisible && (
        <div>
          <ReactMarkdown>{previewContent}</ReactMarkdown>
        </div>
      )}

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MarkdownEditor;