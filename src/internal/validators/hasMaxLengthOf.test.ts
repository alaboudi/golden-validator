import { createHasMaxLengthOfErrorMessage, createHasMaxLengthOfEvaluator } from './hasMaxLengthOf';

describe('createHasMaxLengthOfEvaluator', () => {
  const hasMaxLengthOfEvaluator = createHasMaxLengthOfEvaluator(3);
  it('should return a function', () => {
    expect(hasMaxLengthOfEvaluator).toBeInstanceOf(Function);
  });
  it('its return evaluator should return true when supplied with a value length less than constraint', () => {
    expect(hasMaxLengthOfEvaluator('xy')).toBe(true);
  });
  it('its return evaluator should return true when supplied with a value with length equal to constraint', () => {
    expect(hasMaxLengthOfEvaluator('xyz')).toBe(true);
  });
  it('its return evaluator should return false when supplied with a value with length greater than constraint', () => {
    expect(hasMaxLengthOfEvaluator('abcxyz')).toBe(false);
  });
});

describe('createHasMaxLengthOfErrorMessage', () => {
  it('should create the expected error message', () => {
    expect(createHasMaxLengthOfErrorMessage(5)).toBe('value length should be less than 5');
  });
});
