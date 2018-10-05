import { createIsNumberEvaluator } from './isNumber';

describe('createIsNumberEvaluator', () => {
  const isNumberEvaluator = createIsNumberEvaluator();
  it('should return a function', () => {
    expect(isNumberEvaluator).toBeInstanceOf(Function);
  });
  it('its return value should return true when invoked with a 0', () => {
    expect(isNumberEvaluator(0)).toBe(true);
  });
  it('its return value should return true when invoked with a positive number', () => {
    expect(isNumberEvaluator(1)).toBe(true);
  });
  it('its return value should return true when invoked with a negative number', () => {
    expect(isNumberEvaluator(-1)).toBe(true);
  });
  it('its return value should return true when invoked with a non-empty string', () => {
    expect(isNumberEvaluator('a')).toBe(false);
  });
  it('its return value should return true when invoked with an empty string', () => {
    expect(isNumberEvaluator('')).toBe(false);
  });
  it('its return value should return true when invoked with a boolean', () => {
    expect(isNumberEvaluator(true)).toBe(false);
  });
});
