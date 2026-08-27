import { render, screen, within } from '@testing-library/react';
import { AboutAuthor } from '../components/AboutAuthor';
import {
  profile,
  career,
  credentials,
  ownedProfiles,
  referenceArticles,
  quotes,
  faqEntries,
} from '../data/profile';

describe('About the author section', () => {
  test('states the entity name, positioning and current role', () => {
    render(<AboutAuthor />);
    expect(screen.getByRole('heading', { level: 2, name: profile.name })).toBeTruthy();
    expect(screen.getByText(profile.jobTitle)).toBeTruthy();
    expect(
      screen.getByText(
        `${profile.featuredRole}, ${profile.worksFor} · ${profile.location}`
      )
    ).toBeTruthy();
  });

  test('renders the entity description verbatim (must match structured data)', () => {
    render(<AboutAuthor />);
    expect(screen.getByText(profile.description)).toBeTruthy();
  });

  test('shows the one-line experience proof and a compact qualifications line', () => {
    const { container } = render(<AboutAuthor />);
    expect(screen.getByText(profile.experienceSummary)).toBeTruthy();
    const line = credentials.map((c) => c.label).join(' · ');
    expect(screen.getByText(line)).toBeTruthy();
    // Qualifications are one line, not a stacked list of label+detail rows
    credentials.forEach((c) => {
      expect(container.textContent).not.toContain(c.detail);
    });
  });

  test('lists the featured topics only, and they are a subset of knowsAbout', () => {
    render(<AboutAuthor />);
    profile.featuredTopics.forEach((topic) => {
      expect(screen.getByText(topic)).toBeTruthy();
    });
    profile.featuredTopics.forEach((topic) => {
      expect(profile.knowsAbout).toContain(topic);
    });
    expect(profile.featuredTopics.length).toBeLessThan(profile.knowsAbout.length);
  });

  test('links LinkedIn and both articles with publisher attribution', () => {
    const { container } = render(<AboutAuthor />);
    [...ownedProfiles, ...referenceArticles].forEach((article) => {
      expect(screen.getAllByText(article.publisher).length).toBeGreaterThan(0);
      const link = container.querySelector(`a[href="${article.url}"]`);
      expect(link).not.toBeNull();
      expect(link!.getAttribute('rel')).toContain('noopener');
      expect(link!.getAttribute('target')).toBe('_blank');
    });
  });

  test('shows a single signature quote, not the full quote list', () => {
    const { container } = render(<AboutAuthor />);
    expect(container.querySelectorAll('blockquote')).toHaveLength(1);
    expect(screen.getByText(`“${quotes[0].text}”`)).toBeTruthy();
    quotes.slice(1).forEach((q) => {
      expect(container.textContent).not.toContain(q.text);
    });
  });

  test('renders every FAQ question and answer visibly (AEO + schema parity)', () => {
    render(<AboutAuthor />);
    faqEntries.forEach((entry) => {
      expect(screen.getByRole('heading', { level: 3, name: entry.question })).toBeTruthy();
      expect(screen.getByText(entry.answer)).toBeTruthy();
    });
  });

  test('the career history is deliberately NOT rendered (kept machine-facing)', () => {
    const { container } = render(<AboutAuthor />);
    // Past employers other than the current one must not appear as a list
    career
      .filter((c) => c.organization !== profile.worksFor)
      .forEach((entry) => {
        expect(container.textContent).not.toContain(entry.role);
      });
    // …and neither does the long bio or any award line
    expect(container.textContent).not.toContain(profile.bio);
    profile.awards.forEach((a) => {
      expect(container.textContent).not.toContain(a);
    });
    expect(container.textContent).not.toContain('SHRI');
  });

  test('is static — no buttons, inputs or interactive state', () => {
    const { container } = render(<AboutAuthor />);
    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(container.querySelectorAll('input')).toHaveLength(0);
  });

  test('uses a single H2 with H3 question headings beneath it', () => {
    const { container } = render(<AboutAuthor />);
    const section = container.querySelector('section#about') as HTMLElement;
    expect(section).not.toBeNull();
    expect(within(section).getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(
      faqEntries.length
    );
  });
});
