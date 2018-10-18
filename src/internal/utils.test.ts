import { isNullOrUndefined } from './utils';

describe('isNullOrUndefined', () => {
  it('should return true if input is null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });
  it('should return true if input is undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });
  it('should return false if input is number', () => {
    expect(isNullOrUndefined(123)).toBe(false);
  });
});
