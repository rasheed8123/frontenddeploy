import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("https://testingdeployment-qd0o.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadUrl(res.data.fileUrl);
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Media File</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginLeft: "10px" }}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadUrl && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Uploaded File URL:</strong></p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
          <div>
            {uploadUrl.match(/\.(jpeg|jpg|png|gif)$/) && <img src={uploadUrl} alt="Uploaded" width="300" />}
            {uploadUrl.match(/\.(mp4)$/) && <video src={uploadUrl} controls width="300" />}
            {uploadUrl.match(/\.(mp3)$/) && <audio src={uploadUrl} controls />}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
