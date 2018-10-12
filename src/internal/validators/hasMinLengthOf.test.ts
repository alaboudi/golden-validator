import { createHasMinLengthOfErrorMessage, createHasMinLengthOfEvaluator } from './hasMinLengthOf';

describe('createHasMinLengthOfEvaluator', () => {
  const hasMinLengthOfEvaluator = createHasMinLengthOfEvaluator(3);
  it('should return a function', () => {
    expect(hasMinLengthOfEvaluator).toBeInstanceOf(Function);
  });
  it('its return evaluator should return true if it has a length equal to constraint', () => {
    expect(hasMinLengthOfEvaluator('abc')).toBe(true);
  });
  it('its return evaluator should return true if it has a length greater than the constraint', () => {
    expect(hasMinLengthOfEvaluator('abcd')).toBe(true);
  });
  it('its return evaluator should return false if it has a length less than the constraint', () => {
    expect(hasMinLengthOfEvaluator('ab')).toBe(false);
  });
  it('its return evaluator should return false if a number is supplied', () => {
    expect(hasMinLengthOfEvaluator(123)).toBe(false);
  });
  it('its return evaluator should return false if a boolean is supplied', () => {
    expect(hasMinLengthOfEvaluator(true)).toBe(false);
  });
});

describe('createHasMinLengthOfErrorMessage', () => {
  it('should create the expected error message', () => {
    expect(createHasMinLengthOfErrorMessage(5)).toBe('length is not greater than 5');
  });
});
