/* src/FileUpload.js */
import React, { useState } from 'react';
import GoogleAuth from './GoogleAuth';

const FileUpload = () => {
  const [ownerDirectory, setOwnerDirectory] = useState(null);
  const [tenantDirectory, setTenantDirectory] = useState(null);
  const [propertyDirectory, setPropertyDirectory] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSignIn = (token) => {
    setAccessToken(token);
  };

  const uploadFile = async (file, folderId) => {
    console.log('Uploading file:', file);
    if (!file || !file.type) {
      throw new Error('Invalid file provided.');
    }

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId],
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form,
    });

    const data = await response.json();
    return data.id;
  };

  const handleSubmit = async () => {
    if (!ownerDirectory || !tenantDirectory || !propertyDirectory) {
      alert('Please select all three files.');
      return;
    }

    if (!accessToken) {
      alert('Please sign in with Google first.');
      return;
    }

    try {
      console.log("Uploading files to Google Drive...");
      const ownerFileId = await uploadFile(ownerDirectory, '1dkXp9YEwrrKQHjZWD9zFt8mfRHWobwpc');
      const tenantFileId = await uploadFile(tenantDirectory, '1v0Rp2l3xWptxMTZGEtpliau4I1C0ZSms');
      const propertyFileId = await uploadFile(propertyDirectory, '1i_LvCe4SeXV_h6nmmYRRRYNO7gBeSVWU');

      const webhookUrl = 'https://trueguard-n8n.onrender.com/webhook/appfolio-update';
      const data = {
        owner: ownerFileId,
        tenant: tenantFileId,
        property: propertyFileId,
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Files uploaded and webhook sent successfully!');
      } else {
        alert('Failed to send webhook.');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="file-upload-container container mt-5">
      <h1 className="text-center mb-4">File Upload</h1>
      <div className="google-auth-section">
        <GoogleAuth onSignIn={handleSignIn} />
      </div>
      <div className="mb-3">
        <label htmlFor="ownerDirectory" className="form-label">Owner Directory <span style={{ color: 'red' }}>*</span></label>
        <input className="form-control" type="file" id="ownerDirectory" onChange={(e) => handleFileChange(e, setOwnerDirectory)} />
      </div>
      <div className="mb-3">
        <label htmlFor="tenantDirectory" className="form-label">Tenant Directory <span style={{ color: 'red' }}>*</span></label>
        <input className="form-control" type="file" id="tenantDirectory" onChange={(e) => handleFileChange(e, setTenantDirectory)} />
      </div>
      <div className="mb-3">
        <label htmlFor="propertyDirectory" className="form-label">Property Directory <span style={{ color: 'red' }}>*</span></label>
        <input className="form-control" type="file" id="propertyDirectory" onChange={(e) => handleFileChange(e, setPropertyDirectory)} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit} disabled={!ownerDirectory || !tenantDirectory || !propertyDirectory}>Upload and Notify</button>
    </div>
  );
};

export default FileUpload;
