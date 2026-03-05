# Build Plan: Projects Section Revamp

## Goals
- Merge Projects and Mobile Games into a single Projects section.
- Add filter tabs (Featured, AI/ML, Full Stack, Games, Hardware, Android, All).
- Add a desktop-only Projects fullscreen toggle that expands layout and hides the Nexus model.
- Add per-card image carousel with arrows and dot indicators (controls shown on hover).
- Move Hackathon Winner badge to image overlay (top-left).
- Add tech stack tags under links on each card.
- Centralize project data in a single data file for easy updates.

## Scope and Constraints
- Framework: Next.js 15 (App Router), React 19.
- Language: JavaScript only.
- Styling: Tailwind CSS + existing globals; preserve cyberpunk theme.
- Avoid new tooling or large refactors.

## Data Model
Create a central data file:
- File: `src/data/projects.js`
- Export array `PROJECTS` (or named export of your choice).
- Each entry should include:
  - `id` (string, unique)
  - `title` (string)
  - `description` (string)
  - `categories` (array of filter ids)
  - `featured` (boolean or include `featured` in categories)
  - `techStack` (array of strings)
  - `links` (array of { label, href })
  - `media` (array of image objects { src, alt, imageContain? })
  - `badges` (array of badge ids/labels; include Hackathon Winner)
  - `isHackathonWinner` (boolean) for overlay
  - `imageContain` (boolean) for app icons

Populate with the 12 existing projects, plus any additional projects you want to reach ~20.

## Components
Create a new project card component:
- File: `src/components/ProjectCard.js`
- Responsibilities:
  - Image carousel (prev/next, dot indicators)
  - Hover-revealed controls and dots
  - Hackathon overlay badge (top-left)
  - Links row + tech stack tags under links
  - Optional image containment for app icons
- Inputs:
  - `project` object
  - `isCompact` (for layout differences if needed)

Carousel behavior:
- Default to first image.
- Arrows cycle through images.
- Dots show current image.
- Buttons should be accessible (aria-label).

## Page Integration (src/app/page.js)
### Imports
- Add import for `ProjectCard` and `projects` data.

### State
- Add `projectFilter` state with default "featured".
- Add `projectsFullscreen` boolean state.

### Derived Data
- Compute `filteredProjects` based on selected filter.
  - For "featured": filter `categories.includes("featured")` or `featured === true`.
  - For "all": return all.
  - For category: `categories.includes(filter)`.

### Section list
- Remove `apps` from `baseSections`.

### ThreeModel visibility
- Update `visible={showThreeModel}` to `visible={showThreeModel && !projectsFullscreen}`.

### Replace Projects + Mobile Games sections
- Render a unified Projects section:
  - Title stays similar, keep cyberpunk styling.
  - Add filter tabs (use `.vsc-tab` styles from globals).
  - Add fullscreen toggle button (desktop only, should set `projectsFullscreen`).
  - Use responsive grid that changes with fullscreen:
    - Default: `max-w-4xl`, `grid-cols-1 md:grid-cols-2`.
    - Fullscreen: `max-w-7xl`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
- Map `filteredProjects` to `ProjectCard` components.

### Remove old Mobile Games section
- Delete the entire `apps` section and its nav tab entry.

## ThreeModel Updates (src/components/ThreeModel.js)
- Remove `apps` from `sections` array used for speech/targeting.
- Remove `apps` entry from `SPEECH_TEXT`.

## Next.js Image Configuration
- Update `next.config.mjs` to add `images.remotePatterns` for:
  - `upload.wikimedia.org`
- This enables remote Google Play badge images.

## Styling Adjustments
- Reuse existing badge classes.
- Ensure filter tabs align with `.vsc-tab` styling.
- Add any new CSS only if needed; prefer Tailwind utilities.

## Validation
- Run `npm run lint`.
- Manually verify:
  - Filter tabs work and highlight active.
  - Fullscreen toggle expands layout and hides Nexus model.
  - Carousel arrows/dots function and stay in bounds.
  - Hackathon badge shows as image overlay.
  - Tech stack tags display correctly.
  - Mobile layout remains clean.

## Rollout Order
1) Create `src/data/projects.js` with current projects data.
2) Add `src/components/ProjectCard.js` with carousel UI.
3) Update `src/app/page.js` section and state logic.
4) Update `src/components/ThreeModel.js`.
5) Update `next.config.mjs` with `images.remotePatterns`.
6) Run lint and fix any issues.

## Risks and Mitigations
- JSX replacement in `page.js` is large; use careful targeted edits.
- Carousel UI adds interaction complexity; keep state local and scoped.
- Remote image config needed for Play badge; add before testing.

## Future Extensions
- Add animation for filter transitions.
- Add hover preview text in carousel.
- Add tag-based search.
