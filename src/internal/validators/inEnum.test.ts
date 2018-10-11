import { createInEnumErrorMessage, createInEnumEvaluator } from './inEnum';

describe('createInEnumEvaluator', () => {
  const constraint = ['hi', 'there'];
  const inEnumEvaluator = createInEnumEvaluator(constraint);
  it('should return a function', () => {
    expect(inEnumEvaluator).toBeInstanceOf(Function);
  });
  it('its return evaluator should return true if supplied value is in array', () => {
    expect(inEnumEvaluator('there')).toBe(true);
  });
  it('its return evaluator should return false if supplied value that is not in the array', () => {
    expect(inEnumEvaluator('hey')).toBe(false);
  });
});

describe('createInEnumErrorMessage', () => {
  it('should create the expected error message', () => {
    expect(createInEnumErrorMessage()).toBe(`not a valid option`);
  });
});
