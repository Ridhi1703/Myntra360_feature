// src/components/Product3DViewer.tsx

"use client";

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function Product3DViewer({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={scene} />
      <OrbitControls />
    </Canvas>
  );
}
