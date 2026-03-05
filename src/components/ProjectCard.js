"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const CAROUSEL_FADE_CSS = `
  @keyframes carouselFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes lightboxFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default function ProjectCard({ project }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const images = project.media || [];
  const hasMultiple = images.length > 1;
  const current = images[imgIdx] || {};
  const useContain = project.imageContain || current.imageContain;

  const prev = useCallback(
    (e) => { e?.stopPropagation(); setImgIdx((i) => (i - 1 + images.length) % images.length); setFadeKey((k) => k + 1); },
    [images.length]
  );
  const next = useCallback(
    (e) => { e?.stopPropagation(); setImgIdx((i) => (i + 1) % images.length); setFadeKey((k) => k + 1); },
    [images.length]
  );

  // Keyboard nav + body scroll lock when lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, prev, next]);

  return (
    <>
      <style>{CAROUSEL_FADE_CSS}</style>
      <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 group">
        {/* Image carousel — click to open lightbox */}
        <div
          className="relative w-full cursor-zoom-in"
          style={{ aspectRatio: "3/2", minHeight: 100 }}
          onClick={() => current.src && setLightboxOpen(true)}
        >
          {current.src && (
            <Image
              key={fadeKey}
              src={current.src}
              alt={current.alt || project.title}
              fill
              className={`rounded-t-lg ${useContain ? "object-contain bg-black" : "object-cover"}`}
              style={{ animation: "carouselFade 0.3s ease-in-out" }}
            />
          )}

          {/* Hackathon winner overlay badge */}
          {project.isHackathonWinner && (
            <span
              className="absolute top-2 left-2 z-10 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded"
              style={{
                background: "rgba(80, 65, 0, 0.95)",
                color: "#fef08a",
                border: "1px solid rgba(255, 220, 100, 0.8)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                textShadow:
                  "0 0 8px rgba(254, 240, 138, 0.9), 0 0 16px rgba(254, 240, 138, 0.6), 0 0 24px rgba(255, 220, 100, 0.4)",
              }}
            >
              Hackathon Winner
            </span>
          )}

          {/* Carousel arrows (hover) */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ›
              </button>
            </>
          )}

          {/* Dot indicators — always visible */}
          {hasMultiple && (
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); setFadeKey((k) => k + 1); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === imgIdx ? "bg-cyan-400" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-xl mb-2 cyber-cyan">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 flex-1">{project.description}</p>

          {/* Links */}
          <div className="mt-4 flex flex-row flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition ${
                  link.hideOnMobile ? "hidden sm:inline" : ""
                }`}
              >
                &gt; {link.label}
              </a>
            ))}
          </div>

          {/* Tech stack tags */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded border border-cyan-400/30 text-cyan-400/80 bg-cyan-400/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox portal */}
      {lightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.88)", animation: "lightboxFadeIn 0.2s ease-out" }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Inner container — stops click-through to close */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: "90vw", height: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close lightbox"
                className="absolute top-0 right-0 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white text-2xl transition-colors"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                ×
              </button>

              {/* Full image */}
              {current.src && (
                <div className="relative w-full h-full">
                  <Image
                    key={fadeKey}
                    src={current.src}
                    alt={current.alt || project.title}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    style={{ animation: "carouselFade 0.3s ease-in-out" }}
                  />
                </div>
              )}

              {/* Prev / Next arrows */}
              {hasMultiple && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl rounded-full w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl rounded-full w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dots */}
              {hasMultiple && (
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setImgIdx(i); setFadeKey((k) => k + 1); }}
                      aria-label={`Go to image ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === imgIdx ? "bg-cyan-400" : "bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image counter */}
              {hasMultiple && (
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 text-white/70 text-sm px-3 py-1 rounded-full"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  {imgIdx + 1} / {images.length}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

