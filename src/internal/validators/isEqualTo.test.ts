import { createIsEqualToEvaluator } from './isEqualTo';

describe('createIsEqualToEvaluator', () => {
  const constraint = 5;
  const isEqualToEvaluator = createIsEqualToEvaluator(constraint);
  it('should return a function loaded with a constraint', () => {
    expect(isEqualToEvaluator).toBeInstanceOf(Function);
  });
  it('should return true if value is equal to constraint', () => {
    expect(isEqualToEvaluator(constraint)).toBe(true);
  });
  it('should return false if value is not equal to constraint', () => {
    expect(isEqualToEvaluator(10)).toBe(false);
  });
});
