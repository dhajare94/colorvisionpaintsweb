import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Stage, Center } from '@react-three/drei';
import * as THREE from 'three';

const textures = [
  { id: 'bubble', name: 'Bubble Spray', file: '/img/texture/bubble spray.jpg', color: '#333333' },
  { id: 'dholpuri', name: 'Dholpuri', file: '/img/texture/dholpuri.jpg', color: '#EDE9D5' },
  { id: 'rustic', name: 'Rustic Brown', file: '/img/texture/rustic.jpg', color: '#8B5E3C' },
  { id: 'glow', name: 'Textglow Gold', file: '/img/texture/textglow.jpg', color: '#D4AF37' }
];

function Model({ texturePath }: { texturePath: string }) {
  const { scene } = useGLTF('/img/apartment_building_-_3d_model.glb');
  const texture = useTexture(texturePath);

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.anisotropy = 16;
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    const TARGET_GROUP_NAMES = new Set([
      'AB17_OBJ_0',
      'AB17_OBJ_1',
      'AB17_OBJ_2',
      'AB17_OBJ_3',
      'AB17_OBJ14'
    ]);

    const hasTargetAncestor = (object: THREE.Object3D | null) => {
      let current: THREE.Object3D | null = object;

      while (current) {
        if (TARGET_GROUP_NAMES.has(current.name || '')) {
          return true;
        }
        current = current.parent;
      }

      return false;
    };

    const createWallMaterial = (
      baseMaterial?: THREE.Material | null,
      side: THREE.Side = THREE.FrontSide,
      map: THREE.Texture | null = texture
    ) => {
      if (
        baseMaterial instanceof THREE.MeshStandardMaterial ||
        baseMaterial instanceof THREE.MeshPhysicalMaterial
      ) {
        const cloned = baseMaterial.clone();
        cloned.map = map;
        cloned.color = new THREE.Color('#ffffff');
        cloned.roughness = 0.85;
        cloned.metalness = 0.02;
        cloned.side = side;
        cloned.needsUpdate = true;
        return cloned;
      }

      return new THREE.MeshStandardMaterial({
        map,
        color: new THREE.Color('#ffffff'),
        roughness: 0.85,
        metalness: 0.02,
        side
      });
    };

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!child.material) return;
      if (child.userData._isInteriorShell) return;

      const mesh = child;

      if (!mesh.userData._originalMaterial) {
        mesh.userData._originalMaterial = mesh.material;
      }

      mesh.material = mesh.userData._originalMaterial;

      if (!hasTargetAncestor(mesh)) return;

      const original = Array.isArray(mesh.userData._originalMaterial)
        ? mesh.userData._originalMaterial[0]
        : mesh.userData._originalMaterial;

      if (!mesh.userData._interiorShell && mesh.parent) {
        const interiorShell = new THREE.Mesh(
          mesh.geometry,
          createWallMaterial(original, THREE.BackSide, null)
        );
        interiorShell.name = `${mesh.name}_interior`;
        interiorShell.position.copy(mesh.position);
        interiorShell.rotation.copy(mesh.rotation);
        interiorShell.scale.copy(mesh.scale);
        interiorShell.castShadow = mesh.castShadow;
        interiorShell.receiveShadow = mesh.receiveShadow;
        interiorShell.userData._isInteriorShell = true;
        mesh.parent.add(interiorShell);
        mesh.userData._interiorShell = interiorShell;
      }

      if (mesh.userData._interiorShell instanceof THREE.Mesh) {
        mesh.userData._interiorShell.material = createWallMaterial(original, THREE.BackSide, null);
      }

      mesh.material = createWallMaterial(original, THREE.FrontSide);
    });
  }, [scene, texture]);

  return <primitive object={scene} scale={0.01} />;
}

export default function BuildingVisualizer() {
  const [activeTexture, setActiveTexture] = useState(textures[1]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row h-full">
      <div className="relative h-[500px] lg:h-[600px] w-full lg:w-3/4 overflow-hidden rounded-[2.5rem] bg-neutral-100 shadow-inner">
        <Canvas shadows camera={{ position: [20, 10, 20], fov: 45 }}>
          <color attach="background" args={['#f5f5f5']} />
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6} shadows={{ type: 'contact', bias: -0.0015 }}>
              <Center>
                <Model texturePath={activeTexture.file} />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>

        <div className="absolute left-8 bottom-8 z-10 hidden md:block">
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-white shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Current Finish
            </p>
            <p className="text-sm font-bold text-neutral-900 tracking-tight">
              {activeTexture.name}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/4 flex flex-col justify-center">
        <h3 className="text-3xl tracking-tight text-neutral-900 mb-6 px-2">Exterior Finishes</h3>
        <p className="text-neutral-500 mb-8 px-2 font-medium">
          Select a premium texture to visualize its application on our architectural building model.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {textures.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTexture(t)}
              className={`p-1.5 rounded-2xl border-2 transition-all duration-300 ${
                activeTexture.id === t.id
                  ? 'border-neutral-900 scale-105 shadow-lg'
                  : 'border-transparent grayscale opacity-60 hover:opacity-100 hover:grayscale-0'
              }`}
            >
              <div className="overflow-hidden rounded-xl aspect-square relative">
                <img src={t.file} alt={t.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/5"></div>
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-neutral-700 text-center">
                {t.name}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-[#fde18b]/10 border border-[#fde18b] px-2 ml-2">
          <div className="flex items-center gap-3">
            <iconify-icon
              icon="solar:info-circle-linear"
              width="20"
              height="20"
              className="text-neutral-900"
            ></iconify-icon>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              3D Interaction
            </p>
          </div>
          <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-medium">
            Click and drag to rotate the building. Use scroll to zoom for detail.
          </p>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/img/apartment_building_-_3d_model.glb');
