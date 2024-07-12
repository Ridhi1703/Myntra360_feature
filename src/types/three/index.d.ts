// Create this file if it doesn't exist
declare module 'three/examples/jsm/exporters/GLTFExporter' {
    import * as THREE from 'three';
  
    export class GLTFExporter {
      parse(
        input: THREE.Object3D,
        onCompleted: (gltf: any) => void,
        options?: { binary?: boolean }
      ): void;
    }
  }
  