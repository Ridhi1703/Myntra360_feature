import { Object3D } from 'three';

declare module 'three/examples/jsm/exporters/GLTFExporter.js' {
  export interface GLTFExporterOptions {
    binary?: boolean;
    trs?: boolean;
    onlyVisible?: boolean;
    truncateDrawRange?: boolean;
    embedImages?: boolean;
    animations?: THREE.AnimationClip[];
    forceIndices?: boolean;
    forcePowerOfTwoTextures?: boolean;
    includeCustomExtensions?: boolean;
  }

  export class GLTFExporter {
    parse(
      input: Object3D | Object3D[],
      onDone: (gltf: object | ArrayBuffer) => void,
      onError?: (error: ErrorEvent) => void,
      options?: GLTFExporterOptions
    ): void;
  }
}