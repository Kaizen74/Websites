import { readFileSync } from 'fs';
import { join } from 'path';
import { render } from '@testing-library/react';
import App from '../App';
import { profile, faqEntries, ownedProfiles } from '../data/profile';
import { connectCopy, exploringQuestions } from '../data/home';
import { principles } from '../data/principles';

/**
 * The November 2026 review, items B–F: the site reads as a person's thinking
 * on organisation design and AI transformation, in British spelling and plain
 * words, with nothing that looks like an offer from someone who is employed.
 */
const ROOT = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');
const html = read('index.html');
const playbookHtml = read('playbook.html');
const llms = read(join('public', 'llms.txt')).replace(/\s+/g, ' ');

interface LdNode {
  '@type': string;
  speakable?: { cssSelector: string[] };
  mainEntity?: { name: string; acceptedAnswer: { text: string } }[];
  about?: { name: string }[];
  knowsAbout?: string[];
}
const graphOf = (doc: string): LdNode[] =>
  JSON.parse(doc.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1])['@graph'];
const homeNode = (t: string) => graphOf(html).find((n) => n['@type'] === t)!;
const playbookNode = (t: string) => graphOf(playbookHtml).find((n) => n['@type'] === t)!;

/** Visible text of a section, as a visitor reads it */
const sectionText = (id: string) => document.getElementById(id)?.textContent ?? '';

describe('B · the words people search with, framed as thought leadership', () => {
  test('the home title and snippet name organisation design and AI transformation', () => {
    const title = html.match(/<title>([^<]*)<\/title>/)![1];
    expect(title).toContain('AI Transformation');
    expect(title).toContain(profile.jobTitle);
    expect(profile.metaDescription).toMatch(/organisation design and AI transformation/);
    // "writes about", not "provides" or "helps": ideas, not a service
    expect(profile.metaDescription).toMatch(/^Eric Yim writes about/);
    expect(profile.description).toMatch(/writes about AI transformation/);
  });

  test('AI Transformation is a topic in the graph, on the page and in llms.txt', () => {
    expect(profile.knowsAbout).toContain('AI Transformation');
    expect(homeNode('Person').knowsAbout).toContain('AI Transformation');
    // both spellings of the core topic, so either search matches
    expect(profile.knowsAbout).toContain('Organisation Design');
    expect(profile.knowsAbout).toContain('Organization Design');
    expect(profile.featuredTopics).toContain('AI Transformation');
    expect(llms).toContain('AI Transformation');
    render(<App />);
    expect(sectionText('about')).toContain('AI Transformation');
    expect(sectionText('hero')).toContain('AI transformation');
  });

  test('a thought-leadership answer on AI transformation, mirrored everywhere', () => {
    const entry = faqEntries.find((e) => e.question === 'How does Eric Yim think about AI transformation?')!;
    expect(entry).toBeDefined();
    const ld = homeNode('FAQPage').mainEntity!.find((q) => q.name === entry.question)!;
    expect(ld.acceptedAnswer.text).toBe(entry.answer);
    expect(llms).toContain(`### ${entry.question}`);
    expect(llms).toContain(entry.answer);
  });

  test('the playbook Article headline is visible on the playbook page', () => {
    const headline = (graphOf(playbookHtml).find((n) => n['@type'] === 'Article') as unknown as { headline: string }).headline;
    render(<App page="playbook" />);
    expect(document.getElementById('ai-native')!.textContent).toContain(headline);
  });

  test('the playbook page is about AI transformation too', () => {
    expect(playbookNode('WebPage').about!.map((a) => a.name)).toContain('AI Transformation');
    expect(playbookNode('Article').about!.map((a) => a.name)).toContain('AI Transformation');
    expect(playbookHtml).toMatch(/<meta name="description" content="[^"]*for AI transformation/);
  });
});

describe('C · ways to connect are knowledge sharing only', () => {
  test('three ways: a conversation, the free playbook, following new thinking', () => {
    expect(connectCopy.ways.map((w) => w.title)).toEqual([
      'Compare notes',
      'Use the playbook',
      'Follow the thinking',
    ]);
  });

  test('every link goes to LinkedIn or the playbook; no form, no email, no offer', () => {
    render(<App />);
    const connect = document.getElementById('connect')!;
    const hrefs = Array.from(connect.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toHaveLength(3);
    hrefs.forEach((h) => expect([ownedProfiles[0].url, '/playbook']).toContain(h));
    expect(connect.querySelector('form, input, textarea')).toBeNull();
    expect(connect.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(connect.textContent).not.toMatch(
      /pro bono|consult|services?\b|hire|fees?\b|rates?\b|book a call|speaking|engag(e|ement) me/i
    );
  });
});

describe('D · British spelling in everything a reader sees', () => {
  // Proper titles keep their own spelling, and the knowledge graph carries the
  // US form of the core topic on purpose (see B).
  const KEEP = [
    'Bridging Organization Design and Performance',
    'McKinsey Organizational Health Index',
    'Organization Effectiveness APAC & EMEA',
  ];
  const US = /\b(organiz\w*|standardiz\w*|harmoniz\w*|behaviors?|behavioral|optimiz\w*|specializ\w*|analyz\w*|prioritiz\w*|centraliz\w*|minimiz\w*|visualiz\w*|modeling)\b/i;
  const strip = (t: string) => KEEP.reduce((acc, k) => acc.split(k).join(''), t);

  test.each(['home', 'playbook'] as const)('%s page text has no US spellings', (page) => {
    render(<App page={page} />);
    const text = strip(document.body.textContent!);
    expect(text.match(US)?.[0] ?? null).toBeNull();
  });

  test('llms.txt, titles and descriptions have no US spellings', () => {
    const heads = [html, playbookHtml].map((h) =>
      [...h.matchAll(/<(?:title)>([^<]*)<|content="([^"]*)"/g)].map((m) => m[1] ?? m[2]).join(' ')
    );
    const llmsProse = strip(llms).replace(/https?:\/\/\S+/g, '').replace(/Organization Design ·?/g, '');
    for (const t of [...heads, llmsProse]) expect(strip(t).match(US)?.[0] ?? null).toBeNull();
  });
});

describe('E · plain words on the home page', () => {
  test('the home page keeps playbook labels on the playbook', () => {
    render(<App />);
    const text = ['hero', 'questions', 'principles', 'playbook', 'connect'].map(sectionText).join(' ');
    expect(text).not.toMatch(
      /activator|T\.C\.C\.A\.R|AI-native|\bConfirmed\b|\bIndicated\b|\bHypothesis\b|six-stage|evidence grade/i
    );
  });

  test('principle 06 is plain on the home page and keeps its grades on the playbook', () => {
    const p06 = principles.find((p) => p.number === '06')!;
    render(<App />);
    expect(sectionText('principles')).toContain(p06.plainBody!);
    document.body.innerHTML = '';
    render(<App page="playbook" />);
    expect(sectionText('principles')).toContain(p06.body);
  });
});

describe('F · the home questions are answer-shaped and speakable', () => {
  test('each question is followed directly by its answer, 45 words or fewer', () => {
    render(<App />);
    const headings = Array.from(document.querySelectorAll('#questions h3'));
    expect(headings.map((h) => h.textContent)).toEqual(exploringQuestions.map((q) => q.question));
    exploringQuestions.forEach((q, i) => {
      expect(q.question.endsWith('?')).toBe(true);
      expect(headings[i].nextElementSibling!.textContent).toBe(q.body);
      expect(q.body.split(/\s+/).length).toBeLessThanOrEqual(45);
    });
  });

  test('the answers open with a direct reply, not scene-setting', () => {
    const [ai, differences, chart] = exploringQuestions.map((q) => q.body);
    expect(ai).toMatch(/^Most start from a tool/);
    expect(differences).toMatch(/^Only the ones that are required/);
    expect(chart).toMatch(/^Because /);
  });

  test('the ProfilePage speakable regions include the questions, and every selector matches', () => {
    const selectors = homeNode('ProfilePage').speakable!.cssSelector;
    expect(selectors).toEqual(expect.arrayContaining(['#questions h3', '#questions h3 + p']));
    render(<App />);
    selectors.forEach((sel) => expect(document.querySelectorAll(sel).length).toBeGreaterThan(0));
  });
});
