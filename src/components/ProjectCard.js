"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectCard({ project }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = project.media || [];
  const hasMultiple = images.length > 1;
  const current = images[imgIdx] || {};
  const useContain = project.imageContain || current.imageContain;

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  return (
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group">
      {/* Image carousel */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "3/2", minHeight: 100 }}
      >
        {current.src && (
          <Image
            src={current.src}
            alt={current.alt || project.title}
            fill
            className={`rounded-t-lg ${useContain ? "object-contain bg-black" : "object-cover"}`}
          />
        )}

        {/* Hackathon winner overlay badge */}
        {project.isHackathonWinner && (
          <span className="absolute top-2 left-2 z-10 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded"
            style={{
              background: "rgba(80, 65, 0, 0.95)",
              color: "#fef08a",
              border: "1px solid rgba(255, 220, 100, 0.8)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
              textShadow: "0 0 8px rgba(254, 240, 138, 0.9), 0 0 16px rgba(254, 240, 138, 0.6), 0 0 24px rgba(255, 220, 100, 0.4)",
            }}
          >
            Hackathon Winner
          </span>
        )}

        {/* Carousel controls (visible on hover when multiple images) */}
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
            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === imgIdx
                      ? "bg-cyan-400"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-xl mb-2 cyber-cyan">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-1">
          {project.description}
        </p>

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
  );
}
