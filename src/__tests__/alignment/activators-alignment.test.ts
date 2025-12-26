import { activators } from '../../data/activators';

describe('Activators Data Alignment', () => {
  test('Exactly 5 activators exist', () => {
    expect(activators.length).toBe(5);
  });

  test('Activator IDs are sequential 1-5', () => {
    expect(activators.map((a) => a.id)).toEqual([1, 2, 3, 4, 5]);
  });

  test('All activators have required fields', () => {
    activators.forEach((activator) => {
      expect(activator).toHaveProperty('title');
      expect(activator).toHaveProperty('tagline');
      expect(activator).toHaveProperty('principles');
      expect(activator).toHaveProperty('healthySignals');
      expect(activator).toHaveProperty('dysfunctionSignals');
      expect(activator.principles.length).toBeGreaterThan(0);
      expect(activator.healthySignals.length).toBeGreaterThan(0);
      expect(activator.dysfunctionSignals.length).toBeGreaterThan(0);
    });
  });

  test('All activators have non-empty title', () => {
    activators.forEach((activator) => {
      expect(activator.title.length).toBeGreaterThan(0);
    });
  });

  test('All activators have non-empty tagline', () => {
    activators.forEach((activator) => {
      expect(activator.tagline.length).toBeGreaterThan(0);
    });
  });

  test('Activator titles match expected names', () => {
    const expectedTitles = [
      'Unique Value-Adding Layers',
      'Innovation & Execution Networks',
      'The Business Handshake',
      'Power, Governance & Decision-Making',
      'Matrix-Ready Leaders',
    ];
    const actualTitles = activators.map((a) => a.title);
    expect(actualTitles).toEqual(expectedTitles);
  });
});
