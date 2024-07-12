import { promises as fs } from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

interface GLTFExporterOptions {
  binary?: boolean;
}

export async function create3DModel(imageUrls: string[]): Promise<string> {
  const scene = new THREE.Scene();
  const textureLoader = new THREE.TextureLoader();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const texture = await new Promise<THREE.Texture>((resolve) => {
    textureLoader.load(path.join(process.cwd(), 'public', imageUrls[0]), (tex) => {
      resolve(tex);
    });
  });
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const exporter = new GLTFExporter();
  const gltfData = await new Promise<ArrayBuffer>((resolve) => {
    exporter.parse(
      scene,
      (result) => {
        if (result instanceof ArrayBuffer) {
          resolve(result);
        } else {
          const jsonString = JSON.stringify(result);
          resolve(new TextEncoder().encode(jsonString).buffer);
        }
      },
      { binary: true } as GLTFExporterOptions
    );
  });

  const filename = `model-${Date.now()}.glb`;
  const filePath = path.join(process.cwd(), 'public', 'models', filename);
  await fs.writeFile(filePath, Buffer.from(gltfData));

  return `/models/${filename}`;
}
