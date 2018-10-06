import { createIsFalsyEvaluator } from './isFalsy';

describe('createIsFalsyEvaluator', () => {
  const isFalsyEvaluator = createIsFalsyEvaluator();
  it('should return a function', () => {
    expect(isFalsyEvaluator).toBeInstanceOf(Function);
  });
  it('its return evaluator should return true if supplied with false', () => {
    expect(isFalsyEvaluator(false)).toBe(true);
  });
  it('its return evaluator should return true if supplied with empty string', () => {
    expect(isFalsyEvaluator('')).toBe(true);
  });
  it('its return evaluator should return true if supplied with NaN', () => {
    expect(isFalsyEvaluator(NaN)).toBe(true);
  });
  it('its return evaluator should return true if supplied with null', () => {
    expect(isFalsyEvaluator(null)).toBe(true);
  });
  it('its return evaluator should return true if supplied with undefined', () => {
    expect(isFalsyEvaluator(undefined)).toBe(true);
  });
  it('its return evaluator should return false if supplied with true', () => {
    expect(isFalsyEvaluator(true)).toBe(false);
  });
  it('its return evaluator should return false if supplied with false string literally', () => {
    expect(isFalsyEvaluator('false')).toBe(false);
  });
  it('its return evaluator should return false if supplied with a positive number', () => {
    expect(isFalsyEvaluator(1)).toBe(false);
  });
  it('its return evaluator should return false if supplied with 0', () => {
    expect(isFalsyEvaluator(0)).toBe(true);
  });
});
