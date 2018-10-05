import { createIsTruthyEvaluator } from './isTruthy';

describe('createIsTruthyEvaluator', () => {
  const isTruthy = createIsTruthyEvaluator();
  it('should return a function', () => {
    expect(isTruthy).toBeInstanceOf(Function);
  });
  it('its return evaluator should return true if supplied with true', () => {
    expect(isTruthy(true)).toBe(true);
  });
  it('its return evaluator should return true if supplied with a positive number', () => {
    expect(isTruthy(1)).toBe(true);
  });
  it('its return evaluator should return true if supplied with a negative number', () => {
    expect(isTruthy(1)).toBe(true);
  });
  it('its return evaluator should return false if supplied with a 0', () => {
    expect(isTruthy(0)).toBe(false);
  });
  it('its return evaluator should return true if supplied with a non empty string', () => {
    expect(isTruthy('a')).toBe(true);
  });
  it('its return evaluator should return true if supplied with a string that literally says false', () => {
    expect(isTruthy('false')).toBe(true);
  });
  it('its return evaluator should return false if supplied with an empty string', () => {
    expect(isTruthy('')).toBe(false);
  });
  it('its return evaluator should return false if supplied with null', () => {
    expect(isTruthy(null)).toBe(false);
  });
  it('its return evaluator should return false if supplied with undefined', () => {
    expect(isTruthy(undefined)).toBe(false);
  });
  it('its return evaluator should return false if supplied with a NaN', () => {
    expect(isTruthy(NaN)).toBe(false);
  });
});
