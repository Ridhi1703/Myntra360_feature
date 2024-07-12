// src/components/UploadProductPhotos.tsx

"use client";

import { useState } from 'react';

interface UploadProductPhotosProps {
  onModelGenerated: (url: string) => void;
}

export default function UploadProductPhotos({ onModelGenerated }: UploadProductPhotosProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!files) {
      setMessage('No files selected.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Files uploaded successfully.');
        onModelGenerated(result.modelUrl);
      } else {
        setMessage('Failed to upload files.');
      }
    } catch (error) {
      setMessage('An error occurred during upload.');
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photos</button>
      {message && <p>{message}</p>}
    </div>
  );
}
