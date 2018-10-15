import { createMatchesPatternErrorMessage, createMatchesPatternEvaluator } from './matchesPattern';

describe('createMatchesPatternEvaluator', () => {
  const matchesPatternEvaluator = createMatchesPatternEvaluator(/ab.d/g);
  it('should return a function', () => {
    expect(matchesPatternEvaluator).toBeInstanceOf(Function);
  });
  it('its return evaluator should return true if the input matches constraint pattern', () => {
    expect(matchesPatternEvaluator('abcd')).toBe(true);
  });
  it('its return evaluator should return false if the input does not match constraint pattern', () => {
    expect(matchesPatternEvaluator('bbd')).toBe(false);
  });
});

describe('createMatchesPatternErrorMessage', () => {
  it('should create the expected error message', () => {
    expect(createMatchesPatternErrorMessage()).toBe('value is not of correct pattern');
  });
});
