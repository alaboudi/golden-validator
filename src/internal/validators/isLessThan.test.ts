import { createIsLessThanErrorMessage, createIsLessThanEvaluator } from './isLessThan';

describe('createIsLessThanEvaluator', () => {
  const constraint = 5;
  const isLessThanEvaluator = createIsLessThanEvaluator(constraint);
  it('should return an evaluator function loaded with a constraint when invoked with 1 parameter', () => {
    expect(isLessThanEvaluator).toBeInstanceOf(Function);
  });
  it('should return true when supplied with a value less than the loaded constraint', () => {
    expect(isLessThanEvaluator(4)).toBe(true);
  });
  it('should return false when supplied with a value greater than the loaded constraint', () => {
    expect(isLessThanEvaluator(7)).toBe(false);
  });
});

describe('createIsLessThanErrorMessage', () => {
  it('should generate the default error message', () => {
    expect(createIsLessThanErrorMessage(5)).toBe('property is not less than 5');
  });
});
