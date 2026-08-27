import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

/**
 * Server-render entry, used ONLY by the build-time prerender
 * (scripts/prerender.mjs). It never ships to the browser.
 *
 * The tree here must stay identical to the one main.tsx mounts, so the markup
 * written into dist/index.html is the markup the client would produce.
 *
 * This renders in plain Node with no DOM. That is the point: there is no
 * window, no document and no localStorage, so a component that reads visitor
 * state during render cannot silently bake it into the shipped HTML — it
 * throws and fails the build instead. Every browser-global access in this app
 * lives in an effect or an event handler, both of which are skipped by
 * renderToString.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
