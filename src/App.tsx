import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FrameworkSection } from './components/FrameworkSection';
import { ActivatorsSection } from './components/ActivatorsSection';
import { ChangeLevers } from './components/ChangeLevers';
import { DiagnosticSurvey } from './components/DiagnosticSurvey';
import { ResultsDashboard } from './components/ResultsDashboard';
import { CohortDashboard } from './components/CohortDashboard';
import { AiNativeSection } from './components/AiNativeSection';
import { AboutAuthor } from './components/AboutAuthor';
import { Signature } from './components/Signature';
import { Principles } from './components/Principles';
import { Approach } from './components/Approach';
import { Differences } from './components/Differences';
import { PlaybookIntro } from './components/PlaybookIntro';
import type { DiagnosticResults, CohortMember } from './types';
import { STORAGE_KEYS, SECTION_IDS } from './constants';
import { COPYRIGHT_YEAR, ownedProfiles } from './data/profile';
import { mapToActivators } from './utils/scoring';
import {
  loadCohort,
  addCohortMember,
  removeCohortMember,
  clearCohort,
} from './utils/cohort';
import './index.css';

type AppView = 'home' | 'survey' | 'results' | 'cohort';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const [priorityActivators, setPriorityActivators] = useState<string[]>([]);
  // Starts empty and is filled on mount, NOT from a lazy initialiser.
  // The initialiser would read localStorage during render, which the
  // prerendered HTML cannot reproduce — a returning visitor with a saved
  // cohort would then hydrate a different tree than the captured markup.
  const [cohort, setCohort] = useState<CohortMember[]>([]);

  // Check for existing results and cohort on mount
  useEffect(() => {
    setCohort(loadCohort());
    try {
      const savedResults = localStorage.getItem(STORAGE_KEYS.results);
      if (savedResults) {
        const parsed = JSON.parse(savedResults);
        const loadedResults: DiagnosticResults = {
          ...parsed,
          responses: new Map(Object.entries(parsed.responses || {})),
        };
        setResults(loadedResults);
        setPriorityActivators(mapToActivators(loadedResults.dimensionScores));
      }
    } catch (error) {
      console.error('Error loading saved results:', error);
    }
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#diagnostic' || hash === '#survey') {
        setCurrentView('survey');
      } else if (hash === '#results' && results) {
        setCurrentView('results');
      } else if (hash === '#cohort' && cohort.length > 0) {
        setCurrentView('cohort');
      } else if (hash) {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [results, cohort.length]);

  // When returning home with a section hash from another view, scroll after
  // mount with a fixed-header offset (scrollIntoView would hide the heading)
  useEffect(() => {
    if (currentView !== 'home') return;
    const hash = window.location.hash;
    if (!hash || hash === `#${SECTION_IDS.hero}`) return;
    const target = document.querySelector(hash);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'auto' });
    }
  }, [currentView]);

  const handleSurveyComplete = (newResults: DiagnosticResults) => {
    setResults(newResults);
    setPriorityActivators(mapToActivators(newResults.dimensionScores));
    setCurrentView('results');
    window.location.hash = '#results';
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.responses);
      localStorage.removeItem(STORAGE_KEYS.progress);
      localStorage.removeItem(STORAGE_KEYS.results);
    } catch (error) {
      console.error('Error clearing saved state:', error);
    }
    setResults(null);
    setPriorityActivators([]);
    setCurrentView('survey');
    window.location.hash = '#diagnostic';
  };

  const handleStartDiagnostic = () => {
    setCurrentView('survey');
    window.location.hash = '#diagnostic';
  };

  // --- Cohort mode ---

  const handleSaveToCohort = (name: string) => {
    if (!results) return { ok: false as const, reason: 'empty-name' as const };
    const outcome = addCohortMember(name, results);
    if (outcome.ok) {
      setCohort(loadCohort());
    }
    return outcome;
  };

  const handleViewCohort = () => {
    setCurrentView('cohort');
    window.location.hash = '#cohort';
  };

  /** Clear the individual survey state so the next person starts fresh */
  const handleNextRespondent = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.responses);
      localStorage.removeItem(STORAGE_KEYS.progress);
      localStorage.removeItem(STORAGE_KEYS.results);
    } catch (error) {
      console.error('Error clearing saved state:', error);
    }
    setResults(null);
    setPriorityActivators([]);
    setCurrentView('survey');
    window.location.hash = '#diagnostic';
  };

  const handleRemoveCohortMember = (id: string) => {
    const remaining = removeCohortMember(id);
    setCohort(remaining);
    if (remaining.length === 0) {
      setCurrentView('home');
      window.location.hash = '';
    }
  };

  const handleClearCohort = () => {
    clearCohort();
    setCohort([]);
    setCurrentView('home');
    window.location.hash = '';
  };

  // Render based on current view
  if (currentView === 'cohort' && cohort.length > 0) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-paper)' }}>
        <Header />
        <main className="pt-16">
          <CohortDashboard
            members={cohort}
            onRemoveMember={handleRemoveCohortMember}
            onClearCohort={handleClearCohort}
            onAddRespondent={handleNextRespondent}
          />
        </main>
      </div>
    );
  }

  if (currentView === 'results' && results) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-paper)' }}>
        <Header />
        <main className="pt-16">
          <ResultsDashboard
            results={results}
            onReset={handleReset}
            cohortSize={cohort.length}
            onSaveToCohort={handleSaveToCohort}
            onViewCohort={handleViewCohort}
            onNextRespondent={handleNextRespondent}
          />
        </main>
      </div>
    );
  }

  if (currentView === 'survey') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-paper)' }}>
        <Header />
        <main className="pt-16">
          <DiagnosticSurvey onComplete={handleSurveyComplete} />
        </main>
      </div>
    );
  }

  // Default: Home view
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {/* The argument: who, what he believes, how he works */}
        <Principles />
        <Approach />
        <Differences />
        {/* The evidence: the playbook, 4.1–4.4 */}
        <PlaybookIntro />
        <FrameworkSection />
        <ActivatorsSection priorityActivators={priorityActivators} />
        <ChangeLevers />
        <AiNativeSection />

        {/* CTA Section — solid ink band */}
        <section className="py-24" style={{ background: 'var(--color-ink)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="eyebrow mb-4" style={{ color: 'var(--color-red-on-dark)' }}>
              05 · The diagnostic
            </p>
            <h2
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
            >
              Ready to assess your organization?
            </h2>
            <p
              className="text-[16px] leading-relaxed mb-4 mx-auto"
              style={{ color: 'rgba(255,255,255,.72)', maxWidth: 560 }}
            >
              Eighteen questions across five dimensions, in about five minutes —
              a baseline read of organizational health, where to focus first,
              and a targeted intervention for each weak spot.
            </p>
            <p
              className="text-[13px] leading-relaxed mb-9 mx-auto"
              style={{ color: 'rgba(255,255,255,.55)', maxWidth: 560 }}
            >
              Why it matters: healthy organizations are roughly three times more
              likely to outperform their peers (McKinsey Organizational Health
              Index), and active, visible sponsorship is the top contributor to
              change success (Prosci benchmarking research).
            </p>
            <button onClick={handleStartDiagnostic} className="btn btn-primary text-lg px-8 py-4">
              Start the diagnostic
            </button>
            {(results || cohort.length > 0) && (
              <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,.55)' }}>
                {results && (
                  <>
                    You have saved results.{' '}
                    <button
                      onClick={() => {
                        setCurrentView('results');
                        window.location.hash = '#results';
                      }}
                      className="underline hover:no-underline"
                      style={{ color: 'var(--color-red-on-dark)' }}
                    >
                      View results
                    </button>
                    {' · '}
                    <button
                      onClick={handleReset}
                      className="underline hover:no-underline"
                      style={{ color: 'var(--color-red-on-dark)' }}
                    >
                      Reset & start fresh
                    </button>
                  </>
                )}
                {cohort.length > 0 && (
                  <>
                    {results && ' · '}
                    <button
                      onClick={handleViewCohort}
                      className="underline hover:no-underline"
                      style={{ color: 'var(--color-red-on-dark)' }}
                    >
                      View cohort dashboard ({cohort.length})
                    </button>
                  </>
                )}
              </p>
            )}
          </div>
        </section>

        <AboutAuthor />

        {/* Footer — hairline on paper */}
        <footer
          className="py-12"
          style={{
            background: 'var(--color-paper)',
            borderTop: '1px solid var(--color-hairline)',
          }}
        >
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-sm text-[var(--color-faint)] text-center sm:text-left">
                Organization design · Human-AI work partnership · Singapore
              </span>
              {/* rel="me" ties this site and the profile together as one identity */}
              <a
                href={ownedProfiles[0].url}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
              >
                Follow on LinkedIn ↗
              </a>
            </div>

            {/* Personal brand sign-off */}
            <div
              className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ borderTop: '1px solid var(--color-hairline)' }}
            >
              <Signature />
              <span className="text-xs text-[var(--color-faint)] text-center sm:text-right">
                © {COPYRIGHT_YEAR} Eric Yim · All rights reserved
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
