import { render, screen, within } from '@testing-library/react';
import { AboutAuthor } from '../components/AboutAuthor';
import { profile, referenceArticles, faqEntries } from '../data/profile';

describe('About the author section', () => {
  test('states the entity name and job title', () => {
    render(<AboutAuthor />);
    expect(screen.getByRole('heading', { level: 2, name: profile.name })).toBeTruthy();
    expect(screen.getByText(profile.jobTitle)).toBeTruthy();
  });

  test('renders the entity description verbatim (must match structured data)', () => {
    render(<AboutAuthor />);
    expect(screen.getByText(profile.description)).toBeTruthy();
  });

  test('lists every area of expertise', () => {
    render(<AboutAuthor />);
    profile.knowsAbout.forEach((topic) => {
      expect(screen.getByText(topic)).toBeTruthy();
    });
  });

  test('links both reference articles with publisher attribution', () => {
    const { container } = render(<AboutAuthor />);
    referenceArticles.forEach((article) => {
      expect(screen.getByText(article.publisher)).toBeTruthy();
      const link = container.querySelector(`a[href="${article.url}"]`);
      expect(link).not.toBeNull();
      // External credibility links open safely and carry the me relationship
      expect(link!.getAttribute('rel')).toContain('noopener');
      expect(link!.getAttribute('target')).toBe('_blank');
    });
  });

  test('renders every FAQ question and answer visibly (AEO + schema parity)', () => {
    render(<AboutAuthor />);
    faqEntries.forEach((entry) => {
      expect(screen.getByRole('heading', { level: 3, name: entry.question })).toBeTruthy();
      expect(screen.getByText(entry.answer)).toBeTruthy();
    });
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
