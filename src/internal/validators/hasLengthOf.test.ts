import { createHasLengthOfErrorMessage, createHasLengthOfEvaluator } from './hasLengthOf';

describe('createHasLengthOfEvaluator', () => {
  it('should return a function', () => {
    const hasLengthOfEvaluator = createHasLengthOfEvaluator();
    expect(hasLengthOfEvaluator).toBeInstanceOf(Function);
  });

  it('should validate a string length as true', () => {
    const hasLengthOfEvaluator = createHasLengthOfEvaluator(2);
    expect(hasLengthOfEvaluator('ab')).toBe(true);
  });

  it('should validate a string length as false', () => {
    const hasLengthOfEvaluator = createHasLengthOfEvaluator(3);
    expect(hasLengthOfEvaluator('abcd')).toBe(false);
  });

  it('should validate a Array length as true', () => {
    const hasLengthOfEvaluator = createHasLengthOfEvaluator(1);
    expect(hasLengthOfEvaluator([1])).toBe(true);
  });

  it('should validate a Array length as false', () => {
    const hasLengthOfEvaluator = createHasLengthOfEvaluator(2);
    expect(hasLengthOfEvaluator([1, 2, 3])).toBe(false);
  });
});

describe('createHasLengthOfErrorMessage', () => {
  it('should create the expected error message', () => {
    expect(createHasLengthOfErrorMessage(2)).toBe('value length does not match 2');
  });
});
