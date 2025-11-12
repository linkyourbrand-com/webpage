'use client';

import { useState, ChangeEvent, FormEvent, useRef } from 'react';

export default function FileUploadForm() {
  // 1. State now holds a File object or null
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // 2. Typed handler for file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if files exist and set the first one
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  // 3. Typed handler for form submission
  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setLoading(true);
    setMessage('Uploading...');

    // Create FormData object
    const formData = new FormData();
    // Use the name 'file' for the server to grab
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success! File saved at: ${data.filePath}`);
        setPreviewUrl(data.filePath || null);
        setFile(null);
        // Use a ref to reset the native file input safely. Synthetic events are
        // pooled and `e.currentTarget` can be null after async/await.
        formRef.current?.reset();
      } else {
        // Handle server-side errors
        setMessage(`Upload failed: ${data.message || 'Server error.'}`);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Network or I/O error:', error);
      setMessage('An unexpected error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={!file || loading}>
        {loading ? 'Processing...' : 'Upload Image'}
      </button>
      {message && <p style={{ color: message.startsWith('Success') ? 'green' : 'red' }}>{message}</p>}
      {previewUrl && (
        <div style={{ marginTop: 12 }}>
          <p>Preview:</p>
          <img src={previewUrl} alt="uploaded preview" style={{ maxWidth: 400 }} />
        </div>
      )}
    </form>
  );
}