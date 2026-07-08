import { dimensionInterventions } from '../../data/interventions';
import type { Dimension } from '../../types';

describe('Dimension Interventions Alignment', () => {
  const dimensions: Dimension[] = ['structure', 'people', 'process', 'mindset', 'leadership'];

  test('Every dimension has a prescribed intervention', () => {
    dimensions.forEach((dimension) => {
      expect(dimensionInterventions[dimension]).toBeDefined();
    });
  });

  test('Every intervention has non-empty title, description, and timeframe', () => {
    dimensions.forEach((dimension) => {
      const intervention = dimensionInterventions[dimension];
      expect(intervention.title.length).toBeGreaterThan(0);
      expect(intervention.description.length).toBeGreaterThan(0);
      expect(intervention.timeframe.length).toBeGreaterThan(0);
    });
  });

  test('Timeframes follow the "N–M weeks" pattern', () => {
    dimensions.forEach((dimension) => {
      expect(dimensionInterventions[dimension].timeframe).toMatch(/^\d+–\d+ weeks$/);
    });
  });
});
