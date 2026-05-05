"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const group = useRef();
  const mixerRef = useRef(null);
  const { scene, animations } = useGLTF(url);

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(group.current);

    if (animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.play();
      console.log('Playing:', animations[0].name);
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
      }
    });

    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
    };
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export default function TestPage() {
  return (
    <div className="w-screen h-screen bg-black" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: false, antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 3, -2]} intensity={0.8} />
        <pointLight position={[2, 3, 2]} intensity={0.5} />
        <pointLight position={[-2, 1, 3]} intensity={0.3} />
        <Model url="/models/model.glb" />
      </Canvas>
    </div>
  );
}
