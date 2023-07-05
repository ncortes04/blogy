import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactMarkdown = dynamic(() => import("react-markdown"));
const MarkdownEditor = () => {
  const [content, setContent] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previewContent, setPreviewContent] = useState("");

  const handleOptionToggle = (option) => {
    const lines = content.split("\n");
    const currentLineIndex = lines.length - 1;
    const updatedLines = lines.map((line, index) => {
      if (index === currentLineIndex) {
         return `${option} ${line.substring(selectedOption?.length || 0).trim()}`;

      } else {
        return line;
      }
    });
    console.log(currentLineIndex)
    setContent(updatedLines.join("\n"));
    setSelectedOption(option);
    setPreviewVisible(true);
  
    const updatedPreviewContent = updatedLines.join("\n");
    setPreviewContent(updatedPreviewContent);
  };
  
  const handleContentChange = (e) => {
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
      const currentLineIndex = e.target.selectionStart;
      const currentLine = lines.findIndex(
        (_, index) => index <= currentLineIndex && index + 1 >= currentLineIndex
      );

      const updatedLines = lines.map((line, index) => {
        if (index === currentLine) {
          return `${line}\n${selectedOption} `;
        }
        return line;
      });

      setContent(updatedLines.join("\n"));

      const updatedPreviewContent = updatedLines.join("\n");
      setPreviewContent(updatedPreviewContent);
    }
  };

  return (
    <div className="markdown-container">
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
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
      />

      {previewVisible && (
        <div>
          <ReactMarkdown>{previewContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
