import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FrameworkSection } from './components/FrameworkSection';
import { ActivatorsSection } from './components/ActivatorsSection';
import { ChangeLevers } from './components/ChangeLevers';
import { DiagnosticSurvey } from './components/DiagnosticSurvey';
import { ResultsDashboard } from './components/ResultsDashboard';
import type { DiagnosticResults } from './types';
import { STORAGE_KEYS } from './constants';
import { mapToActivators } from './utils/scoring';
import './index.css';

type AppView = 'home' | 'survey' | 'results';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const [priorityActivators, setPriorityActivators] = useState<string[]>([]);

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
      } else if (hash) {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [results]);

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

  // Render based on current view
  if (currentView === 'results' && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <ResultsDashboard results={results} onReset={handleReset} />
        </main>
      </div>
    );
  }

  if (currentView === 'survey') {
    return (
      <div className="min-h-screen bg-gray-50">
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
        <FrameworkSection scores={results?.dimensionScores} />
        <ActivatorsSection priorityActivators={priorityActivators} />
        <ChangeLevers />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-secondary)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
              Ready to Assess Your Organization?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Take the 20-question diagnostic to understand your organizational health
              and receive personalized recommendations for improvement.
            </p>
            <button
              onClick={handleStartDiagnostic}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Start Diagnostic
            </button>
            {results && (
              <p className="text-gray-400 mt-4 text-sm">
                You have previous results.{' '}
                <button
                  onClick={() => {
                    setCurrentView('results');
                    window.location.hash = '#results';
                  }}
                  className="text-white underline hover:no-underline"
                >
                  View Results
                </button>
              </p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--color-charcoal)] text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              OrgDesign Playbook - A framework for organizational transformation
            </p>
            <p className="text-xs mt-2">
              Based on the Kates-Kesler framework for organizational design
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
