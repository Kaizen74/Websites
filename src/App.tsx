import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FrameworkSection } from './components/FrameworkSection';
import { ActivatorsSection } from './components/ActivatorsSection';
import { ChangeLevers } from './components/ChangeLevers';
import { DiagnosticSurvey } from './components/DiagnosticSurvey';
import { ResultsDashboard } from './components/ResultsDashboard';
import { CohortDashboard } from './components/CohortDashboard';
import type { DiagnosticResults, CohortMember } from './types';
import { STORAGE_KEYS, SECTION_IDS } from './constants';
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
  const [cohort, setCohort] = useState<CohortMember[]>(() => loadCohort());

  // Check for existing results on mount
  useEffect(() => {
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
        <FrameworkSection />
        <ActivatorsSection priorityActivators={priorityActivators} />
        <ChangeLevers />

        {/* CTA Section — solid ink band */}
        <section className="py-24" style={{ background: 'var(--color-ink)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="eyebrow mb-4" style={{ color: 'var(--color-red-on-dark)' }}>
              04 · The diagnostic
            </p>
            <h2
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
            >
              Ready to assess your organization?
            </h2>
            <p
              className="text-[16px] leading-relaxed mb-9 mx-auto"
              style={{ color: 'rgba(255,255,255,.72)', maxWidth: 560 }}
            >
              Eighteen questions across five dimensions, in about five minutes —
              a baseline read of organizational health, where to focus first,
              and a targeted intervention for each weak spot.
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

        {/* Footer — hairline on paper */}
        <footer
          className="py-10"
          style={{
            background: 'var(--color-paper)',
            borderTop: '1px solid var(--color-hairline)',
          }}
        >
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-display font-bold text-[var(--color-ink)]">
              OrgDesign Playbook
            </span>
            <span className="text-sm text-[var(--color-faint)]">
              A framework for organizational design and transformation
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
