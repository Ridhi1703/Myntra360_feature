// src/app/page.tsx

"use client";

import UploadProductPhotos from '@/components/UploadProductPhotos';
import Product3DViewer from '@/components/Product3DViewer';
import { useState } from 'react';

export default function HomePage() {
  const [modelUrl, setModelUrl] = useState('');

  const handleModelGenerated = (url: string) => {
    setModelUrl(url);
  };

  return (
    <div>
      <h1>Welcome to My Retail App</h1>
      <UploadProductPhotos onModelGenerated={handleModelGenerated} />
      {modelUrl && <Product3DViewer modelUrl={modelUrl} />}
    </div>
  );
}
