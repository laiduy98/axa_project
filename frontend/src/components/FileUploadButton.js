import React, { useRef } from 'react';

const FileUploadButton = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button onClick={() => fileInputRef.current.click()}>Select file to upload</button>
    </div>
  );
};

export default FileUploadButton;