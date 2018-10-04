import { createIsBetweenErrorMessage, createIsBetweenEvaluator } from './isBetween';

describe('createIsBetweenEvaluator', () => {
  const min = 5;
  const max = 10;
  const isBetweenEvaluator = createIsBetweenEvaluator(min, max);
  it('should return an evaluator function loaded with the constraints', () => {
    expect(isBetweenEvaluator).toBeInstanceOf(Function);
  });
  it('should return true when supplied with a value greater than min but less than max', () => {
    expect(isBetweenEvaluator(6)).toBe(true);
  });
  it('should return true when supplied with a value equal to min', () => {
    expect(isBetweenEvaluator(min)).toBe(true);
  });
  it('should return true when supplied with a value equal to max', () => {
    expect(isBetweenEvaluator(max)).toBe(true);
  });
  it('should return false when supplied with a value less than min', () => {
    expect(isBetweenEvaluator(1)).toBe(false);
  });
  it('should return false when supplied with a value greater than max', () => {
    expect(isBetweenEvaluator(20)).toBe(false);
  });
});

describe('createIsBetweenErrorMessage', () => {
  it('should create the default error message', () => {
    expect(createIsBetweenErrorMessage(5, 10)).toBe('property is not between 5 and 10');
  });
});
