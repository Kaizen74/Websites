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
    expect(connect.textContent).not.toMatch(/pro bono|consult|services?\b|hire|fees?\b|rates?\b|speaking/i);
    // and none of the repository's guarded commercial phrases
    const guards = JSON.parse(read(join('scripts', 'guard-terms.json')));
    (guards.commercial as string[]).forEach((b64) =>
      expect(connect.textContent).not.toMatch(new RegExp(Buffer.from(b64, 'base64').toString(), 'i'))
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

describe('Voice: the no-ai-slop patterns stay out of what readers see', () => {
  // The skill's banned list. "leverage" is allowed only as the activators'
  // term of art (scale leverage against agility), where no plainer word fits.
  const BANNED =
    /\b(delve|foster|utilis\w*|facilitat\w*|empower\w*|streamlin\w*|robust|cutting-edge|paradigm shift|game.?changer|tapestry|realm|beacon|multifaceted|meticulous|intricate|paramount|transformative|elevate|embark|supercharge|harness|ever-evolving|holistic)\b/i;

  test.each(['home', 'playbook'] as const)('%s page uses none of the banned words', (page) => {
    render(<App page={page} />);
    expect(document.body.textContent!.match(BANNED)?.[0] ?? null).toBeNull();
  });

  test('no em dashes in the home copy, the FAQ answers or the About text', () => {
    const strings = [
      ...Object.values(connectCopy).flatMap((v) => (Array.isArray(v) ? v.flatMap((w) => [w.title, w.body]) : [v])),
      ...exploringQuestions.flatMap((q) => [q.question, q.body]),
      ...faqEntries.flatMap((e) => [e.question, e.answer]),
      profile.description,
      profile.metaDescription,
      profile.experienceSummary,
      profile.firstPersonNote,
    ];
    strings.forEach((s) => expect(s).not.toContain('—'));
  });

  test('answers do not open with throat-clearing or faux-insight setups', () => {
    const openers = [...exploringQuestions.map((q) => q.body), ...faqEntries.map((e) => e.answer)];
    openers.forEach((a) =>
      expect(a).not.toMatch(/^(Here’s the thing|The truth is|The reality is|What most people|It’s worth noting|In today’s)/i)
    );
  });

  test('his own words stay word for word', () => {
    const multiplier = faqEntries.find((e) => /multiplier/.test(e.question))!.answer;
    expect(multiplier).toContain('zero multiplied by any number is still zero');
    expect(multiplier).toContain('discerning the right time and place to use AI');
    expect(profile.firstPersonNote).toContain('I look at how the work really runs before I look at the org chart.');
  });
});

describe('Identity: who he is, and which Eric Yim', () => {
  const LI = `https://www.linkedin.com/in/${profile.linkedInId}`;
  const person = (doc: string) =>
    graphOf(doc).find((n) => n['@type'] === 'Person') as unknown as {
      sameAs: string[];
      disambiguatingDescription: string;
      identifier: { propertyID: string; value: string; url: string }[];
    };

  test('"Who is Eric Yim?" answers with Singapore and AI transformation, mirrored everywhere', () => {
    const who = faqEntries.find((e) => e.question === 'Who is Eric Yim?')!.answer;
    expect(who).toMatch(/^Eric Yim is a Singapore-based organisation design strategist who writes about AI transformation/);
    const ld = homeNode('FAQPage').mainEntity!.find((q) => q.name === 'Who is Eric Yim?')!;
    expect(ld.acceptedAnswer.text).toBe(who);
    expect(llms).toContain(who);
  });

  test.each([
    ['home', html],
    ['playbook', playbookHtml],
  ])('%s page names the same person by the same identifiers', (_name, doc) => {
    const p = person(doc);
    expect(p.sameAs).toContain(LI);
    expect(p.identifier).toEqual([{ '@type': 'PropertyValue', propertyID: 'LinkedIn', value: profile.linkedInId, url: LI }]);
    expect(p.disambiguatingDescription).toBe(profile.disambiguatingDescription);
    expect(doc).toContain(`<link rel="me" href="${LI}" />`);
  });

  test('the disambiguation uses only facts already on the site', () => {
    const d = profile.disambiguatingDescription;
    expect(d).toContain('Singapore');
    expect(d).toContain(profile.worksFor);
    expect(d).toContain(profile.linkedInId);
    expect(d).toContain(profile.alumniOf.year);
    // no employer data beyond his role (the boundary rule)
    expect(d).not.toMatch(/\d{2},\d{3}|employees|countries/);
  });

  test('llms.txt says which Eric Yim the site is about, near the top', () => {
    expect(llms).toContain('## Which Eric Yim');
    expect(llms.indexOf('## Which Eric Yim')).toBeLessThan(llms.indexOf('## What this site covers'));
    expect(llms).toContain(`whose LinkedIn profile is ${LI}`);
  });

  test('no talk or appearance list was added (operator decision, 2026-11-20)', () => {
    const coverage = graphOf(html).find((n) => n['@type'] === 'Person') as unknown as { subjectOf: unknown[] };
    expect(coverage.subjectOf).toHaveLength(2);
    expect(llms).not.toMatch(/LearnToLead|People Matters/);
  });
});
