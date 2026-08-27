import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * The production build is prerendered (see scripts/prerender.mjs) so that
 * crawlers which do not execute JavaScript receive the full page content.
 *
 * WHY createRoot AND NOT hydrateRoot
 * hydrateRoot was tried and rejected when the prerender captured the DOM from
 * a real browser via outerHTML: browsers NORMALISE inline style attributes, so
 * React could never match its own expected style against the captured string,
 * and this design system styles almost everything with inline style objects.
 *
 * That specific obstacle is gone — the prerender now renders through
 * react-dom/server, so the markup in dist/index.html is React's own and would
 * match. createRoot is kept anyway, deliberately: it is the behaviour that is
 * in production and proven, it cannot produce a hydration mismatch under any
 * circumstance, and switching to hydrateRoot buys only a marginally cheaper
 * first paint. Prerendering exists here to feed crawlers, not to speed up
 * humans, so the extra risk has nothing to pay for it.
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
