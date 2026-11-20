import { render, screen, within } from '@testing-library/react';
import App from '../App';
import { addCohortMember } from '../utils/cohort';
import { STORAGE_KEYS, SECTION_IDS, forwardToPlaybook, pageFromPath } from '../constants';
import type { DiagnosticResults, DimensionScores, LikertValue } from '../types';

function makeResults(scores: DimensionScores, overall: number): DiagnosticResults {
  return {
    dimensionScores: scores,
    overallScore: overall,
    responses: new Map<string, LikertValue>([['S1', 4]]),
    completedAt: new Date().toISOString(),
  };
}

const scores: DimensionScores = {
  structure: 60,
  people: 70,
  process: 40,
  mindset: 80,
  leadership: 50,
};

beforeEach(() => {
  localStorage.clear();
  window.location.hash = '';
});

afterEach(() => {
  window.location.hash = '';
});

describe('App smoke tests', () => {
  test('renders the playbook page with all sections', () => {
    render(<App page="playbook" />);
    expect(screen.getByText(/In this playbook/i)).toBeTruthy();
    expect(
      screen.getByText(/Integrated Organizational Capability and Change Framework/i)
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'How do you make organizational change stick?' })).toBeTruthy();
    // The five activators are credited to their source (operator decision,
    // 2026-11-19, reversing the July framework-neutral request)
    const activators = document.getElementById('activators')!;
    expect(activators.textContent).toMatch(/Adapted from Gregory Kesler and Amy Kates/);
    expect(activators.querySelector('cite')!.textContent).toBe(
      'Bridging Organization Design and Performance'
    );
  });

  test('AI-native section renders on the playbook page between change model and CTA', () => {
    render(<App page="playbook" />);
    expect(document.getElementById('ai-native')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'How does AI change organization design?' })).toBeTruthy();
    expect(screen.getByText('4.4 · AI-native design')).toBeTruthy();
  });

  test('section numbering runs 01-05, playbook 4.1-4.4, diagnostic last', () => {
    render(<App page="playbook" />);
    expect(screen.getByText('01 · How I think')).toBeTruthy();
    expect(screen.getByText('02 · How I work')).toBeTruthy();
    expect(screen.getByText('03 · Required, chosen or inherited?')).toBeTruthy();
    expect(screen.getByText('04 · The playbook')).toBeTruthy();
    expect(screen.getByText('4.1 · The framework')).toBeTruthy();
    expect(screen.getByText('4.2 · The five activators')).toBeTruthy();
    expect(screen.getByText('4.3 · The change model')).toBeTruthy();
    expect(screen.getByText('4.4 · AI-native design')).toBeTruthy();
    expect(screen.getByText('05 · The diagnostic')).toBeTruthy();
    // Earlier numbering schemes must be fully retired
    expect(screen.queryByText('04 · The diagnostic')).toBeNull();
    expect(screen.queryByText('01 · The framework')).toBeNull();
    expect(screen.queryByText('04 · AI-native design')).toBeNull();
  });

  test('playbook sections render in the order of the argument', () => {
    render(<App page="playbook" />);
    const ids = Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id);
    const order = ['hero', 'principles', 'approach', 'differences', 'playbook',
      'framework', 'activators', 'change-levers', 'ai-native', 'diagnostic'];
    const positions = order.map((id) => ids.indexOf(id));
    positions.forEach((pos) => expect(pos).toBeGreaterThanOrEqual(0));
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  test('About-the-author section renders with entity and credibility links', () => {
    render(<App />);
    const about = document.getElementById('about');
    expect(about).not.toBeNull();
    expect(about!.textContent).toContain('Organization Design Strategist');
    expect(about!.textContent).toContain('human-AI work partnership');
    expect(about!.querySelector('a[href*="ntu.edu.sg"]')).not.toBeNull();
    expect(about!.querySelector('a[href*="atalent.com"]')).not.toBeNull();
  });

  test('footer shows the personal brand signature and attribution', () => {
    render(<App />);
    const signature = screen.getByTestId('signature');
    expect(signature).toBeTruthy();
    // The name also appears in the About-the-author section, so scope to the
    // signature block rather than matching page-wide.
    expect(within(signature).getByText('Eric Yim')).toBeTruthy();
    expect(screen.getByText(/Designed & built by/i)).toBeTruthy();
    expect(screen.getByText(/Eric Yim · All rights reserved/i)).toBeTruthy();
  });

  test('playbook framework stays score-free even with saved results', () => {
    // Regression for the reported bug: stale diagnostic results in
    // localStorage were painting score badges onto the homepage framework.
    localStorage.setItem(
      STORAGE_KEYS.results,
      JSON.stringify({
        dimensionScores: scores,
        overallScore: 62,
        responses: { S1: 4 },
        completedAt: new Date().toISOString(),
      })
    );
    render(<App page="playbook" />);
    const framework = document.getElementById(SECTION_IDS.framework);
    expect(framework).not.toBeNull();
    expect(framework!.textContent).not.toMatch(/\d+%/);
  });

  test('#cohort hash without a saved cohort falls back to the playbook page', () => {
    window.location.hash = '#cohort';
    render(<App page="playbook" />);
    expect(screen.queryByTestId('cohort-dashboard')).toBeNull();
    expect(screen.getByText(/In this playbook/i)).toBeTruthy();
  });

  test('#cohort hash with a saved cohort opens the cohort dashboard', () => {
    addCohortMember('Alice', makeResults(scores, 60));
    addCohortMember('Bob', makeResults(scores, 72));
    window.location.hash = '#cohort';

    render(<App page="playbook" />);
    expect(screen.getByTestId('cohort-dashboard')).toBeTruthy();
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
  });

  test('diagnostic CTA links to the cohort dashboard when a cohort exists', () => {
    addCohortMember('Alice', makeResults(scores, 60));
    render(<App page="playbook" />);
    expect(screen.getByText(/View cohort dashboard \(1\)/i)).toBeTruthy();
  });

  test('home page is short: hero, questions, three principles, playbook bridge, connect, about', () => {
    render(<App />);
    const ids = Array.from(document.querySelectorAll('main section[id]')).map((x) => x.id);
    expect(ids).toEqual(['hero', 'questions', 'principles', 'playbook', 'connect', 'about']);
    // The method itself lives on the playbook page
    ['approach', 'differences', 'framework', 'activators', 'change-levers', 'ai-native'].forEach((id) =>
      expect(document.getElementById(id)).toBeNull()
    );
    expect(document.querySelectorAll('#principles h3')).toHaveLength(3);
    document.querySelectorAll<HTMLAnchorElement>('#principles a').forEach((a) =>
      expect(a.getAttribute('href')).toMatch(/^\/playbook#/)
    );
  });

  test('home page numbering runs 01-04', () => {
    render(<App />);
    ['01 · What I’m exploring', '02 · How I think', '03 · The playbook', '04 · Compare notes'].forEach((t) =>
      expect(screen.getByText(t)).toBeTruthy()
    );
  });

  test('the URL path picks the page', () => {
    expect(pageFromPath('/')).toBe('home');
    expect(pageFromPath('/playbook')).toBe('playbook');
    expect(pageFromPath('/playbook/')).toBe('playbook');
    expect(pageFromPath('/playbook.html')).toBe('playbook');
    expect(pageFromPath('/playbooks')).toBe('home');
  });

  test('links shared before the split still land: the home page forwards playbook anchors', () => {
    expect(forwardToPlaybook('home', '#ai-native')).toBe('/playbook#ai-native');
    expect(forwardToPlaybook('home', '#diagnostic')).toBe('/playbook#diagnostic');
    expect(forwardToPlaybook('home', '#results')).toBe('/playbook#results');
    // Anchors that exist on the home page stay put
    expect(forwardToPlaybook('home', '#about')).toBeNull();
    expect(forwardToPlaybook('home', '#principles')).toBeNull();
    expect(forwardToPlaybook('playbook', '#ai-native')).toBeNull();
  });
});
