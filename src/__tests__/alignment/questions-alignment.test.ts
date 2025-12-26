import { diagnosticQuestions } from '../../data/questions';
import { DIMENSION_LABELS, QUESTION_COUNT, QUESTIONS_PER_DIMENSION } from '../../constants';

describe('Questions Data Alignment', () => {
  test('Total question count matches expectation', () => {
    expect(diagnosticQuestions.length).toBe(QUESTION_COUNT);
  });

  test('All dimensions have exactly 4 questions', () => {
    const dimensions = ['structure', 'people', 'process', 'mindset', 'leadership'] as const;
    dimensions.forEach((dim) => {
      const count = diagnosticQuestions.filter((q) => q.dimension === dim).length;
      expect(count).toBe(QUESTIONS_PER_DIMENSION);
    });
  });

  test('All question IDs are unique', () => {
    const ids = diagnosticQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('Dimension labels in constants match data dimensions', () => {
    const dataDimensions = [...new Set(diagnosticQuestions.map((q) => q.dimension))].sort();
    const labelDimensions = Object.keys(DIMENSION_LABELS).sort();
    expect(dataDimensions).toEqual(labelDimensions);
  });

  test('All questions have non-empty text', () => {
    diagnosticQuestions.forEach((question) => {
      expect(question.text.length).toBeGreaterThan(0);
    });
  });

  test('All questions have valid dimension', () => {
    const validDimensions = ['structure', 'people', 'process', 'mindset', 'leadership'];
    diagnosticQuestions.forEach((question) => {
      expect(validDimensions).toContain(question.dimension);
    });
  });
});
