import { createIsEmailEvaluator } from './isEmail';

describe('createIsEmailEvaluator', () => {
  const isEmailEvaluator = createIsEmailEvaluator();
  it('should return a function when invoked', () => {
    expect(isEmailEvaluator).toBeInstanceOf(Function);
  });
  it('should return true if the value supplied to function returned is an email', () => {
    expect(isEmailEvaluator('yazan.alaboudi@someEmail.com')).toBe(true);
  });
  it('should return false if the value supplied to the function returned is a number', () => {
    expect(isEmailEvaluator(123)).toBe(false);
  });
  it('should return false if the value supplied to the function returned is a boolean', () => {
    expect(isEmailEvaluator(false)).toBe(false);
  });
  it('should return false if the value supplied to the function returned is an object', () => {
    expect(isEmailEvaluator({})).toBe(false);
  });
  it('should return false if the value supplied to the function returned is a non-email string', () => {
    expect(isEmailEvaluator('heybuddy')).toBe(false);
  });
});
