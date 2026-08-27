import { readFileSync } from 'fs';
import { join } from 'path';
import { profile, career, credentials, ownedProfiles } from '../data/profile';

/**
 * Consistency guard: the site must not contradict the authoritative
 * first-party profile (LinkedIn). Entity-resolution engines corroborate a
 * person across sources — a title or employer that disagrees with LinkedIn
 * weakens or splits the entity, so these facts are pinned here.
 *
 * Values below are transcribed from the LinkedIn profile export and are the
 * expected ground truth. If LinkedIn changes, update BOTH this file and
 * src/data/profile.ts — the mismatch is the point.
 */
const LINKEDIN = {
  name: 'Eric Yim',
  headline: 'Global OD, OE and Talent Leader',
  location: 'Singapore',
  profileUrl: 'https://www.linkedin.com/in/eric-yim-743910',
  currentEmployer: 'SATS Ltd.',
  currentRole: 'Global Head of OD and Talent',
  degrees: ['Nanyang Technological University Singapore', 'University of North Texas'],
  certification: 'Certified Prompt Engineer™',
  awards: [
    'SHRI Singapore HR Awards 2025 — Gold, Talent Management & Acquisition (SATS Ltd.)',
    'Global Brandon Hall Silver Excellence for Blended Learning (2018, Shell Business Operations)',
  ],
  employers: ['SATS Ltd.', 'Shell', 'Cargill', 'Civil Service College', 'Mizuho'],
} as const;

const ROOT = join(__dirname, '..', '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const llms = readFileSync(join(ROOT, 'public', 'llms.txt'), 'utf8');

function person(): Record<string, any> {
  const jsonLd = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]
  );
  return jsonLd['@graph'].find((n: Record<string, any>) => n['@type'] === 'Person');
}

describe('Site entity is consistent with the LinkedIn profile', () => {
  test('name matches', () => {
    expect(profile.name).toBe(LINKEDIN.name);
    expect(person().name).toBe(LINKEDIN.name);
  });

  test('LinkedIn is registered as an owned profile and a sameAs identity link', () => {
    expect(ownedProfiles.map((p) => p.url)).toContain(LINKEDIN.profileUrl);
    expect(person().sameAs).toContain(LINKEDIN.profileUrl);
  });

  test('jobTitle set reconciles the site positioning with LinkedIn and the press', () => {
    // The site leads with its chosen positioning…
    expect(profile.jobTitles[0]).toBe('Organization Design Strategist');
    // …but must also carry the titles LinkedIn and the features use, so the
    // entity corroborates instead of conflicting.
    expect(profile.jobTitles).toContain(LINKEDIN.headline);
    expect(profile.jobTitles).toContain(LINKEDIN.currentRole);
    const schemaTitles: string[] = person().jobTitle;
    expect(Array.isArray(schemaTitles)).toBe(true);
    expect(schemaTitles).toEqual([...profile.jobTitles]);
  });

  test('current employer matches LinkedIn', () => {
    expect(profile.worksFor).toBe(LINKEDIN.currentEmployer);
    expect(person().worksFor.name).toBe(LINKEDIN.currentEmployer);
    expect(career[0].organization).toBe(LINKEDIN.currentEmployer);
    expect(career[0].role).toBe(LINKEDIN.currentRole);
  });

  test('location matches LinkedIn', () => {
    expect(profile.location).toBe(LINKEDIN.location);
    expect(person().homeLocation.address.addressLocality).toBe(LINKEDIN.location);
  });

  test('both degrees from LinkedIn appear in alumniOf', () => {
    const alumni: string[] = person().alumniOf.map((a: Record<string, string>) => a.name);
    LINKEDIN.degrees.forEach((d) => expect(alumni).toContain(d));
  });

  test('the certification name matches LinkedIn exactly', () => {
    expect(credentials.map((c) => c.label)).toContain(LINKEDIN.certification);
    const certs: string[] = person().hasCredential.map(
      (c: Record<string, string>) => c.name
    );
    expect(certs).toContain(LINKEDIN.certification);
  });

  test('every award on LinkedIn is claimed, most recent first', () => {
    expect(profile.awards).toEqual([...LINKEDIN.awards]);
    expect(person().award).toEqual([...LINKEDIN.awards]);
    // The current-role award must lead — recency is the stronger signal
    expect(profile.awards[0]).toContain('2025');
    expect(profile.awards[0]).toContain(LINKEDIN.currentEmployer);
  });

  test('the SHRI award is attributed to the SATS work, not claimed as a solo prize', () => {
    const shri = profile.awards.find((a) => a.includes('SHRI'));
    expect(shri).toBeDefined();
    expect(shri).toContain('Talent Management & Acquisition');
    expect(shri).toContain('SATS Ltd.');
  });

  test('every employer named on the site exists on LinkedIn (no invented history)', () => {
    career.forEach((entry) => {
      expect(LINKEDIN.employers).toContain(entry.organization);
    });
  });

  test('llms.txt repeats the same employer, role and LinkedIn URL', () => {
    const flat = llms.replace(/\s+/g, ' ');
    expect(flat).toContain(LINKEDIN.currentEmployer);
    expect(flat).toContain(LINKEDIN.currentRole);
    expect(flat).toContain(LINKEDIN.profileUrl);
  });

  test('no superseded claims survive anywhere', () => {
    // The pre-LinkedIn draft said "Nanyang Business School" and used a generic
    // certificate name; both were corrected against the profile export.
    const surfaces = [html, llms, JSON.stringify(profile), JSON.stringify(credentials)];
    surfaces.forEach((s) => {
      expect(s).not.toContain('Nanyang Business School');
      expect(s).not.toContain('Certificate in Prompt Engineering');
    });
  });

  test('private contact details from the export are never published', () => {
    // The LinkedIn export contains a personal email; publishing it on a public
    // page would expose it to scrapers. It must not appear in any artifact.
    const surfaces = [html, llms, JSON.stringify(profile)];
    surfaces.forEach((s) => {
      expect(s).not.toMatch(/[a-z0-9._%+-]+@gmail\.com/i);
    });
  });
});
