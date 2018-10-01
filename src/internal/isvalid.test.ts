import { doesValuePassRule } from './isvalid';
import { IRule, IValidator, ObjectType } from './types';

describe('doesValuePassRule', () => {
  const fakeTruthyValidator: IValidator = {
    errorMessage: 'truthy validator failed',
    evaluator: value => value,
  };
  const fakeFalsyValidator: IValidator = {
    errorMessage: 'falsy validator failed',
    evaluator: value => !value,
  };
  it('should return true if no value is present and the value is not required as per rule', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: false,
      validators: [],
    };
    const value = null;
    expect(doesValuePassRule(value, rule)).toBe(true);
  });
  it('should return false if no value is present and the value is required as per rule', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [],
    };
    const value = null;
    expect(doesValuePassRule(value, rule)).toBe(false);
  });
  it("should return true if the value is present and the rule's validators array is empty", () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [],
    };
    const value = 1;
    expect(doesValuePassRule(value, rule)).toBe(true);
  });
  it('should return true if the value returns a true value if passed through validator function', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator],
    };
    const value = true;
    expect(doesValuePassRule(value, rule)).toBe(true);
  });
  it('should return false if the value returns a false value if passed through validator function', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator],
    };
    const value = false;
    expect(doesValuePassRule(value, rule)).toBe(false);
  });
  it('should run through every single evaluator in the array and return false if one fails', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator, fakeFalsyValidator],
    };
    const value = true;
    expect(doesValuePassRule(value, rule)).toBe(false);
  });
});
