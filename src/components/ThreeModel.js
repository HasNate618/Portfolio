"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Configuration constants for easy modification
const MOVEMENT_CONFIG = {
  MOVEMENT_SPEED: 0.05,
  LERP_SPEED: 0.05,
  MIN_MOVEMENT_STEP: 4,
  TARGET_SCREEN_X_PERCENT: 0.9,
  TARGET_SCREEN_Y_PERCENT: 0.5,
  OFF_SCREEN_X: 80,
  MOVEMENT_THRESHOLD: 20,
  HORIZONTAL_ROTATE_INTENSITY: 0.004,
  VERTICAL_ROTATE_INTENSITY: 0.03,
  DESKTOP_BREAKPOINT: 1024
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
  disableVerticalRotation = false,
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
      let animationToPlay = 'Robot4Attack';
      
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
        // Calculate speed in each direction
        const speedX = Math.abs(targetDirection.x * MOVEMENT_CONFIG.MOVEMENT_SPEED);
        const speedY = Math.abs(targetDirection.y * MOVEMENT_CONFIG.MOVEMENT_SPEED);

        // Face left/right when moving horizontally, tilt up/down when moving vertically
        let targetRotationY = 0;
        let targetRotationX = 0;

        // Horizontal movement: face left/right, amount depends on speed
        if (Math.abs(targetDirection.x) > Math.abs(targetDirection.y)) {
          // The more speed, the more it rotates left/right (max 45deg)
          const maxY = Math.PI / 4; // 45deg
          targetRotationY = Math.max(-maxY, Math.min(maxY, targetDirection.x * MOVEMENT_CONFIG.HORIZONTAL_ROTATE_INTENSITY * speedX));
        }

        // Vertical movement: tilt up/down, amount depends on speed
        if (!disableVerticalRotation) {
          if (targetDirection.y < -10) { // Moving up
            // Tilt upwards more strongly with speed (max 30deg)
            const maxUp = Math.PI / 6;
            targetRotationX = -Math.min(Math.abs(targetDirection.y * MOVEMENT_CONFIG.VERTICAL_ROTATE_INTENSITY * speedY), maxUp);
          } else if (targetDirection.y > 10) { // Moving down
            // Tilt downwards with speed (max 20deg)
            const maxDown = Math.PI / 6;
            targetRotationX = Math.min(targetDirection.y * MOVEMENT_CONFIG.VERTICAL_ROTATE_INTENSITY * speedY, maxDown);
          } else {
            // Slight tilt based on Y direction otherwise
            targetRotationX = targetDirection.y * 0.001;
          }
        } else {
          // When disabled, keep vertical rotation neutral
          targetRotationX = 0;
        }

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
          0,
          MOVEMENT_CONFIG.LERP_SPEED
        );
      } else if (hasArrived) {
        // Return to normal rotation after arriving
          group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            0,
            MOVEMENT_CONFIG.LERP_SPEED
          );
          group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            0,
            MOVEMENT_CONFIG.LERP_SPEED
          );
          group.current.rotation.z = THREE.MathUtils.lerp(
            group.current.rotation.z,
            0,
            MOVEMENT_CONFIG.LERP_SPEED
          );
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
  style = {},
  onDropOnUnity = () => {},
  visible = true
}) {
  // Helper function to get about section position
  const getAboutOffScreenPosition = () => {
    if (typeof window === 'undefined') {
      return { x: -500, y: -500 }; // Far off-screen during SSR
    }
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutTop = aboutRect.top + window.scrollY;
      const aboutMiddle = aboutTop + (aboutRect.height / 2);
      return {
        x: window.innerWidth + MOVEMENT_CONFIG.OFF_SCREEN_X, // Further right
        y: aboutMiddle
      };
    }
    
    return {
      x: window.innerWidth + MOVEMENT_CONFIG.OFF_SCREEN_X, // Further right
      y: window.innerHeight * MOVEMENT_CONFIG.TARGET_SCREEN_Y_PERCENT
    };
  };

  // Helper function to calculate target position with constraints
  const calculateConstrainedTargetY = (scrollTop) => {
    const targetScreenY = window.innerHeight * MOVEMENT_CONFIG.TARGET_SCREEN_Y_PERCENT;
    return scrollTop + targetScreenY;
  };

  // Helper function for panel side switching logic
  const calculateTargetX = (scrollTop, panelElems) => {
    const defaultTargetX = window.innerWidth * MOVEMENT_CONFIG.TARGET_SCREEN_X_PERCENT;
    const leftX = Math.max(120, window.innerWidth * 0.15);
    const rightX = Math.max(200, window.innerWidth * 0.85);
    const middleY = scrollTop + window.innerHeight / 2;

    let chosenX = defaultTargetX;
    let found = false;
    let nearest = { el: null, dist: Infinity, side: null };

    panelElems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const panelTop = rect.top + scrollTop;
      const panelBottom = panelTop + rect.height;
      const side = el.dataset.staggerSide || (panelElems.indexOf(el) % 2 === 0 ? 'left' : 'right');

      if (middleY >= panelTop && middleY <= panelBottom) {
        chosenX = side === 'left' ? rightX : leftX;
        found = true;
      } else {
        const dist = middleY < panelTop ? panelTop - middleY : middleY - panelBottom;
        if (dist < nearest.dist) {
          nearest = { el, dist, side };
        }
      }
    });

    if (!found && nearest.el) {
      chosenX = nearest.side === 'left' ? rightX : leftX;
    }

    return chosenX;
  };

  // Helper: get the document Y of the middle of the about section
  const getAboutMiddleDocumentY = () => {
    if (typeof window === 'undefined') return null;
    const aboutSection = document.getElementById('about');
    const scrollTop = window.scrollY || 0;
    if (!aboutSection) {
      // Fallback: viewport middle in document coords
      return scrollTop + window.innerHeight / 2;
    }
    const rect = aboutSection.getBoundingClientRect();
    const aboutTop = rect.top + scrollTop;
    return aboutTop + rect.height / 2;
  };

  // State for animation and movement
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(() => getAboutOffScreenPosition());
  const [targetPosition, setTargetPosition] = useState(() => getAboutOffScreenPosition());
  const targetPosRef = useRef(getAboutOffScreenPosition());
  const [isMoving, setIsMoving] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [staggerTriggered, setStaggerTriggered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverUnity, setIsOverUnity] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  // Track last scroll position for render-time viewport-based clamping
  const lastScrollYRef = useRef(0);
  
  // Refs
  const modelRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  
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
    // We stagger page panels (sections) visually and compute panel spans so the
    // model can move to the opposite side of the active panel when the vertical
    // middle of the viewport is inside that panel.
    let panelElems = [];

    const applyStaggerToPanels = () => {
      if (typeof window === 'undefined') return;
      panelElems = Array.from(document.querySelectorAll('section[id]'));
      
      // Only apply stagger on desktop
      if (window.innerWidth < MOVEMENT_CONFIG.DESKTOP_BREAKPOINT) return;
      
      panelElems.forEach((el, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        el.dataset.staggerSide = side;
        el.style.transition = 'transform 1s ease';
        el.dataset.isStaggered = 'false';
      });
    };

    const resizeHandler = () => {
      // Re-apply stagger on resize (clears previous dataset and styles)
      panelElems.forEach(el => {
        el.style.transform = '';
        el.style.transition = '';
        delete el.dataset.staggerSide;
        delete el.dataset.isStaggered;
      });
      setStaggerTriggered(false);
      
      // Reset to off-screen position relative to about section
      const offScreenPos = getAboutOffScreenPosition();
      setCurrentPosition(offScreenPos);
      setTargetPosition(offScreenPos);
      targetPosRef.current = offScreenPos;
      
      applyStaggerToPanels();
      handleScroll();
    };

    const handleScroll = () => {
      if (typeof window === 'undefined') return;
  const scrollTop = window.scrollY;
  // Track for render-time clamp
  lastScrollYRef.current = scrollTop;

      // Build panel list if empty
      if (!panelElems.length) applyStaggerToPanels();

      // Check if we've scrolled to the bottom of the about section to trigger stagger
      const aboutSection = document.getElementById('about');
      if (aboutSection && !staggerTriggered) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const aboutTop = aboutRect.top + scrollTop;
        const aboutBottom = aboutTop + aboutRect.height;
        
        // If we've scrolled past the bottom of the about section, apply stagger
        if (scrollTop >= aboutBottom - window.innerHeight) {
          // Only apply stagger on desktop
          if (window.innerWidth >= MOVEMENT_CONFIG.DESKTOP_BREAKPOINT) {
            const staggerOffset = Math.max(40, window.innerWidth * 0.1);
            
            panelElems.forEach((el, i) => {
              if (el.dataset.isStaggered !== 'true') {
                const side = el.dataset.staggerSide || (i % 2 === 0 ? 'left' : 'right');
                el.style.transform = `translateX(${side === 'left' ? -staggerOffset : staggerOffset}px)`;
                el.dataset.isStaggered = 'true';
              }
            });
          }
          
          setStaggerTriggered(true);
          
          // Set initial target position when stagger triggers
          const targetDocumentY = calculateConstrainedTargetY(scrollTop);
          const chosenX = calculateTargetX(scrollTop, panelElems);
          const newTarget = { x: chosenX, y: targetDocumentY };
          targetPosRef.current = newTarget;
          setTargetPosition(newTarget);
        }
      }

      // Only update model position after stagger is triggered
      if (!staggerTriggered) return;

      // Calculate new target position (always update when stagger is active)
      const targetDocumentY = calculateConstrainedTargetY(scrollTop);
      const chosenX = calculateTargetX(scrollTop, panelElems);
      const newTarget = { x: chosenX, y: targetDocumentY };
      
      targetPosRef.current = newTarget;
      setTargetPosition(newTarget);
    };

    if (typeof window !== 'undefined') {
      applyStaggerToPanels();
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', resizeHandler);
      handleScroll(); // Initial call

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', resizeHandler);
        // clean up any inline styles we applied
        panelElems.forEach(el => {
          if (el) {
            el.style.transform = '';
            el.style.transition = '';
            delete el.dataset.staggerSide;
            delete el.dataset.isStaggered;
          }
        });
      };
    }
  }, []);
  
  // Movement animation loop
  useEffect(() => {
    let animationFrameId;
    
    const moveTowardsTarget = () => {
      setCurrentPosition(prevPos => {
        const target = targetPosRef.current || targetPosition;
        const deltaX = target.x - prevPos.x;
        const deltaY = target.y - prevPos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < MOVEMENT_CONFIG.MOVEMENT_THRESHOLD) {
          setIsMoving(false);
          setHasArrived(true);
          return prevPos;
        }
        
        setIsMoving(true);
        setHasArrived(false);
        
        // Calculate movement steps with minimum step enforcement
        const stepXRaw = deltaX * MOVEMENT_CONFIG.MOVEMENT_SPEED;
        const stepYRaw = deltaY * MOVEMENT_CONFIG.MOVEMENT_SPEED;

        const stepX = Math.abs(stepXRaw) < MOVEMENT_CONFIG.MIN_MOVEMENT_STEP
          ? Math.sign(deltaX) * Math.min(Math.abs(deltaX), MOVEMENT_CONFIG.MIN_MOVEMENT_STEP)
          : stepXRaw;

        const stepY = Math.abs(stepYRaw) < MOVEMENT_CONFIG.MIN_MOVEMENT_STEP
          ? Math.sign(deltaY) * Math.min(Math.abs(deltaY), MOVEMENT_CONFIG.MIN_MOVEMENT_STEP)
          : stepYRaw;

        return { x: prevPos.x + stepX, y: prevPos.y + stepY };
      });
      
      // Continue animation loop
      if (!isDragging) {
        animationFrameId = requestAnimationFrame(moveTowardsTarget);
      }
    };
    
    // Start the animation loop
    if (!isDragging) {
      animationFrameId = requestAnimationFrame(moveTowardsTarget);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDragging, targetPosition]);
  
  // Check if we're on desktop and initialize position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initializePosition = () => {
      const offScreenPos = getAboutOffScreenPosition();
      if (!staggerTriggered) {
        setCurrentPosition(offScreenPos);
        setTargetPosition(offScreenPos);
        targetPosRef.current = offScreenPos;
      }
    };

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= MOVEMENT_CONFIG.DESKTOP_BREAKPOINT);
      if (window.innerWidth >= MOVEMENT_CONFIG.DESKTOP_BREAKPOINT) {
        initializePosition();
      }
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, [staggerTriggered]);
  
  // Early returns for non-desktop or invisible
  if (!isDesktop || !visible) return null;

  // Calculate direction vector for the model to look towards
  const targetDirection = {
    x: targetPosition.x - currentPosition.x,
    y: targetPosition.y - currentPosition.y
  };

  // Compute a constrained Y for display only (do not affect movement state)
  const aboutMiddleYDoc = getAboutMiddleDocumentY();
  // If we're still introducing the model (off-screen X to the right), allow it to appear
  // as soon as stagger triggers by clamping to viewport middle instead of about middle.
  const viewportMiddleDocY = (typeof window !== 'undefined')
    ? lastScrollYRef.current + window.innerHeight / 2
    : currentPosition.y;
  const isOffscreenRight = typeof window !== 'undefined' && currentPosition.x >= window.innerWidth;
  const entranceClampY = isOffscreenRight ? viewportMiddleDocY : (aboutMiddleYDoc ?? viewportMiddleDocY);
  const constrainedDisplayY = Math.max(currentPosition.y, entranceClampY);
  // Determine if our displayed Y is being clamped at the threshold
  const isYClamped = constrainedDisplayY - currentPosition.y > 0.5;

  return (
    <div 
      ref={modelRef}
      className={`${className} cursor-pointer three-model-container`} 
      style={{ 
        ...style, 
        position: 'absolute',
        left: `${currentPosition.x}px`,
        top: `${constrainedDisplayY}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        transition: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        if (!isDesktop) return;
        setIsDragging(true);
        const rect = modelRef.current.getBoundingClientRect();
        dragOffsetRef.current = {
          x: e.clientX - (rect.left + rect.width / 2),
          y: e.clientY - (rect.top + rect.height / 2)
        };
      }}
    >
      {/* Drag listeners */}
      {isDragging && (
        <DragListeners 
          onMove={(clientX, clientY) => {
            setHasArrived(false);
            setIsMoving(false);
            const scrollY = window.scrollY || 0;
            
            // Check if cursor is over Unity section
            const unitySection = document.getElementById('unity');
            if (unitySection) {
              const unityRect = unitySection.getBoundingClientRect();
              const isOver = 
                clientX >= unityRect.left && 
                clientX <= unityRect.right &&
                clientY >= unityRect.top && 
                clientY <= unityRect.bottom;
              setIsOverUnity(isOver);
            }
            
            setCurrentPosition({
              x: clientX - dragOffsetRef.current.x,
              y: clientY - dragOffsetRef.current.y + scrollY
            });
          }}
          onUp={(clientX, clientY) => {
            // Check if dropped on Unity
            const unitySection = document.getElementById('unity');
            if (unitySection && isOverUnity) {
              const unityRect = unitySection.getBoundingClientRect();
              if (
                clientX >= unityRect.left && 
                clientX <= unityRect.right &&
                clientY >= unityRect.top && 
                clientY <= unityRect.bottom
              ) {
                setIsPlayingAnimation(true);
                
                const modelElement = modelRef.current;
                if (modelElement) {
                  modelElement.style.transition = "transform 0.5s ease-in";
                  modelElement.style.transform = "translate(-50%, -50%) scale(0.2)";
                }
                
                setTimeout(() => onDropOnUnity(), 500);
                return;
              }
            }
            
            setIsDragging(false);
            setIsOverUnity(false);
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
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={3.5} 
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-3, 3, -2]} intensity={0.8} color="#add8e6" />
        <directionalLight position={[0, -2, -5]} intensity={1} color="#87ceeb" />
        <pointLight position={[2, 3, 2]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-2, 1, 3]} intensity={0.3} color="#e6f3ff" />
        <spotLight 
          position={[-5, 8, 3]} 
          angle={0.6} 
          penumbra={0.8} 
          intensity={0.6} 
          color="#ffffff"
          castShadow
        />
        
        <Model 
          url={modelUrl} 
          scale={modelScale} 
          position={modelPosition} 
          rotation={modelRotation}
          isPlayingAnimation={isPlayingAnimation}
          targetDirection={targetDirection}
          isMoving={isMoving}
          hasArrived={hasArrived}
          disableVerticalRotation={isYClamped}
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
    const handleUp = (e) => onUp(e.clientX, e.clientY);
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
