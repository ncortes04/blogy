import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactMarkdown = dynamic(() => import("react-markdown"));

const MarkdownEditor = () => {
  const [dataFields, setDataFields] = useState({
    content: "",
    title: "",
    selectedOption: null,
    category: "",
    readTime: "",
    brief: "",
  });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null)
  const [lineIndex, setLineIndex] = useState(0);
  const [previewContent, setPreviewContent] = useState("");

  const handleOptionToggle = useCallback((option) => {
    setDataFields((prevFormData) => {
      const lines = prevFormData.content.split("\n");
      const currentLineIndex = lineIndex;
      const updatedLines = lines.map((line, index) => {
        if (index === currentLineIndex) {
          let val = 0;
          if (line.startsWith("**") && line.endsWith("**")) {
            line = line.slice(2, -2);
          } else if (line.startsWith("*") && line.endsWith("*")) {
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
  
      const updatedContent = updatedLines.join("\n");
      return { ...prevFormData, content: updatedContent, selectedOption: option };
    });
  
    setPreviewVisible(true);
  }, [lineIndex, setDataFields, setPreviewVisible]);
  

  const handleContentChange = useCallback((e) => {
    const { value } = e.target;
    if (value.charAt(value.length - 1) === "\n") {
      return;
    }
    const lines = value.split("\n");
    const currentLineIndex = e.target.selectionStart;
    const currentLine = lines.findIndex(
      (_, index) => index <= currentLineIndex && index + 1 >= currentLineIndex
    );

    const updatedLines = lines.map((line, index) => {
      if (index === currentLine && line.trim() === "") {
        return `${dataFields.selectedOption} `;
      }
      return line;
    });

    setDataFields((prev) => ({ ...prev, content: updatedLines.join("\n") }));
    setPreviewContent(updatedLines.join("\n"));
  }, [dataFields.selectedOption]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      const lines = dataFields.content.split("\n");
      if (dataFields.selectedOption === "*") {
        lines.push(`${dataFields.selectedOption} `);
      } else if (dataFields.selectedOption === "**") {
        lines.push(`${dataFields.selectedOption} ${dataFields.selectedOption}`);
      } else {
        lines.push(`${dataFields.selectedOption} `);
      }
      const updatedContent = lines.join("\n");
      setDataFields((prev) => ({ ...prev, content: updatedContent }));
      setLineIndex(lines.length - 1);
      setPreviewContent(updatedContent);
    }
  }, [dataFields.content, dataFields.selectedOption]);

  const changeLineIndex = useCallback((e) => {
    const letter = e.target.selectionStart;
    let count = 0;
    for (let i = 0; i < letter; i++) {
      if (previewContent.charAt(i) === "\n") {
        count++;
      }
    }
    setLineIndex(count);
  }, [previewContent]);

  const handlePaste = useCallback((e) => {
    const pastedContent = e.clipboardData.getData("text/plain");
    const updatedContent = dataFields.content + pastedContent;
    setDataFields((prev) => ({ ...prev, content: updatedContent }));
    setPreviewContent(updatedContent.split("\n").join("\n"));
  }, [dataFields.content]);

  const handleFeaturedImageSelect = useCallback((e) => {
    const file = e.target.files[0];
    setFeaturedImage(file)
  }, []);
  const handleSubmit = useCallback(async () => {
    const token = localStorage.getItem("id_token");
    try {
      const formData = new FormData();
      formData.append("image", featuredImage);
      Object.entries(dataFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  }, [dataFields]);
  console.log(dataFields)
  const { content, title, selectedOption, category, readTime, brief } = dataFields;
  return (
    <div className="markdown-container">
      <label>Title:</label>
      <input value={title} onChange={(e) => setDataFields((prev) => ({ ...prev, title: e.target.value }))} />
      <div>
        <div>
          <label>Featured Image:</label>
          <input type="file" onChange={handleFeaturedImageSelect} />
        </div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setDataFields((prev) => ({ ...prev, category: e.target.value }))}>
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
        <select value={readTime} onChange={(e) => setDataFields((prev) => ({ ...prev, readTime: e.target.value }))}>
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
          onChange={(e) => setDataFields((prev) => ({ ...prev, brief: e.target.value }))}
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
        onClick={changeLineIndex}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />

      {previewVisible && (
        <div>
          <ReactMarkdown>{previewContent}</ReactMarkdown>
        </div>
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default MarkdownEditor;
