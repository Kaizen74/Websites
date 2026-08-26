import { render, screen, within } from '@testing-library/react';
import { AboutAuthor } from '../components/AboutAuthor';
import { profile, credentials, referenceArticles, quotes, faqEntries } from '../data/profile';

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
      // Publisher names also appear as quote attributions, so assert the
      // label exists at least once rather than requiring uniqueness.
      expect(screen.getAllByText(article.publisher).length).toBeGreaterThan(0);
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

  test('shows the verified background credentials', () => {
    render(<AboutAuthor />);
    credentials.forEach((item) => {
      expect(screen.getByText(item.label)).toBeTruthy();
      expect(screen.getByText(item.detail)).toBeTruthy();
    });
    // Appears in both the credential label and the bio paragraph
    expect(
      screen.getAllByText(/Nanyang Technological University/).length
    ).toBeGreaterThan(0);
  });

  test('renders attributable quotes with their source', () => {
    const { container } = render(<AboutAuthor />);
    expect(container.querySelectorAll('blockquote')).toHaveLength(quotes.length);
    quotes.forEach((q) => {
      expect(screen.getByText(`“${q.text}”`)).toBeTruthy();
    });
    // Each quote is inside a figure with a figcaption crediting the source
    expect(container.querySelectorAll('figure figcaption').length).toBe(quotes.length);
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
