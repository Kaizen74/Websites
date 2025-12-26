import { ArrowRight, BarChart3 } from 'lucide-react';
import { SECTION_IDS } from '../constants';

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-bg">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[var(--color-charcoal)] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '2s' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--color-charcoal)] leading-tight mb-6">
            Navigate Organizational{' '}
            <span className="text-[var(--color-primary)]">Transformation</span>{' '}
            with Confidence
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
            A comprehensive digital playbook for organizational design consultants.
            Assess organizational health, understand transformation frameworks,
            and prescribe evidence-based interventions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`#${SECTION_IDS.framework}`}
              className="btn btn-secondary group w-full sm:w-auto"
            >
              Explore Framework
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`#${SECTION_IDS.diagnostic}`}
              className="btn btn-primary group w-full sm:w-auto"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Start Diagnostic
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[var(--color-secondary)] rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[var(--color-secondary)] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
