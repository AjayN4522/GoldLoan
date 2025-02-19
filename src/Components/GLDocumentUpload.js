import React, { useState } from "react";
import "../Styles/GLDocumentUpload.css";

function GLDocumentUpload({ formData, setFormData, errors }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);

    setFormData({ ...formData, uploadedDocuments: [...(formData.uploadedDocuments || []), ...files] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <div className="gold-document-upload-main">
      <div className="gold-document-head">
        <p className="step-head-label">Documents</p>
      </div>
      <div className="gold-document-upload-section">
        <p className="gold-document-upload-labels">Upload Application Form</p>
        <label htmlFor="doc-uploads" className="gold-document-upload-button">
          <i className="bi bi-file-earmark-arrow-up"></i>
        </label>
        <input
          id="doc-uploads"
          style={{ display: "none" }}
          type="file"
          name="goldDocuments"
          multiple
          onChange={handleFileChange}
        />
      </div>
      
      <div className="gold-document-head">
        <p className="step-head-label">Reference</p>
        <input
          className="reference-text"
          placeholder="Reference"
          type="text"
          name="reference"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
  );
}

export default GLDocumentUpload;
