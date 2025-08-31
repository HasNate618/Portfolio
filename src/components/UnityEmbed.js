"use client";
import { useEffect, useRef, useState } from 'react';

// Unity WebGL embed component.
// Place Unity build output in: public/unity/<buildName>/
// Expected files (Unity 2021+ default):
//  <buildName>.loader.js
//  <buildName>.data
//  <buildName>.framework.js (or .js in uncompressed builds)
//  <buildName>.wasm
// Optional: StreamingAssets directory.

export default function UnityEmbed({ 
  buildName = 'MyUnityBuild', 
  className = '', 
  style = {}, 
  width = '100%', 
  height = 480,
  fileBase = 'build',              // File base name (e.g. Builds => Builds.loader.js)
  compression = 'none',             // Default now 'none' since uncompressed rebuild chosen
  startButtonText = 'Click to Start Game',
  startButtonStyle = {},
  modelDropped = false,
  onDropEffectComplete = () => {}
}) {
  const canvasWrapperRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [unityInstance, setUnityInstance] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // State for model drop animation
  const [showDropAnimation, setShowDropAnimation] = useState(false);
  
  // Check if we're on desktop
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
      checkDesktop();
      window.addEventListener('resize', checkDesktop);
      return () => window.removeEventListener('resize', checkDesktop);
    }
  }, []);
  
  // When model is dropped, trigger the animation and then start the game
  useEffect(() => {
    if (modelDropped && !gameStarted) {
      setShowDropAnimation(true);
      
      // After animation completes, start the game
      setTimeout(() => {
        setShowDropAnimation(false);
        setGameStarted(true);
        
        // Notify parent that drop effect is complete
        setTimeout(() => onDropEffectComplete(), 500);
      }, 1500); // Animation duration
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
  const basePath = `/unity/${buildName}/`;
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
            canvas.id = `unity-canvas-${buildName.replace(/[^a-zA-Z0-9]/g, '-')}`;
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
          const dataFile = `${basePath}/${fileBase}.data${suffix}`;
          // Use build.js for framework file (Unity uncompressed build)
          const frameworkFile = `${basePath}/${fileBase}.js${suffix}`;
          const wasmFile = `${basePath}/${fileBase}.wasm${suffix}`;
          console.log('[UnityEmbed] Loading build:', { loader: script.src, dataFile, frameworkFile, wasmFile, compression });

          // Create Unity with explicit canvas ID and container ID
          createUnityInstance(canvas, {
            dataUrl: dataFile,
            frameworkUrl: frameworkFile,
            codeUrl: wasmFile,
            streamingAssetsUrl: `/unity/${buildName}/StreamingAssets`,
            companyName: 'Portfolio',
            productName: buildName,
            productVersion: '1.0',
            // Explicitly specify the canvas ID as target
            id: canvas.id
          }).then((instance) => {
            if (!canceled) {
              setUnityInstance(instance);
              setLoading(false);
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
  }, [buildName, gameStarted, unityInstance]);

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
    <div id={`unity-container-${buildName.replace(/[^a-zA-Z0-9]/g, '-')}`} className={`unity-embed ${className}`} style={{ width, maxWidth: '100%', ...style }}>
      <div id={`unity-wrapper-${buildName.replace(/[^a-zA-Z0-9]/g, '-')}`} ref={canvasWrapperRef} style={{ position: 'relative', width: '100%', height, background: '#000', borderRadius: 12 }} />
      
      {/* Model drop animation */}
      {showDropAnimation && (
        <div 
          style={{ 
            position: 'relative', 
            marginTop: -height, 
            height, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontSize: 16, 
            background: 'rgba(0,0,0,0.8)', 
            borderRadius: 12,
            zIndex: 20,
            overflow: 'hidden'
          }}
        >
          <div className="model-drop-animation">
            <div className="model-drop-circle"></div>
            <div className="model-drop-pulse"></div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px', color: '#4fc3f7' }}>
              Starting Game...
            </h3>
          </div>
          <style jsx>{`
            .model-drop-animation {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .model-drop-circle {
              width: 100px;
              height: 100px;
              background: linear-gradient(135deg, #3b82f6, #8b5cf6);
              border-radius: 50%;
              animation: dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), glow 2s infinite alternate;
            }
            .model-drop-pulse {
              position: absolute;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              background: transparent;
              border: 3px solid #3b82f6;
              animation: pulse 1.5s infinite;
            }
            @keyframes dropIn {
              0% { transform: translateY(-200px) scale(0.2); opacity: 0; }
              60% { transform: translateY(20px) scale(1.1); }
              80% { transform: translateY(-10px) scale(0.95); }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              100% { transform: scale(2.5); opacity: 0; }
            }
            @keyframes glow {
              0% { box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.6); }
              100% { box-shadow: 0 0 30px 8px rgba(139, 92, 246, 0.8); }
            }
          `}</style>
        </div>
      )}
      
      {!gameStarted && !showDropAnimation && (
        <div 
          style={{ 
            position: 'relative', 
            marginTop: -height, 
            height, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontSize: 16, 
            background: 'rgba(0,0,0,0.7)', 
            borderRadius: 12,
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <button 
            onClick={handleStartGame}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
              ...startButtonStyle
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
              // Prevent event bubbling
              e.stopPropagation();
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)';
              // Prevent event bubbling
              e.stopPropagation();
            }}
          >
            {startButtonText}
          </button>
          <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.7 }}>
            Click to enable audio and input controls
          </p>
        </div>
      )}
      
      {gameStarted && loading && !error && (
        <div style={{ position: 'relative', marginTop: -height, height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, background: 'rgba(0,0,0,0.4)', borderRadius: 12 }}>
          Loading Unity Experience...
        </div>
      )}
      
      {error && (
        <div style={{ position: 'relative', marginTop: -height, height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontSize: 14, background: 'rgba(0,0,0,0.6)', borderRadius: 12, textAlign: 'center', padding: 16 }}>
          {error}
        </div>
      )}
      
      <p style={{ marginTop: 8, fontSize: 12, color: '#888', textAlign: 'center' }}>Built with Unity WebGL</p>
    </div>
  );
}
