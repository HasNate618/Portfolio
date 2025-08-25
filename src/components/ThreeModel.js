"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Configuration constants for easy modification
const MOVEMENT_CONFIG = {
  MOVEMENT_SPEED: 0.03, // Slower movement speed (lower = slower)
  LERP_SPEED: 0.03, // How smoothly the model rotates/moves
  ROTATION_SPEED: 0.2, // Base rotation speed
  SPIN_SPEED: 3, // Speed when clicked
  TARGET_SCREEN_X_PERCENT: 0.9, // 90% from left edge
  TARGET_SCREEN_Y_PERCENT: 0.5, // 50% from top (middle)
  INITIAL_Y: 300, // Initial Y position in document
  INITIAL_X: 100, // Initial X position
  MOVEMENT_THRESHOLD: 50 // Distance threshold to consider "arrived"
};

function Model({ 
  url, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  isPlayingAnimation = false,
  targetDirection = { x: 0, y: 0 },
  isMoving = false,
  hasArrived = false,
  onClick
}) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions, mixer } = useAnimations(animations, group);
  const [hovered, setHovered] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  
  // Setup animations
  useEffect(() => {
    if (animations.length > 0) {
      console.log('Available animations:', Object.keys(actions));
      
      // Play Robot4IFloat by default, if available
      if (actions['Robot4IFloat']) {
        actions['Robot4IFloat'].play();
        setCurrentAction('Robot4IFloat');
      } else {
        // Fallback to first animation if Robot4IFloat doesn't exist
        const firstAnimationName = Object.keys(actions)[0];
        if (actions[firstAnimationName]) {
          actions[firstAnimationName].play();
          setCurrentAction(firstAnimationName);
        }
      }
    }
    
    // Add some environment maps to make the model shine
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 0.8;
        }
      }
    });
    
    // Cleanup
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, animations, mixer, scene]);
  
  // Handle animation playback when clicked
  useEffect(() => {
    if (isPlayingAnimation && animations.length > 0) {
      // Stop all current actions
      Object.values(actions).forEach(action => action.stop());
      
      // Play Robot6Attack1 when clicked
      let animationToPlay = 'Robot6Attack1';
      
      // Fallback to first animation if Robot6Attack1 doesn't exist
      if (!actions[animationToPlay]) {
        const animationNames = Object.keys(actions);
        animationToPlay = animationNames[0];
      }
      
      if (actions[animationToPlay]) {
        actions[animationToPlay]
          .reset()
          .setLoop(THREE.LoopOnce) // Play once
          .play();
        
        setCurrentAction(animationToPlay);
        
        // Return to Robot4IFloat after attack animation completes
        const duration = actions[animationToPlay].getClip().duration;
        setTimeout(() => {
          if (actions['Robot4IFloat']) {
            actions['Robot4IFloat']
              .reset()
              .setLoop(THREE.LoopRepeat)
              .play();
            setCurrentAction('Robot4IFloat');
          } else if (Object.keys(actions).length > 0) {
            // Fallback to first animation
            const firstAnimation = Object.keys(actions)[0];
            actions[firstAnimation]
              .reset()
              .setLoop(THREE.LoopRepeat)
              .play();
            setCurrentAction(firstAnimation);
          }
        }, duration * 1000);
      }
    }
  }, [isPlayingAnimation, actions, animations, currentAction]);
  
  // Handle rotation and movement based on target direction
  useFrame((state, delta) => {
    if (group.current) {
      // Determine behavior based on movement state
      if (isMoving && !hasArrived) {
        // Look towards target while moving
        const targetRotationY = Math.atan2(targetDirection.x, targetDirection.y);
        const targetRotationX = targetDirection.y * 0.001; // Slight tilt based on Y direction
        
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          targetRotationY,
          MOVEMENT_CONFIG.LERP_SPEED
        );
        
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          targetRotationX,
          MOVEMENT_CONFIG.LERP_SPEED
        );
        
        group.current.rotation.z = THREE.MathUtils.lerp(
          group.current.rotation.z,
          Math.sin(targetRotationY) * 0.1,
          MOVEMENT_CONFIG.LERP_SPEED
        );
      } else if (hasArrived) {
        // Return to normal rotation after arriving
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          0,
          MOVEMENT_CONFIG.LERP_SPEED
        );
        
        group.current.rotation.z = THREE.MathUtils.lerp(
          group.current.rotation.z,
          0,
          MOVEMENT_CONFIG.LERP_SPEED
        );
        
        // Gentle continuous rotation when arrived - REMOVED for better UX
        // if (!isPlayingAnimation) {
        //   group.current.rotation.y += delta * MOVEMENT_CONFIG.ROTATION_SPEED;
        // }
      } else {
        // Default gentle rotation when not moving - REMOVED for better UX
        // if (!isPlayingAnimation) {
        //   group.current.rotation.y += delta * MOVEMENT_CONFIG.ROTATION_SPEED;
        // }
      }
      
      // Hover effect - slight floating
      if (hovered) {
        group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else {
        // Return to base position when not hovered
        group.current.position.y = THREE.MathUtils.lerp(
          group.current.position.y,
          position[1],
          0.1
        );
      }
    }
  });

  return (
    <group 
      ref={group} 
      position={position} 
      rotation={rotation} 
      scale={[scale, scale, scale]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
}

function ThreeModel({ 
  className = "", 
  modelUrl = '/models/model.glb', 
  transparent = true,
  modelScale = 1,
  modelPosition = [0, 0, 0],
  modelRotation = [0, 0, 0],
  cameraPosition = [0, 0, 5],
  style = {}
}) {
  // State for animation and movement
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentPosition, setCurrentPosition] = useState({ 
    x: MOVEMENT_CONFIG.INITIAL_X, 
    y: MOVEMENT_CONFIG.INITIAL_Y 
  });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const modelRef = useRef(null);
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  
  // Desktop only check
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Handle model click to trigger animation
  const handleModelClick = () => {
    setIsPlayingAnimation(true);
    
    // Reset animation trigger after a short delay
    setTimeout(() => {
      setIsPlayingAnimation(false);
    }, 100); // Short delay just to trigger the animation
  };
  
  // Handle scroll to update model position and movement logic
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollTop = window.scrollY;
        setScrollY(scrollTop);
        
        // Calculate target position based on screen
        const targetScreenX = window.innerWidth * MOVEMENT_CONFIG.TARGET_SCREEN_X_PERCENT;
        const targetScreenY = window.innerHeight * MOVEMENT_CONFIG.TARGET_SCREEN_Y_PERCENT;
        
        // Convert screen position to document position
        const targetDocumentY = scrollTop + targetScreenY;
        
        setTargetPosition({ x: targetScreenX, y: targetDocumentY });
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Movement animation loop
  useEffect(() => {
    const moveTowardsTarget = () => {
  // Skip auto movement while dragging
  if (isDragging) return;
      setCurrentPosition(prevPos => {
        const deltaX = targetPosition.x - prevPos.x;
        const deltaY = targetPosition.y - prevPos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Check if we've arrived
        if (distance < MOVEMENT_CONFIG.MOVEMENT_THRESHOLD) {
          setIsMoving(false);
          setHasArrived(true);
          return prevPos; // Don't move if we're close enough
        }
        
        // We're moving towards target
        setIsMoving(true);
        setHasArrived(false);
        
        // Move towards target with slower speed
        const newX = prevPos.x + deltaX * MOVEMENT_CONFIG.MOVEMENT_SPEED;
        const newY = prevPos.y + deltaY * MOVEMENT_CONFIG.MOVEMENT_SPEED;
        
        return { x: newX, y: newY };
      });
    };
    
    const animationInterval = setInterval(moveTowardsTarget, 16); // ~60fps
    
    return () => clearInterval(animationInterval);
  }, [targetPosition, isDragging]);
  
  // Check if we're on desktop and initialize position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDesktop = () => {
        setIsDesktop(window.innerWidth >= 1024);
        
        // Initialize target position
        if (window.innerWidth >= 1024) {
          const targetScreenX = window.innerWidth * MOVEMENT_CONFIG.TARGET_SCREEN_X_PERCENT;
          const targetScreenY = window.innerHeight * MOVEMENT_CONFIG.TARGET_SCREEN_Y_PERCENT;
          setTargetPosition({ x: targetScreenX, y: targetScreenY });
        }
      };
      
      checkDesktop();
      window.addEventListener('resize', checkDesktop);
      return () => window.removeEventListener('resize', checkDesktop);
    }
  }, []);
  
  // Don't render on mobile
  if (!isDesktop) return null;

  // Calculate direction vector for the model to look towards
  const targetDirection = {
    x: targetPosition.x - currentPosition.x,
    y: targetPosition.y - currentPosition.y
  };

  return (
    <div 
      ref={modelRef}
      className={`${className} cursor-pointer three-model-container`} 
      style={{ 
        ...style, 
        position: 'absolute',
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        transition: 'none', // We handle movement manually for smoother control
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        if (!isDesktop) return;
        setIsDragging(true);
        const rect = modelRef.current.getBoundingClientRect();
        // Store offset between pointer and element center
        dragOffsetRef.current = {
          x: e.clientX - (rect.left + rect.width / 2),
          y: e.clientY - (rect.top + rect.height / 2)
        };
      }}
    >
      {/* Global pointer move / up listeners */}
      {isDragging && (
        <DragListeners 
          onMove={(clientX, clientY) => {
            setHasArrived(false);
            setIsMoving(false);
            // clientX/clientY are viewport coords; our currentPosition uses document coords
            // Add current scroll offset to Y so dragging while scrolled keeps correct position
            const scrollY = window.scrollY || 0;
            setCurrentPosition(prev => ({
              x: clientX - dragOffsetRef.current.x,
              y: clientY - dragOffsetRef.current.y + scrollY
            }));
          }}
          onUp={() => {
            setIsDragging(false);
            // After releasing, allow auto movement back to target
            setHasArrived(false);
          }}
        />
      )}
      <Canvas 
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ background: 'transparent' }}
        shadows
        gl={{ alpha: transparent, antialias: true }}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Main key light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Fill light from the opposite side */}
        <directionalLight 
          position={[-3, 3, -2]} 
          intensity={0.4} 
          color="#add8e6"
        />
        
        {/* Rim light for depth */}
        <directionalLight 
          position={[0, -2, -5]} 
          intensity={0.3} 
          color="#87ceeb"
        />
        
        {/* Point lights for additional depth */}
        <pointLight position={[2, 3, 2]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-2, 1, 3]} intensity={0.3} color="#e6f3ff" />
        
        {/* Subtle spotlight for dramatic effect */}
        <spotLight 
          position={[-5, 8, 3]} 
          angle={0.2} 
          penumbra={0.8} 
          intensity={0.6} 
          color="#ffffff"
          castShadow
        />
        
        <Model 
          url={modelUrl} 
          scale={modelScale} 
          position={[modelPosition[0], modelPosition[1], modelPosition[2]]} 
          rotation={modelRotation}
          isPlayingAnimation={isPlayingAnimation}
          targetDirection={targetDirection}
          isMoving={isMoving}
          hasArrived={hasArrived}
          onClick={handleModelClick}
        />
      </Canvas>
    </div>
  );
}

export default ThreeModel;

// Separate component to attach window-level listeners while dragging
function DragListeners({ onMove, onUp }) {
  useEffect(() => {
    const handleMove = (e) => onMove(e.clientX, e.clientY);
    const handleUp = () => onUp();
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });
    window.addEventListener('pointerleave', handleUp, { once: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointerleave', handleUp);
    };
  }, [onMove, onUp]);
  return null;
}
