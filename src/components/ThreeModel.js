"use client";

import React, { useRef, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

// Configuration constants for easy modification
const MOVEMENT_CONFIG = {
  MOVEMENT_SPEED: 0.06,
  LERP_SPEED: 0.06,
  MIN_MOVEMENT_STEP: 4,
  TARGET_SCREEN_X_PERCENT: 0.9,
  TARGET_SCREEN_Y_PERCENT: 0.6,
  OFF_SCREEN_X: 80,
  MOVEMENT_THRESHOLD: 20,
  HORIZONTAL_ROTATE_INTENSITY: 0.004,
  VERTICAL_ROTATE_INTENSITY: 0.03,
  DESKTOP_BREAKPOINT: 1024
};

// Speech text for different sections
const SPEECH_TEXT = {
  about: "NEXUS ONLINE // Ready to explore Nathan's story?",
  skills: "ANALYZING CAPABILITIES // Impressive skill matrix detected",
  experience: "CAREER LOG ACCESSED // Tracking professional journey",
  projects: "PROJECT DATABASE ACCESSED // Creative excellence verified",
  unity: "ADVENTURE MODE READY // Drag me into the portal!",
  default: "NEXUS ACTIVATED // Your digital guide awaits"
};

// Apply auto-smooth normals with angle threshold (degrees).
// De-indexes geometry to allow vertex splitting on hard edges.
function autoSmoothNormals(geometry, angleDeg = 45) {
  const idx = geometry.index;
  if (!idx) return;

  const inCount = idx.count;
  const tCount = inCount / 3;
  const origPos = geometry.attributes.position;

  // De-index all attributes into Float32Arrays (avoids Uint16 JOINTS_0 issues)
  const deindexAttr = (attr) => {
    const src = attr.array;
    const itemSize = attr.itemSize;
    const out = new Float32Array(inCount * itemSize);
    // Handle normalized integer attributes (e.g. WEIGHTS_0 as Uint8 normalized)
    if (attr.normalized) {
      const maxVal = src instanceof Uint8Array ? 255 : src instanceof Uint16Array ? 65535 : 1;
      for (let i = 0; i < inCount; i++) {
        const si = idx.getX(i);
        for (let k = 0; k < itemSize; k++) {
          out[i * itemSize + k] = src[si * itemSize + k] / maxVal;
        }
      }
    } else {
      for (let i = 0; i < inCount; i++) {
        const si = idx.getX(i);
        for (let k = 0; k < itemSize; k++) {
          out[i * itemSize + k] = src[si * itemSize + k];
        }
      }
    }
    return new THREE.BufferAttribute(out, itemSize);
  };

  // De-indexed position
  const pos = deindexAttr(origPos);
  const threshold = Math.cos(angleDeg * Math.PI / 180);

  // Compute face normals from de-indexed positions
  const p = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  const e1 = new THREE.Vector3();
  const e2 = new THREE.Vector3();
  const fNormals = new Array(tCount);
  for (let i = 0; i < tCount; i++) {
    const i3 = i * 3;
    p[0].set(pos.getX(i3), pos.getY(i3), pos.getZ(i3));
    p[1].set(pos.getX(i3 + 1), pos.getY(i3 + 1), pos.getZ(i3 + 1));
    p[2].set(pos.getX(i3 + 2), pos.getY(i3 + 2), pos.getZ(i3 + 2));
    e1.subVectors(p[1], p[0]);
    e2.subVectors(p[2], p[0]);
    fNormals[i] = new THREE.Vector3().crossVectors(e1, e2).normalize();
  }

  // Group vertices by position (epsilon 0.001)
  const eps = 0.001;
  const vGroup = new Int32Array(inCount).fill(-1);
  const groups = [];
  for (let v = 0; v < inCount; v++) {
    if (vGroup[v] !== -1) continue;
    const g = [v];
    vGroup[v] = groups.length;
    for (let w = v + 1; w < inCount; w++) {
      if (vGroup[w] !== -1) continue;
      const dx = pos.getX(v) - pos.getX(w);
      const dy = pos.getY(v) - pos.getY(w);
      const dz = pos.getZ(v) - pos.getZ(w);
      if (dx * dx + dy * dy + dz * dz < eps) {
        g.push(w);
        vGroup[w] = groups.length;
      }
    }
    groups.push(g);
  }

  // Compute blended normals
  const normals = new Float32Array(inCount * 3);
  const n = new THREE.Vector3();
  const ref = new THREE.Vector3();

  for (const group of groups) {
    const faceSet = new Set();
    for (const v of group) faceSet.add(Math.floor(v / 3));
    const fis = [...faceSet];

    for (const v of group) {
      const fi = Math.floor(v / 3);
      ref.copy(fNormals[fi]);
      n.set(0, 0, 0);
      for (const fj of fis) {
        if (ref.dot(fNormals[fj]) >= threshold) {
          n.add(fNormals[fj]);
        }
      }
      if (n.length() === 0) n.copy(ref);
      else n.normalize();

      normals[v * 3] = n.x;
      normals[v * 3 + 1] = n.y;
      normals[v * 3 + 2] = n.z;
    }
  }

  // Build de-indexed versions of all attributes first (reuse pos for position)
  const newAttrs = { position: pos };
  for (const key in geometry.attributes) {
    if (key !== 'position' && key !== 'normal') {
      newAttrs[key] = deindexAttr(geometry.attributes[key]);
    }
  }

  // Replace geometry with non-indexed version (all attributes as Float32Array)
  geometry.setIndex(null);
  for (const key in newAttrs) {
    geometry.setAttribute(key, newAttrs[key]);
  }
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
}

function Model({ 
  url, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  animTrigger = 0,
  streamingTrigger = 0,
  waveTrigger = 0,
  targetDirection = { x: 0, y: 0 },
  isMoving = false,
  hasArrived = false,
  disableVerticalRotation = false,
  flyingIntoGame = false,
  onClick
}) {
  const group = useRef();
  const { scene: originalScene, animations } = useGLTF(url);
  
  // Clone scene with SkeletonUtils to fix skeleton binding on skinned meshes
  const scene = useMemo(() => {
    if (!originalScene) return null;
    originalScene.updateMatrixWorld(true);
    return SkeletonUtils.clone(originalScene);
  }, [originalScene]);
  
  const [hovered, setHovered] = useState(false);
  
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const currentAnimRef = useRef('Idle');
  const returnTimeoutRef = useRef(null);
  
  // Setup manual animation system
  useEffect(() => {
    if (!animations.length) return;
    
    const mixer = new THREE.AnimationMixer(group.current);
    const act = {};
    animations.forEach((clip) => {
      act[clip.name] = mixer.clipAction(clip);
    });
    mixerRef.current = mixer;
    actionsRef.current = act;
    
    console.log('Available animations:', Object.keys(act));
    
    // Play default animation
    const defaultAnim = act['Idle'] || act[Object.keys(act)[0]];
    if (defaultAnim) {
      defaultAnim.reset().setLoop(THREE.LoopRepeat).play();
      currentAnimRef.current = 'Idle';
    }
    
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
        if (child.material) {
          child.material.envMapIntensity = 0.8;
        }
        autoSmoothNormals(child.geometry, 35);
        console.log('Mesh geometry:', child.geometry.index ? 'indexed' : 'non-indexed', 'verts:', child.geometry.attributes.position.count);
      }
    });
    
    return () => {
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
      mixer.stopAllAction();
      mixerRef.current = null;
      actionsRef.current = {};
    };
  }, [animations, scene]);
  
  // Handle animation playback when clicked
  const fadeDuration = 0.15;
  useEffect(() => {
    if (!animTrigger) return;
    const act = actionsRef.current;
    const keys = Object.keys(act);
    if (!keys.length) return;
    
    // Clear any pending return-to-Idle timeout
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }
    
    const currentActions = Object.values(act).filter((a) => a.isRunning());
    const targetAnim = act['React'] || act[keys[0]];
    const returnAnim = act['Idle'] || act[keys[0]];
    
    // Fade out current actions quickly
    currentActions.forEach((a) => {
      if (a !== targetAnim) a.fadeOut(fadeDuration);
    });
    
    targetAnim.reset().setLoop(THREE.LoopOnce);
    targetAnim.fadeIn(fadeDuration);
    targetAnim.play();
    currentAnimRef.current = 'React';
    
    const duration = targetAnim.getClip().duration;
    returnTimeoutRef.current = setTimeout(() => {
      if (returnAnim) {
        targetAnim.fadeOut(fadeDuration);
        returnAnim.reset().setLoop(THREE.LoopRepeat);
        returnAnim.fadeIn(fadeDuration);
        returnAnim.play();
        currentAnimRef.current = 'Idle';
      } else {
        currentAnimRef.current = 'Idle';
      }
      returnTimeoutRef.current = null;
    }, (duration * 1000) - (fadeDuration * 1000));
  }, [animTrigger, animations]);
  
  // Play Talk animation when streaming starts
  useEffect(() => {
    if (!streamingTrigger) return;
    const act = actionsRef.current;
    const keys = Object.keys(act);
    if (!keys.length) return;
    
    // Clear any pending return timeout
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }
    
    const currentActions = Object.values(act).filter((a) => a.isRunning());
    const talkAnim = act['Talk'] || act[keys[0]];
    const returnAnim = act['Idle'] || act[keys[0]];
    
    currentActions.forEach((a) => {
      if (a !== talkAnim) a.fadeOut(fadeDuration);
    });
    
    talkAnim.reset().setLoop(THREE.LoopOnce);
    talkAnim.fadeIn(fadeDuration);
    talkAnim.play();
    currentAnimRef.current = 'Talk';
    
    const talkDuration = talkAnim.getClip().duration;
    returnTimeoutRef.current = setTimeout(() => {
      if (returnAnim) {
        talkAnim.fadeOut(fadeDuration);
        returnAnim.reset().setLoop(THREE.LoopRepeat);
        returnAnim.fadeIn(fadeDuration);
        returnAnim.play();
        currentAnimRef.current = 'Idle';
      } else {
        currentAnimRef.current = 'Idle';
      }
      returnTimeoutRef.current = null;
    }, (talkDuration * 1000) - (fadeDuration * 1000));
  }, [streamingTrigger, animations]);
  
  // Play Wave animation once on entrance
  useEffect(() => {
    if (!waveTrigger) return;
    const act = actionsRef.current;
    const keys = Object.keys(act);
    if (!keys.length) return;
    
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }
    
    const currentActions = Object.values(act).filter((a) => a.isRunning());
    const waveAnim = act['Wave'] || act[keys[0]];
    const returnAnim = act['Idle'] || act[keys[0]];
    
    currentActions.forEach((a) => {
      if (a !== waveAnim) a.fadeOut(fadeDuration);
    });
    
    waveAnim.reset().setLoop(THREE.LoopOnce);
    waveAnim.fadeIn(fadeDuration);
    waveAnim.play();
    currentAnimRef.current = 'Wave';
    
    const waveDuration = waveAnim.getClip().duration;
    returnTimeoutRef.current = setTimeout(() => {
      if (returnAnim) {
        waveAnim.fadeOut(fadeDuration);
        returnAnim.reset().setLoop(THREE.LoopRepeat);
        returnAnim.fadeIn(fadeDuration);
        returnAnim.play();
        currentAnimRef.current = 'Idle';
      } else {
        currentAnimRef.current = 'Idle';
      }
      returnTimeoutRef.current = null;
    }, (waveDuration * 1000) - (fadeDuration * 1000));
  }, [waveTrigger, animations]);
  
  // Update mixer every frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    // Original rotation/movement logic follows
    if (group.current) {
      // Special rotation when flying into game
      if (flyingIntoGame) {
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          Math.PI,
          0.1
        );
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          -0.2,
          0.1
        );
      }
      else if (isMoving && !hasArrived) {
        const speedX = Math.abs(targetDirection.x * MOVEMENT_CONFIG.MOVEMENT_SPEED);
        const speedY = Math.abs(targetDirection.y * MOVEMENT_CONFIG.MOVEMENT_SPEED);
        let targetRotationY = 0;
        let targetRotationX = 0;
        if (Math.abs(targetDirection.x) > Math.abs(targetDirection.y)) {
          const maxY = Math.PI / 4;
          targetRotationY = Math.max(-maxY, Math.min(maxY, targetDirection.x * MOVEMENT_CONFIG.HORIZONTAL_ROTATE_INTENSITY * speedX));
        }
        if (!disableVerticalRotation) {
          if (targetDirection.y < -10) {
            const maxUp = Math.PI / 6;
            targetRotationX = -Math.min(Math.abs(targetDirection.y * MOVEMENT_CONFIG.VERTICAL_ROTATE_INTENSITY * speedY), maxUp);
          } else if (targetDirection.y > 10) {
            const maxDown = Math.PI / 6;
            targetRotationX = Math.min(targetDirection.y * MOVEMENT_CONFIG.VERTICAL_ROTATE_INTENSITY * speedY, maxDown);
          } else {
            targetRotationX = targetDirection.y * 0.001;
          }
        } else {
          targetRotationX = 0;
        }
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, MOVEMENT_CONFIG.LERP_SPEED);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, MOVEMENT_CONFIG.LERP_SPEED);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, MOVEMENT_CONFIG.LERP_SPEED);
      } else if (hasArrived) {
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, MOVEMENT_CONFIG.LERP_SPEED);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, MOVEMENT_CONFIG.LERP_SPEED);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, MOVEMENT_CONFIG.LERP_SPEED);
      }
      group.current.position.y = position[1];
      
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
  onDropStarted = () => {},
  onDragStart = () => {},
  onDragEnd = () => {},
  onCursorUpdate = () => {},
  visible = true,
  fadeOut = false,
  flyingIntoGame = false,
  chatMode = false,
  streamingTrigger = 0
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
  // Returns the horizontal midpoint between the visible panel edge (on its side)
  // and the corresponding viewport edge.
  const calculateTargetX = (scrollTop, panelElems) => {
    const defaultTargetX = window.innerWidth * 0.5; // fallback: screen center
    const middleY = scrollTop + window.innerHeight / 2;

    let active = null; // { el, side }
    let nearest = { el: null, dist: Infinity, side: null };

    panelElems.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const panelTop = rect.top + scrollTop;
      const panelBottom = panelTop + rect.height;
      const side = el.dataset.staggerSide || (idx % 2 === 0 ? 'left' : 'right');

      if (middleY >= panelTop && middleY <= panelBottom) {
        active = { el, side };
      } else {
        const dist = middleY < panelTop ? panelTop - middleY : middleY - panelBottom;
        if (dist < nearest.dist) nearest = { el, dist, side };
      }
    });

    const pick = active || (nearest.el ? nearest : null);
    if (!pick) return defaultTargetX;

    const rect = pick.el.getBoundingClientRect();
    if (pick.side === 'left') {
      // Center between the panel's right edge and the right edge of the page
      const panelRight = rect.right;
      const pageRight = window.innerWidth;
      return (panelRight + pageRight) / 2;
    } else {
      // Center between the left edge of the page and the panel's left edge
      const panelLeft = rect.left;
      const pageLeft = 0;
      return (pageLeft + panelLeft) / 2;
    }
  };

  // Helper function to determine current section and update speech
  const updateSpeechForCurrentSection = (scrollTop) => {
    if (typeof window === 'undefined') return;
    
    const sections = ['about', 'skills', 'experience', 'projects', 'unity'];
    const middleY = scrollTop + window.innerHeight / 2;
    let foundSection = null;
    
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollTop;
        const sectionBottom = sectionTop + rect.height;
        
        // Add some buffer to make section detection more forgiving
        if (middleY >= sectionTop - 100 && middleY <= sectionBottom + 100) {
          foundSection = sectionId;
          break;
        }
      }
    }
    
    const newSpeech = foundSection ? SPEECH_TEXT[foundSection] : SPEECH_TEXT.default;
    if (newSpeech !== currentSpeech) {
      setCurrentSpeech(newSpeech);
    }
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
  const [animTrigger, setAnimTrigger] = useState(0);
  const [waveTrigger, setWaveTrigger] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(() => getAboutOffScreenPosition());
  const [targetPosition, setTargetPosition] = useState(() => getAboutOffScreenPosition());
  const targetPosRef = useRef(getAboutOffScreenPosition());
  const [isMoving, setIsMoving] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [staggerTriggered, setStaggerTriggered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverUnity, setIsOverUnity] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentSpeech, setCurrentSpeech] = useState(SPEECH_TEXT.default);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatTargetPos, setChatTargetPos] = useState({ x: 0, y: 0 });
  const [chatSize, setChatSize] = useState(300);
  const chatSizeRef = useRef(300);
  const [currentSize, setCurrentSize] = useState(300);
  const chatModeRef = useRef(chatMode);
  const lastScrollYRef = useRef(0);
  
  // Refs
  const modelRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  
  const handleModelClick = () => {
    setAnimTrigger((n) => n + 1);
  };
  
  // Typewriter effect for speech bubble
  useEffect(() => {
    if (!currentSpeech) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const typingSpeed = 25;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < currentSpeech.length) {
        setDisplayedText(currentSpeech.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typeInterval);
  }, [currentSpeech]);
  
  // Coordinate conversion helper for chat mode transitions
  const convertToViewportY = (docY) => {
    if (typeof window === 'undefined') return docY;
    return docY - window.scrollY;
  };
  const convertToDocumentY = (vpY) => {
    if (typeof window === 'undefined') return vpY;
    return vpY + window.scrollY;
  };

  // Chat mode positioning
  useEffect(() => {
    chatModeRef.current = chatMode;
    if (typeof window === 'undefined') return;

    if (chatMode) {
      const size = Math.min(window.innerWidth * 0.35, 1100);
      setChatSize(size);
      chatSizeRef.current = size;
      const chatPos = {
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.58,
      };
      setChatTargetPos(chatPos);
      targetPosRef.current = chatPos;
      setIsDragging(false);
      setHasArrived(false);
      setIsMoving(true);
    } else {
      const normalSize = 300;
      setChatSize(normalSize);
      chatSizeRef.current = normalSize;
      const scrollTop = window.scrollY || 0;
      const targetDocumentY = calculateConstrainedTargetY(scrollTop);
      const panelElems = Array.from(document.querySelectorAll('section[id]'));
      const chosenX = calculateTargetX(scrollTop, panelElems);
      const normalPos = { x: chosenX, y: targetDocumentY };
      setChatTargetPos(normalPos);
      targetPosRef.current = normalPos;
      setTargetPosition(normalPos);
      setHasArrived(false);
      setIsMoving(true);
    }
  }, [chatMode]);

  // Synchronous coordinate conversion when switching chat mode to prevent visual jump
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (chatMode) {
      setCurrentPosition(prev => ({
        x: prev.x,
        y: convertToViewportY(prev.y),
      }));
    } else {
      setCurrentPosition(prev => ({
        x: prev.x,
        y: convertToDocumentY(prev.y),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMode]);
  
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

      // Update speech text based on current section (always, not just when staggered)
      updateSpeechForCurrentSection(scrollTop);

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

      // Re-check position every second to catch page reload with restored scroll
      // (scroll event won't fire when browser restores scroll position on load)
      const positionCheckInterval = setInterval(handleScroll, 1000);

      return () => {
        clearInterval(positionCheckInterval);
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
    let lastTime = performance.now();
    
    const moveTowardsTarget = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;
      
      // Cap delta time to prevent huge jumps (e.g., when tab is inactive)
      const cappedDelta = Math.min(deltaTime, 0.1);
      const frameRateFactor = cappedDelta * 60;
      
      setCurrentSize(prevSize => {
        const isChat = chatModeRef.current;
        const targetSize = isChat ? chatSizeRef.current : 300;
        const deltaSize = targetSize - prevSize;
        if (Math.abs(deltaSize) < 0.5) return targetSize;
        const stepSize = deltaSize * MOVEMENT_CONFIG.MOVEMENT_SPEED * frameRateFactor;
        return prevSize + stepSize;
      });
      
      setCurrentPosition(prevPos => {
        const isChat = chatModeRef.current;
        const target = isChat ? chatTargetPos : (targetPosRef.current || targetPosition);
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
        
        // Calculate movement steps with frame-rate independent timing (assuming 60 FPS as baseline)
        const stepXRaw = deltaX * MOVEMENT_CONFIG.MOVEMENT_SPEED * frameRateFactor;
        const stepYRaw = deltaY * MOVEMENT_CONFIG.MOVEMENT_SPEED * frameRateFactor;

        const stepX = Math.abs(stepXRaw) < MOVEMENT_CONFIG.MIN_MOVEMENT_STEP
          ? Math.sign(deltaX) * Math.min(Math.abs(deltaX), MOVEMENT_CONFIG.MIN_MOVEMENT_STEP * frameRateFactor)
          : stepXRaw;

        const stepY = Math.abs(stepYRaw) < MOVEMENT_CONFIG.MIN_MOVEMENT_STEP
          ? Math.sign(deltaY) * Math.min(Math.abs(deltaY), MOVEMENT_CONFIG.MIN_MOVEMENT_STEP * frameRateFactor)
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
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(moveTowardsTarget);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDragging, targetPosition, chatTargetPos]);
  
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
  
  // Wave 1s after model enters screen
  useEffect(() => {
    if (!staggerTriggered) return;
    const timer = setTimeout(() => setWaveTrigger((n) => n + 1), 1000);
    return () => clearTimeout(timer);
  }, [staggerTriggered]);
  
  // Wave 2s after entering chat mode
  useEffect(() => {
    if (!chatMode) return;
    const timer = setTimeout(() => setWaveTrigger((n) => n + 1), 1500);
    return () => clearTimeout(timer);
  }, [chatMode]);
  
  // Early returns for non-desktop or invisible
  if (!isDesktop || !visible) return null;

  const isInChatMode = chatModeRef.current;

  // Chat mode: smaller model, normal mode: bigger, moved down
  const adjustedScale = isInChatMode ? modelScale * 0.324 : modelScale * 0.52;
  const adjustedPosition = isInChatMode ? modelPosition : [modelPosition[0], modelPosition[1] - 0.8, modelPosition[2]];

  // Calculate direction vector for the model to look towards
  // Use chatTargetPos in chat mode since the movement loop uses it instead of targetPosition
  const moveTarget = isInChatMode ? chatTargetPos : targetPosition;
  const targetDirection = {
    x: moveTarget.x - currentPosition.x,
    y: moveTarget.y - currentPosition.y
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
  const viewportScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  const displayTop = isInChatMode
    ? currentPosition.y
    : constrainedDisplayY - viewportScrollY;
  
  // Crop canvas to reduce empty space, centered
  const cropOffset = 0;

  return (
    <div
      ref={modelRef}
      className={`${className} cursor-pointer three-model-container`}
        style={{
          ...style,
          position: 'fixed',
          left: `${currentPosition.x}px`,
          top: `${displayTop + cropOffset}px`,
        width: `${currentSize * (isInChatMode ? 1.2 : 1.32)}px`,
        height: `${currentSize * (isInChatMode ? 1.2 : 0.78)}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: isInChatMode ? 60 : 30,
          transition: 'opacity 0.4s ease',
          opacity: fadeOut ? 0 : 1,
          pointerEvents: fadeOut || isInChatMode ? 'none' : 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          outline: 'none',
        }}
      onPointerDown={(e) => {
        e.preventDefault();
        if (!isDesktop || chatMode) return;
        setIsDragging(true);
        onDragStart();
        onCursorUpdate(e.clientX, e.clientY);
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
            onCursorUpdate(clientX, clientY);
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
            // Check if dropped on Unity FIRST before ending drag
            const unitySection = document.getElementById('unity');
            if (unitySection && isOverUnity) {
              const unityRect = unitySection.getBoundingClientRect();
              if (
                clientX >= unityRect.left && 
                clientX <= unityRect.right &&
                clientY >= unityRect.top && 
                clientY <= unityRect.bottom
              ) {
                setAnimTrigger((n) => n + 1);
                
                // Call the drop started callback immediately for rotation
                onDropStarted();
                
                const modelElement = modelRef.current;
                if (modelElement) {
                  // Find the actual Unity canvas wrapper for more precise centering
                  const unityWrapper = unitySection.querySelector('[id*="unity-wrapper"]');
                  let targetRect = unityRect;

                  if (unityWrapper) {
                    targetRect = unityWrapper.getBoundingClientRect();
                  }

                  // Calculate center of Unity game container (in viewport coordinates)
                  const unityCenterX = targetRect.left + (targetRect.width / 2);
                  const unityCenterY = targetRect.top + (targetRect.height / 2);

                  // Current model center (in viewport coordinates)
                  const modelRect = modelElement.getBoundingClientRect();
                  const modelCenterX = modelRect.left + modelRect.width / 2;
                  const modelCenterY = modelRect.top + modelRect.height / 2;

                  // Delta to move from current center to Unity center
                  const dx = unityCenterX - modelCenterX;
                  const dy = unityCenterY - modelCenterY;

                  // Preserve the base centering translate(-50%,-50%) and add pixel delta
                  // Phase 1: move towards center without scaling
                  modelElement.style.transition = "transform 0.4s ease-out";
                  modelElement.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(1)`;

                  // Phase 2: after a brief delay, scale down while maintaining position
                  setTimeout(() => {
                    modelElement.style.transition = "transform .4s ease-in";
                    modelElement.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(0.1)`;
                  }, 400);
                }
                
                setTimeout(() => {
                  onDropOnUnity();
                  // End drag after animation completes
                  onDragEnd();
                }, 800);
                return;
              }
            }
            
            // End drag and let parent handle cursor glow
            onDragEnd();
            setIsDragging(false);
            setIsOverUnity(false);
            setHasArrived(false);
          }}
        />
      )}
      
      {/* Speech bubble */}
      {staggerTriggered && !chatMode && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
            border: '2px solid #00ffff',
            borderRadius: '20px',
            padding: '16px 20px',
            marginBottom: '15px',
            minWidth: '280px',
            maxWidth: '420px',
            fontSize: '15px',
            fontFamily: '"Courier New", monospace',
            fontWeight: '600',
            color: '#00ffff',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.6)',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            boxShadow: `
              0 0 30px rgba(0, 255, 255, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.15),
              inset 0 -2px 0 rgba(0, 255, 255, 0.1),
              0 8px 20px rgba(0, 0, 0, 0.5)
            `,
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: 1000,
            animation: isTyping ? 'none' : 'roboticPulse 2s ease-in-out infinite alternate',
            opacity: displayedText ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Robot indicator */}
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#00ffff',
              borderRadius: '50%',
              animation: 'roboticBlink 1.5s ease-in-out infinite',
              boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)',
              flexShrink: 0
            }} />
            
            <div style={{ flex: 1, lineHeight: '1.4' }}>
              {displayedText}
              {isTyping && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  backgroundColor: '#00ffff',
                  marginLeft: '2px',
                  animation: 'roboticCursor 1s ease-in-out infinite'
                }}>|</span>
              )}
            </div>
          </div>
          
          {/* Speech bubble tail */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '12px solid #1a1a1a',
            filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.3))'
          }} />
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '0px',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '14px solid #00ffff',
            opacity: 0.8
          }} />
        </div>
      )}
      
      {/* Add CSS keyframes for animations */}
      <style jsx>{`
        @keyframes roboticPulse {
          0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4); }
          100% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 6px 16px rgba(0, 0, 0, 0.5); }
        }
        
        @keyframes roboticBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        @keyframes roboticCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      
      <Canvas
        camera={{ position: cameraPosition, fov: 30 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <CanvasSizeSync />
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
          scale={adjustedScale} 
          position={adjustedPosition} 
          rotation={modelRotation}
          animTrigger={animTrigger}
          streamingTrigger={streamingTrigger}
          waveTrigger={waveTrigger}
          targetDirection={targetDirection}
          isMoving={isMoving}
          hasArrived={hasArrived}
          disableVerticalRotation={isYClamped}
          flyingIntoGame={flyingIntoGame}
          onClick={handleModelClick}
        />
      </Canvas>
    </div>
  );
}

export default ThreeModel;

// Syncs Three.js renderer to the container's actual size every frame.
// Bypasses ResizeObserver which can lag behind JS-animated size changes.
function CanvasSizeSync() {
  const { gl, camera } = useThree();

  useFrame(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w !== gl.domElement.width || h !== gl.domElement.height) {
      gl.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

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
