import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'));
const MarkdownEditor = () => {
  const [content, setContent] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionToggle = (option) => {
    setSelectedOption(option);
    setPreviewVisible(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleOptionToggle('#')}>h1</button>
        <button onClick={() => handleOptionToggle('##')}>h2</button>
        <button onClick={() => handleOptionToggle('###')}>h3</button>
        <button onClick={() => handleOptionToggle('')}>p</button>
      </div>

      <div>
        <textarea value={content} onChange={handleContentChange} />

        {previewVisible && (
          <div>
            <ReactMarkdown>{`${selectedOption} ${content}`}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
