"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

// Unity WebGL embed component.
// Place Unity build output in: public/unity/<buildName>/
// Expected files (Unity 2021+ default):
//  <buildName>.loader.js
//  <buildName>.data
//  <buildName>.framework.js (or .js in uncompressed builds)
//  <buildName>.wasm
// Optional: StreamingAssets directory.

const UnityEmbed = forwardRef(function UnityEmbed({ 
  className = '', 
  style = {}, 
  width = '100%', 
  height = 480,
  fileBase = 'unity',              // File base name (e.g. Builds => Builds.loader.js)
  compression = 'none',             // Default now 'none' since uncompressed rebuild chosen
  startButtonText = 'Click to Start Game',
  startButtonStyle = {},
  modelDropped = false,
  onDropEffectComplete = () => {},
  onUnityLoaded = () => {}
}, ref) {
  const canvasWrapperRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [unityInstance, setUnityInstance] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const audioContextsRef = useRef(new Set());
  const muteStateRef = useRef(false); // Track mute state globally
  
  // Expose fullscreen and sound control methods to parent via ref
  useImperativeHandle(ref, () => ({
    setUnityFullscreen: () => {
      if (unityInstance && typeof unityInstance.SetFullscreen === 'function') {
        unityInstance.SetFullscreen(1);
      }
    },
    setUnitySound: (enabled) => {
      // Store mute state globally so it persists
      muteStateRef.current = !enabled;
      
      // Control all audio contexts found during Unity execution
      const audioContexts = audioContextsRef.current;
      let count = 0;
      
      audioContexts.forEach(ctx => {
        try {
          if (enabled) {
            if (ctx.state === 'suspended') {
              ctx.resume().catch(e => console.warn('[UnityEmbed] Could not resume context:', e));
            }
          } else {
            if (ctx.state === 'running') {
              ctx.suspend().catch(e => console.warn('[UnityEmbed] Could not suspend context:', e));
            }
          }
          count++;
        } catch (e) {
          console.warn('[UnityEmbed] Error controlling audio context:', e);
        }
      });
      
      console.log('[UnityEmbed] Audio', enabled ? 'unmuted' : 'muted', `(${count} contexts)`);
    }
  }), [unityInstance]);
  
  // Check if we're on desktop
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
      checkDesktop();
      window.addEventListener('resize', checkDesktop);
      return () => window.removeEventListener('resize', checkDesktop);
    }
  }, []);
  
  // When model is dropped, start the game immediately
  useEffect(() => {
    if (modelDropped && !gameStarted) {
      setGameStarted(true);
      // Notify parent that drop effect is complete
      onDropEffectComplete();
    }
  }, [modelDropped, gameStarted, onDropEffectComplete]);

  // Reference to track if Unity has been loaded to prevent double-loading
  const unityLoadedRef = useRef(false);
  
  // Only load Unity when gameStarted is true
  useEffect(() => {
    // Don't do anything if game hasn't started
    if (!gameStarted) return;
    
    // Prevent multiple initializations
    if (unityLoadedRef.current) return;
    unityLoadedRef.current = true;
    
    let canceled = false;
    let script;
    const loadUnity = async () => {
      try {
        setLoading(true);
        
        // Intercept AudioContext creation to capture all contexts Unity creates
        const OriginalAudioContext = window.AudioContext || window.webkitAudioContext;
        if (OriginalAudioContext && !window._audioContextIntercepted) {
          window._audioContextIntercepted = true;
          const audioContextsRef_local = audioContextsRef;
          const muteStateRef_local = muteStateRef;
          
          window.AudioContext = class extends OriginalAudioContext {
            constructor() {
              super();
              audioContextsRef_local.current.add(this);
              
              // Create a master gain node for volume control (25% volume)
              const masterGain = this.createGain();
              masterGain.gain.value = 0.25;
              masterGain.connect(this.destination);
              
              // Override destination to route through gain node
              Object.defineProperty(this, '_masterGain', { value: masterGain });
              
              // Intercept connect calls to route through master gain
              const originalDestination = this.destination;
              Object.defineProperty(this, 'destination', {
                get: () => masterGain
              });
              
              // Override resume method to respect mute state
              const originalResume = this.resume.bind(this);
              this.resume = function() {
                if (muteStateRef_local.current) {
                  console.log('[UnityEmbed] Blocked resume() - mute is active');
                  return Promise.resolve();
                }
                return originalResume();
              };
              
              // Also override suspend to allow it
              const originalSuspend = this.suspend.bind(this);
              this.suspend = function() {
                muteStateRef_local.current = true;
                return originalSuspend();
              };
              
              console.log('[UnityEmbed] Captured audio context with 70% volume, total:', audioContextsRef_local.current.size);
            }
          };
          
          if (window.webkitAudioContext) {
            window.webkitAudioContext = window.AudioContext;
          }
        }
  
  const basePath = `/unity/`;
  script = document.createElement('script');
  // Loader script actual name pattern: <fileBase>.loader.js
  script.src = `${basePath}/${fileBase}.loader.js`;
        script.async = true;
        script.onload = () => {
          if (canceled) return;
          if (typeof createUnityInstance !== 'function') {
            setError('Unity loader not found');
            setLoading(false);
            return;
          }
          const canvas = document.createElement('canvas');
            canvas.id = `unity-canvas-${fileBase.replace(/[^a-zA-Z0-9]/g, '-')}`;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.outline = 'none';
            canvasWrapperRef.current.innerHTML = '';
            canvasWrapperRef.current.appendChild(canvas);
          // Unity loader will fetch exactly these URLs; ensure they exist and are correctly served.
          // If you kept compression enabled, you MUST either:
          //  1. Rebuild with Compression disabled (recommended for quick integration), OR
          //  2. Serve proper Content-Encoding headers for .br/.gz via next.config.js headers().
          // Current repo has .br files (Builds.data.br etc). Either rename (remove .br) after rebuild w/out compression
          // or configure headers and keep original names (renaming alone without header breaks loading).
          const suffix = compression === 'none' ? '' : (compression === 'brotli' ? '.br' : '.gz');
          const dataFile = `${basePath}${fileBase}.data${suffix}`;
          // Use framework.js for compressed builds, .js for uncompressed builds
          const frameworkFile = compression === 'none' ? `${basePath}${fileBase}.js` : `${basePath}${fileBase}.framework.js${suffix}`;
          const wasmFile = `${basePath}${fileBase}.wasm${suffix}`;
          console.log('[UnityEmbed] Loading build:', { loader: script.src, dataFile, frameworkFile, wasmFile, compression });

          // Create Unity with explicit canvas ID and container ID
          createUnityInstance(canvas, {
            dataUrl: dataFile,
            frameworkUrl: frameworkFile,
            codeUrl: wasmFile,
            streamingAssetsUrl: `/unity/StreamingAssets`,
            companyName: 'Portfolio',
            productName: fileBase,
            productVersion: '1.0',
            // Explicitly specify the canvas ID as target
            id: canvas.id
          }).then((instance) => {
            if (!canceled) {
              setUnityInstance(instance);
              setLoading(false);
              onUnityLoaded(); // Notify parent that Unity is loaded
              console.log('[UnityEmbed] Unity instance loaded successfully');
            }
          }).catch(e => {
            console.error(e);
            if (!canceled) {
              setError('Failed to initialize Unity');
              setLoading(false);
            }
          });
        };
        script.onerror = () => {
          if (!canceled) {
            setError('Failed to load Unity loader script');
            setLoading(false);
          }
        };
        document.body.appendChild(script);
      } catch (e) {
        console.error(e);
        if (!canceled) {
          setError('Unexpected error loading Unity build');
          setLoading(false);
        }
      }
    };
    loadUnity();
    return () => {
      canceled = true;
      if (script) script.remove();
      if (unityInstance) {
        try {
          unityInstance.Quit();
        } catch (e) {
          console.error('Error quitting Unity instance:', e);
        }
      }
    };
  }, [fileBase, gameStarted, unityInstance]);

  const handleStartGame = (e) => {
    // Prevent event bubbling
    e.stopPropagation();
    // Only set if not already started to prevent loop
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  // Don't render on mobile
  if (!isDesktop) {
    return (
      <div className={`unity-embed ${className}`} style={{ width, maxWidth: '100%', ...style }}>
        <div style={{ position: 'relative', width: '100%', height, background: '#111', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#666', fontSize: '16px', textAlign: 'center', padding: '20px' }}>
            This interactive demo is only available on desktop devices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id={`unity-container-${fileBase.replace(/[^a-zA-Z0-9]/g, '-')}`} className={`unity-embed ${className}`} style={{ width, maxWidth: '100%', ...style }}>
      <div id={`unity-wrapper-${fileBase.replace(/[^a-zA-Z0-9]/g, '-')}`} ref={canvasWrapperRef} style={{ position: 'relative', width: '100%', height, background: '#000', borderRadius: 12 }} />
      {error && (
        <div style={{ position: 'relative', marginTop: -height, height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontSize: 14, background: 'rgba(0,0,0,0.6)', borderRadius: 12, textAlign: 'center', padding: 16 }}>
          {error}
        </div>
      )}
      <p style={{ marginTop: 8, fontSize: 12, color: '#888', textAlign: 'center' }}>Built with Unity WebGL</p>
    </div>
  );
});

export default UnityEmbed;
