import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * The production build is prerendered (see scripts/prerender.mjs) so that
 * crawlers which do not execute JavaScript receive the full page content.
 *
 * WHY createRoot AND NOT hydrateRoot
 * hydrateRoot was tried and rejected. The prerender captures the DOM from a
 * real browser via outerHTML, and the browser NORMALISES inline style
 * attributes: React emits `background: rgba(250,247,243,.92)`, the browser
 * serialises that back as eight longhand properties (background-image,
 * background-position-x, …, background-color). React then compares its own
 * expected style against the normalised string and reports a hydration
 * mismatch. This design system styles almost everything with inline style
 * objects, so the mismatch is pervasive and not fixable by guarding state.
 *
 * createRoot replaces the prerendered markup on mount. Crawlers still get the
 * full content in the initial HTML — which is the entire point of the
 * prerender — and there is no hydration step, so no mismatch is possible.
 * The re-render is imperceptible because the markup it replaces is identical.
 *
 * Note the state guards in App.tsx and FrameworkSection.tsx are still
 * required: they keep the prerendered HTML free of visitor-specific state,
 * so no one's saved cohort is ever baked into the shipped page.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
